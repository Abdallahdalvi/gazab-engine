import { createHash, timingSafeEqual } from "node:crypto";

import { createServerFn } from "@tanstack/react-start";
import { useSession as getSession } from "@tanstack/react-start/server";
import { z } from "zod";

import {
  DEFAULT_SERVICE_PRICING,
  INTERNATIONAL_SERVICE_PRICING,
  type ServicePricing,
} from "./package-types";

const selectionSchema = z.object({
  retainerMonths: z.union([z.literal(1), z.literal(3), z.literal(6), z.literal(12)]),
  websiteEnabled: z.boolean(),
  websiteService: z.enum(["new", "redesign", "management"]),
  websiteType: z.enum(["single", "business", "ecommerce"]),
  websitePages: z.number().int().min(1).max(50),
  hostingFiveYears: z.boolean(),
  websiteManagement: z.boolean(),
  socialEnabled: z.boolean(),
  socialService: z.enum(["setup", "optimise", "management", "content"]),
  socialAccounts: z.number().int().min(1).max(8),
  contentVolume: z.union([z.literal(8), z.literal(12), z.literal(20)]),
  googleProfile: z.boolean(),
  googleProfileService: z.enum(["setup", "optimise", "management"]),
  strategyReporting: z.boolean(),
  automationEnabled: z.boolean(),
  automationType: z.enum([
    "weekly-reporting",
    "lead-routing",
    "social-content",
    "ai-visibility",
    "custom",
  ]),
  automationComplexity: z.enum(["basic", "advanced"]),
  automationCount: z.number().int().min(1).max(10),
  adsEnabled: z.boolean(),
  adPlatforms: z.array(z.enum(["Meta Ads", "Google Ads", "LinkedIn Ads"])).max(3),
  marketplaceEnabled: z.boolean(),
  marketplaces: z
    .array(
      z.enum([
        "IndiaMART",
        "Amazon",
        "Flipkart",
        "Facebook Marketplace",
        "OLX",
        "eBay",
        "Etsy",
        "Other",
      ]),
    )
    .max(8),
  otherMarketplace: z.string().trim().max(200),
  seo: z.boolean(),
  aeo: z.boolean(),
  geo: z.boolean(),
  backlinks: z.boolean(),
  otherDetails: z.string().max(3000),
});

const estimateSchema = z.object({
  lines: z
    .array(
      z.object({
        label: z.string().max(200),
        setup: z.number().min(-10_000_000).max(10_000_000),
        monthly: z.number().min(-10_000_000).max(10_000_000),
        complimentary: z.boolean().optional(),
        discount: z.boolean().optional(),
      }),
    )
    .max(30),
  complimentary: z.array(z.string().max(200)).max(10),
  currency: z.enum(["INR", "USD"]),
  setupTotal: z.number().nonnegative(),
  monthlyTotal: z.number().nonnegative(),
  firstMonthTotal: z.number().nonnegative(),
});

const pricingSchema = z.object(
  Object.fromEntries(
    Object.keys(DEFAULT_SERVICE_PRICING).map((key) => [
      key,
      z.number().int().min(0).max(10_000_000),
    ]),
  ) as Record<keyof ServicePricing, z.ZodNumber>,
);

function getSessionConfig() {
  const password = process.env["ADMIN_SESSION_SECRET"];
  if (!password || password.length < 32)
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters");
  return {
    password,
    name: "gazab-admin-session",
    maxAge: 60 * 60 * 12,
    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      // CasaOS is often first accessed on a private HTTP address. Enable this
      // after the app is behind HTTPS so the same image works in both setups.
      secure: process.env["ADMIN_COOKIE_SECURE"] === "true",
      path: "/",
    },
  };
}

async function isAdmin() {
  try {
    const session = await getSession<{ authenticated?: boolean }>(getSessionConfig());
    return session.data.authenticated === true;
  } catch {
    return false;
  }
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorised");
}

function safeCompare(left: string, right: string) {
  const first = createHash("sha256").update(left).digest();
  const second = createHash("sha256").update(right).digest();
  return timingSafeEqual(first, second);
}

export const getPublicPricing = createServerFn({ method: "GET" }).handler(async () => {
  const { getPricing } = await import("./package-store.server");
  return getPricing();
});

export const getPublicTrackingConfig = createServerFn({ method: "GET" }).handler(async () => ({
  clarityProjectId: process.env["CLARITY_PROJECT_ID"] || "",
  gaMeasurementId: process.env["GA_MEASUREMENT_ID"] || "",
  metaPixelId: process.env["META_PIXEL_ID"] || "",
}));

export const submitPackageRequest = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        name: z.string().trim().min(2).max(100),
        email: z.string().trim().email().max(255),
        phone: z.string().trim().min(7).max(30),
        company: z.string().trim().max(120),
        market: z.enum(["IN", "INTL"]),
        selection: selectionSchema,
        estimate: estimateSchema,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { calculatePackageEstimate } = await import("./package-types");
    const { createRequest, getPricing, markEmailSent, sendPackageRequestEmail } =
      await import("./package-store.server");
    const pricing = await getPricing();
    const trustedEstimate = calculatePackageEstimate(
      data.selection,
      data.market === "INTL" ? INTERNATIONAL_SERVICE_PRICING : pricing,
      data.market === "INTL" ? "USD" : "INR",
    );
    const record = await createRequest({ ...data, estimate: trustedEstimate });
    let emailSent = false;
    try {
      emailSent = await sendPackageRequestEmail(record);
      if (emailSent) await markEmailSent(record.id);
    } catch (error) {
      console.error("Package request saved, but email notification failed", error);
    }
    return { success: true, requestId: record.id, emailSent };
  });

export const getAdminState = createServerFn({ method: "GET" }).handler(async () => {
  if (!(await isAdmin()))
    return { authenticated: false as const, requests: [], pricing: DEFAULT_SERVICE_PRICING };
  const { getPricing, getRequests } = await import("./package-store.server");
  return {
    authenticated: true as const,
    requests: await getRequests(),
    pricing: await getPricing(),
  };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ email: z.string().email(), password: z.string().min(1).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const expectedEmail = process.env["ADMIN_EMAIL"];
    const expectedPassword = process.env["ADMIN_PASSWORD"];
    if (!expectedEmail || !expectedPassword)
      throw new Error("Admin login is not configured on this server");
    if (
      !safeCompare(data.email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) ||
      !safeCompare(data.password, expectedPassword)
    ) {
      throw new Error("Incorrect email or password");
    }
    const session = await getSession<{ authenticated?: boolean }>(getSessionConfig());
    await session.update({ authenticated: true });
    return { success: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getSession<{ authenticated?: boolean }>(getSessionConfig());
  await session.clear();
  return { success: true };
});

export const saveAdminPricing = createServerFn({ method: "POST" })
  .validator((input: unknown) => pricingSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { savePricing } = await import("./package-store.server");
    return savePricing(data);
  });

export const saveAdminRequest = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "proposal-sent", "won", "lost"]),
        adminNotes: z.string().max(5000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { updateRequest } = await import("./package-store.server");
    return updateRequest(data.id, data.status, data.adminNotes);
  });
