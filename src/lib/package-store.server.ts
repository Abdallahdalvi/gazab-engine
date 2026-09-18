import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  DEFAULT_SERVICE_PRICING,
  type PackageRequestRecord,
  type PackageRequestStatus,
  type PackageSelection,
  type PackageEstimate,
  type ServicePricing,
  type PricingMarket,
} from "./package-types";

type Database = {
  version: 10;
  pricing: ServicePricing;
  requests: PackageRequestRecord[];
};

const dataDirectory = process.env["PACKAGE_DATA_DIR"] || path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "gazab-package-data.json");
let writeQueue: Promise<void> = Promise.resolve();

async function readDatabase(): Promise<Database> {
  await mkdir(dataDirectory, { recursive: true });
  try {
    const raw = await readFile(databasePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return {
      version: 10,
      pricing:
        parsed.version === 10
          ? { ...DEFAULT_SERVICE_PRICING, ...(parsed.pricing || {}) }
          : DEFAULT_SERVICE_PRICING,
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      console.error("Could not read package database", error);
    return { version: 10, pricing: DEFAULT_SERVICE_PRICING, requests: [] };
  }
}

async function writeDatabase(database: Database) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(databasePath, JSON.stringify(database, null, 2), "utf8");
}

async function updateDatabase<T>(update: (database: Database) => T | Promise<T>): Promise<T> {
  let result!: T;
  writeQueue = writeQueue.then(async () => {
    const database = await readDatabase();
    result = await update(database);
    await writeDatabase(database);
  });
  await writeQueue;
  return result;
}

export async function getPricing() {
  return (await readDatabase()).pricing;
}

export async function savePricing(pricing: ServicePricing) {
  return updateDatabase((database) => {
    database.pricing = pricing;
    return pricing;
  });
}

export async function getRequests() {
  return (await readDatabase()).requests.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createRequest(input: {
  name: string;
  email: string;
  phone: string;
  company: string;
  market: PricingMarket;
  selection: PackageSelection;
  estimate: PackageEstimate;
}) {
  return updateDatabase((database) => {
    const record: PackageRequestRecord = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
      status: "new",
      adminNotes: "",
      emailNotificationSent: false,
    };
    database.requests.unshift(record);
    return record;
  });
}

export async function markEmailSent(id: string) {
  return updateDatabase((database) => {
    const record = database.requests.find((request) => request.id === id);
    if (record) record.emailNotificationSent = true;
    return Boolean(record);
  });
}

export async function updateRequest(id: string, status: PackageRequestStatus, adminNotes: string) {
  return updateDatabase((database) => {
    const record = database.requests.find((request) => request.id === id);
    if (!record) throw new Error("Package request not found");
    record.status = status;
    record.adminNotes = adminNotes;
    return record;
  });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ||
      character,
  );
}

export async function sendPackageRequestEmail(record: PackageRequestRecord) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["LEADS_TO_EMAIL"] || "dalviabdallah76@gmail.com";
  const from = process.env["RESEND_FROM"] || "Gazab Website <onboarding@resend.dev>";
  if (!apiKey) return false;

  const symbol = record.estimate.currency === "USD" ? "$" : "₹";
  const locale = record.estimate.currency === "USD" ? "en-US" : "en-IN";
  const services = record.estimate.lines
    .map((line) => {
      if (line.complimentary) return `<li>${escapeHtml(line.label)} — FREE</li>`;
      const setup =
        line.setup !== 0
          ? `${line.setup < 0 ? "−" : ""}${symbol}${Math.abs(line.setup).toLocaleString(locale)} setup`
          : "";
      const monthly =
        line.monthly !== 0
          ? `${line.monthly < 0 ? "−" : ""}${symbol}${Math.abs(line.monthly).toLocaleString(locale)} monthly`
          : "";
      return `<li>${escapeHtml(line.label)} — ${setup}${setup && monthly ? ", " : ""}${monthly}</li>`;
    })
    .join("");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject: `New Gazab package request — ${record.company || record.name}`,
      html: `<h1>New Build Your Own Package request</h1><p><strong>Market:</strong> ${record.market === "INTL" ? "International / USD" : "India / INR"}</p><p><strong>Name:</strong> ${escapeHtml(record.name)}</p><p><strong>Company:</strong> ${escapeHtml(record.company || "Not provided")}</p><p><strong>Email:</strong> ${escapeHtml(record.email)}</p><p><strong>WhatsApp / phone:</strong> ${escapeHtml(record.phone)}</p><p><strong>Requested retainer:</strong> ${record.selection.retainerMonths || 1} month${(record.selection.retainerMonths || 1) === 1 ? "" : "s"}</p><h2>Selected services</h2><ul>${services}</ul><p><strong>Complimentary:</strong> ${record.estimate.complimentary?.map(escapeHtml).join(", ") || "None"}</p><p><strong>Estimated setup:</strong> ${symbol}${record.estimate.setupTotal.toLocaleString(locale)}</p><p><strong>Estimated monthly:</strong> ${symbol}${record.estimate.monthlyTotal.toLocaleString(locale)}</p><p><strong>Estimated first month:</strong> ${symbol}${record.estimate.firstMonthTotal.toLocaleString(locale)}</p><p><strong>Extra details:</strong><br>${escapeHtml(record.selection.otherDetails || "None")}</p><p>Request ID: ${record.id}</p>`,
    }),
  });
  if (!response.ok)
    throw new Error(`Resend email failed (${response.status}): ${await response.text()}`);
  return true;
}
