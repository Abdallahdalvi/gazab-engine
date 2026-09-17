export type ContentVolume = 8 | 12 | 20;
export type WebsiteType = "single" | "business" | "ecommerce";
export type WebsiteService = "new" | "redesign" | "management";
export type SocialService = "setup" | "optimise" | "management" | "content";
export type GoogleProfileService = "setup" | "optimise" | "management";
export type AutomationComplexity = "basic" | "advanced";
export type AutomationType =
  "weekly-reporting" | "lead-routing" | "social-content" | "ai-visibility" | "custom";
export type PricingMarket = "IN" | "INTL";
export type CurrencyCode = "INR" | "USD";

export type ServicePricing = {
  starterMonthly: number;
  fullMonthly: number;
  websiteSingleSetup: number;
  websiteBusinessSetup: number;
  websiteEcommerceSetup: number;
  websiteBusinessExtraPageSetup: number;
  websiteEcommerceExtraPageSetup: number;
  hostingFiveYearsSetup: number;
  websiteManagementMonthly: number;
  socialAccountSetup: number;
  socialAccountMonthly: number;
  content8Monthly: number;
  content12Monthly: number;
  content20Monthly: number;
  googleProfileSetup: number;
  googleProfileManagementMonthly: number;
  strategyReportingMonthly: number;
  automationBasicSetup: number;
  automationAdvancedSetup: number;
  adsPlatformMonthly: number;
  seoMonthly: number;
  aeoMonthly: number;
  geoMonthly: number;
  backlinksMonthly: number;
  marketplacePlatformMonthly: number;
};

export const DEFAULT_SERVICE_PRICING: ServicePricing = {
  // Fixed packages keep their original prices. BYOP rates are maintained
  // independently so changing a custom service never changes a package.
  starterMonthly: 14_999,
  fullMonthly: 24_999,
  websiteSingleSetup: 2_640,
  websiteBusinessSetup: 2_640,
  websiteEcommerceSetup: 5_280,
  websiteBusinessExtraPageSetup: 660,
  websiteEcommerceExtraPageSetup: 1_320,
  hostingFiveYearsSetup: 0,
  websiteManagementMonthly: 1_188,
  socialAccountSetup: 1_386,
  socialAccountMonthly: 1_386,
  content8Monthly: 1_782,
  content12Monthly: 2_574,
  content20Monthly: 4_158,
  googleProfileSetup: 1_386,
  googleProfileManagementMonthly: 1_386,
  strategyReportingMonthly: 1_386,
  automationBasicSetup: 2_772,
  automationAdvancedSetup: 7_128,
  adsPlatformMonthly: 2_772,
  seoMonthly: 2_574,
  aeoMonthly: 1_584,
  geoMonthly: 1_980,
  backlinksMonthly: 2_376,
  marketplacePlatformMonthly: 1_980,
};

// Deliberately rounded international rates: easy to understand and quote.
export const INTERNATIONAL_SERVICE_PRICING: ServicePricing = {
  starterMonthly: 199,
  fullMonthly: 299,
  websiteSingleSetup: 39,
  websiteBusinessSetup: 39,
  websiteEcommerceSetup: 65,
  websiteBusinessExtraPageSetup: 13,
  websiteEcommerceExtraPageSetup: 20,
  hostingFiveYearsSetup: 0,
  websiteManagementMonthly: 65,
  socialAccountSetup: 39,
  socialAccountMonthly: 39,
  content8Monthly: 65,
  content12Monthly: 105,
  content20Monthly: 171,
  googleProfileSetup: 65,
  googleProfileManagementMonthly: 65,
  strategyReportingMonthly: 65,
  automationBasicSetup: 131,
  automationAdvancedSetup: 395,
  adsPlatformMonthly: 131,
  seoMonthly: 105,
  aeoMonthly: 65,
  geoMonthly: 105,
  backlinksMonthly: 105,
  marketplacePlatformMonthly: 65,
};

export type PackageSelection = {
  websiteEnabled: boolean;
  websiteService: WebsiteService;
  websiteType: WebsiteType;
  websitePages: number;
  hostingFiveYears: boolean;
  websiteManagement: boolean;
  socialEnabled: boolean;
  socialService: SocialService;
  socialAccounts: number;
  contentVolume: ContentVolume;
  googleProfile: boolean;
  googleProfileService: GoogleProfileService;
  strategyReporting: boolean;
  automationEnabled: boolean;
  automationType: AutomationType;
  automationComplexity: AutomationComplexity;
  automationCount: number;
  adsEnabled: boolean;
  adPlatforms: string[];
  marketplaceEnabled: boolean;
  marketplaces: string[];
  otherMarketplace: string;
  seo: boolean;
  aeo: boolean;
  geo: boolean;
  backlinks: boolean;
  otherDetails: string;
};

export const DEFAULT_PACKAGE_SELECTION: PackageSelection = {
  websiteEnabled: false,
  websiteService: "new",
  websiteType: "business",
  websitePages: 5,
  hostingFiveYears: true,
  websiteManagement: false,
  socialEnabled: false,
  socialService: "management",
  socialAccounts: 2,
  contentVolume: 8,
  googleProfile: false,
  googleProfileService: "setup",
  strategyReporting: false,
  automationEnabled: false,
  automationType: "weekly-reporting",
  automationComplexity: "basic",
  automationCount: 1,
  adsEnabled: false,
  adPlatforms: ["Meta Ads"],
  marketplaceEnabled: false,
  marketplaces: ["IndiaMART"],
  otherMarketplace: "",
  seo: false,
  aeo: false,
  geo: false,
  backlinks: false,
  otherDetails: "",
};

export type EstimateLine = {
  label: string;
  setup: number;
  monthly: number;
  complimentary?: boolean;
  discount?: boolean;
};

export type PackageEstimate = {
  lines: EstimateLine[];
  complimentary: string[];
  currency: CurrencyCode;
  setupTotal: number;
  monthlyTotal: number;
  firstMonthTotal: number;
  matchedPackage?: "Gazab Starter" | "Full Gazab";
};

const websiteTypeLabels: Record<WebsiteType, string> = {
  single: "Single-page website",
  business: "Business website",
  ecommerce: "E-commerce website",
};

const automationTypeLabels: Record<AutomationType, string> = {
  "weekly-reporting": "Weekly reporting automation",
  "lead-routing": "Lead routing / CRM automation",
  "social-content": "Social content workflow",
  "ai-visibility": "AI visibility monitoring",
  custom: "Custom automation",
};

export const AUTOMATION_TYPE_LABELS = automationTypeLabels;

function getMatchedPackage(selection: PackageSelection, pricing: ServicePricing) {
  const sharedPackageServices =
    selection.websiteEnabled &&
    selection.websiteService === "new" &&
    selection.websiteType === "business" &&
    selection.websitePages === 5 &&
    selection.hostingFiveYears &&
    selection.websiteManagement &&
    selection.socialEnabled &&
    selection.socialService === "management" &&
    selection.googleProfile &&
    selection.googleProfileService === "setup" &&
    selection.strategyReporting &&
    !selection.marketplaceEnabled;

  const matchesFull =
    sharedPackageServices &&
    selection.socialAccounts === 4 &&
    selection.contentVolume === 12 &&
    selection.automationEnabled &&
    selection.automationComplexity === "basic" &&
    selection.automationCount === 2 &&
    selection.adsEnabled &&
    selection.adPlatforms.length === 1 &&
    selection.seo &&
    selection.aeo &&
    selection.geo &&
    selection.backlinks;
  if (matchesFull) return { name: "Full Gazab" as const, monthlyPrice: pricing.fullMonthly };

  const matchesStarter =
    sharedPackageServices &&
    selection.socialAccounts === 2 &&
    selection.contentVolume === 8 &&
    !selection.automationEnabled &&
    !selection.adsEnabled &&
    !selection.seo &&
    !selection.aeo &&
    !selection.geo &&
    !selection.backlinks;
  if (matchesStarter)
    return { name: "Gazab Starter" as const, monthlyPrice: pricing.starterMonthly };

  return undefined;
}

export function calculatePackageEstimate(
  selection: PackageSelection,
  pricing: ServicePricing,
  currency: CurrencyCode = "INR",
): PackageEstimate {
  const lines: EstimateLine[] = [];
  const websiteService = selection.websiteService || "new";
  const socialService = selection.socialService || "management";
  const googleProfileService = selection.googleProfileService || "setup";

  if (selection.websiteEnabled) {
    if (websiteService === "management") {
      lines.push({
        label: "Existing website management",
        setup: 0,
        monthly: pricing.websiteManagementMonthly,
      });
    } else {
      const base =
        selection.websiteType === "single"
          ? pricing.websiteSingleSetup
          : selection.websiteType === "ecommerce"
            ? pricing.websiteEcommerceSetup
            : pricing.websiteBusinessSetup;
      const websitePages =
        selection.websiteType === "single" ? 1 : Math.max(1, selection.websitePages);
      const includedPages = selection.websiteType === "single" ? 1 : 5;
      const extraPages = Math.max(0, websitePages - includedPages);
      const extraPagePrice =
        selection.websiteType === "ecommerce"
          ? pricing.websiteEcommerceExtraPageSetup
          : pricing.websiteBusinessExtraPageSetup;
      const workLabel = websiteService === "redesign" ? "redesign / rebuild" : "new build";
      lines.push({
        label:
          selection.websiteType === "single"
            ? `${websiteTypeLabels.single} ${workLabel}`
            : `${websiteTypeLabels[selection.websiteType]} ${workLabel} (${websitePages} page${websitePages === 1 ? "" : "s"})`,
        setup: base + extraPages * extraPagePrice,
        monthly: 0,
      });
      if (selection.hostingFiveYears)
        lines.push({ label: "5-year hosting", setup: 0, monthly: 0, complimentary: true });
      if (selection.websiteManagement)
        lines.push({
          label: "Ongoing website management",
          setup: 0,
          monthly: pricing.websiteManagementMonthly,
        });
    }
  }

  if (selection.socialEnabled) {
    const contentPrice =
      selection.contentVolume === 20
        ? pricing.content20Monthly
        : selection.contentVolume === 12
          ? pricing.content12Monthly
          : pricing.content8Monthly;
    if (socialService === "setup" || socialService === "optimise") {
      lines.push({
        label: `${selection.socialAccounts} social account${selection.socialAccounts === 1 ? "" : "s"} ${socialService === "setup" ? "setup" : "optimisation"}`,
        setup: pricing.socialAccountSetup * selection.socialAccounts,
        monthly: 0,
      });
    } else {
      if (socialService === "management")
        lines.push({
          label: `${selection.socialAccounts} social account${selection.socialAccounts === 1 ? "" : "s"} managed`,
          setup: 0,
          monthly: pricing.socialAccountMonthly * selection.socialAccounts,
        });
      lines.push({
        label: `${selection.contentVolume} posts / reels per month`,
        setup: 0,
        monthly: contentPrice,
      });
    }
  }

  if (selection.googleProfile)
    lines.push(
      googleProfileService === "management"
        ? {
            label: "Google Business Profile management",
            setup: 0,
            monthly: pricing.googleProfileManagementMonthly,
          }
        : {
            label: `Google Business Profile ${googleProfileService === "setup" ? "setup + optimisation" : "optimisation / rebuild"}`,
            setup: pricing.googleProfileSetup,
            monthly: 0,
          },
    );
  if (selection.strategyReporting)
    lines.push({
      label: "Monthly strategy, reporting + two calls",
      setup: 0,
      monthly: pricing.strategyReportingMonthly,
    });

  if (selection.automationEnabled) {
    const unitPrice =
      selection.automationComplexity === "advanced"
        ? pricing.automationAdvancedSetup
        : pricing.automationBasicSetup;
    lines.push({
      label: `${selection.automationCount} × ${automationTypeLabels[selection.automationType]} (${selection.automationComplexity})`,
      setup: unitPrice * selection.automationCount,
      monthly: 0,
    });
  }

  if (selection.adsEnabled && selection.adPlatforms.length > 0) {
    lines.push({
      label: `${selection.adPlatforms.join(" + ")} management`,
      setup: 0,
      monthly: pricing.adsPlatformMonthly * selection.adPlatforms.length,
    });
  }

  if (selection.marketplaceEnabled && selection.marketplaces.length > 0) {
    const marketplaceNames = selection.marketplaces.map((marketplace) =>
      marketplace === "Other"
        ? (selection.otherMarketplace || "").trim() || "Other platform"
        : marketplace,
    );
    lines.push({
      label: `${marketplaceNames.join(" + ")} marketplace management`,
      setup: 0,
      monthly: pricing.marketplacePlatformMonthly * selection.marketplaces.length,
    });
  }

  if (selection.seo) lines.push({ label: "SEO", setup: 0, monthly: pricing.seoMonthly });
  if (selection.aeo) lines.push({ label: "AEO", setup: 0, monthly: pricing.aeoMonthly });
  if (selection.geo)
    lines.push({ label: "GEO / AI visibility", setup: 0, monthly: pricing.geoMonthly });
  if (selection.backlinks)
    lines.push({ label: "Backlink building", setup: 0, monthly: pricing.backlinksMonthly });

  const subtotalSetup = lines.reduce((sum, line) => sum + line.setup, 0);
  const subtotalMonthly = lines.reduce((sum, line) => sum + line.monthly, 0);
  const matchedPackage = getMatchedPackage(selection, pricing);
  if (matchedPackage) {
    // A custom selection that recreates a published package should never cost
    // more than that package. Preserve normal item pricing, then show the exact
    // bundle saving required to cap both recurring and first-month totals.
    const monthlyDiscount = Math.max(0, subtotalMonthly - matchedPackage.monthlyPrice);
    const adjustedMonthly = subtotalMonthly - monthlyDiscount;
    const setupDiscount = Math.max(
      0,
      subtotalSetup + adjustedMonthly - matchedPackage.monthlyPrice,
    );
    if (setupDiscount > 0 || monthlyDiscount > 0) {
      lines.push({
        label: `${matchedPackage.name} bundle saving`,
        setup: -setupDiscount,
        monthly: -monthlyDiscount,
        discount: true,
      });
    }
  }

  const setupTotal = Math.max(
    0,
    lines.reduce((sum, line) => sum + line.setup, 0),
  );
  const monthlyTotal = Math.max(
    0,
    lines.reduce((sum, line) => sum + line.monthly, 0),
  );
  const complimentary =
    lines.length > 0
      ? ["Links DC link-in-bio page", "Monthly AI visibility report", "No lock-in period"]
      : [];
  return {
    lines,
    complimentary,
    currency,
    setupTotal,
    monthlyTotal,
    firstMonthTotal: setupTotal + monthlyTotal,
    ...(matchedPackage ? { matchedPackage: matchedPackage.name } : {}),
  };
}

export function formatMoney(value: number, currency: CurrencyCode = "INR") {
  return currency === "USD"
    ? `$${Math.round(value).toLocaleString("en-US")}`
    : `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatINR(value: number) {
  return formatMoney(value, "INR");
}

export type PackageRequestStatus = "new" | "contacted" | "proposal-sent" | "won" | "lost";

export type PackageRequestRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  market?: PricingMarket;
  selection: PackageSelection;
  estimate: PackageEstimate;
  status: PackageRequestStatus;
  adminNotes: string;
  emailNotificationSent: boolean;
};

export const PRICING_LABELS: Record<keyof ServicePricing, string> = {
  starterMonthly: "Starter package / month",
  fullMonthly: "Full Gazab package / month",
  websiteSingleSetup: "Single-page website setup",
  websiteBusinessSetup: "Business website — up to 5 pages",
  websiteEcommerceSetup: "E-commerce website — store setup + 5 pages",
  websiteBusinessExtraPageSetup: "Business website — each page after 5",
  websiteEcommerceExtraPageSetup: "E-commerce website — each page after 5",
  hostingFiveYearsSetup: "5-year hosting",
  websiteManagementMonthly: "Website management / month",
  socialAccountSetup: "Social account setup or optimisation",
  socialAccountMonthly: "Each social account / month",
  content8Monthly: "8 posts / reels per month",
  content12Monthly: "12 posts / reels per month",
  content20Monthly: "20 posts / reels per month",
  googleProfileSetup: "Google Business Profile setup",
  googleProfileManagementMonthly: "Google Business Profile management / month",
  strategyReportingMonthly: "Strategy, reporting + calls / month",
  automationBasicSetup: "Basic automation setup",
  automationAdvancedSetup: "Advanced automation setup",
  adsPlatformMonthly: "Ads management per platform / month",
  seoMonthly: "SEO / month",
  aeoMonthly: "AEO / month",
  geoMonthly: "GEO / month",
  backlinksMonthly: "Backlinking / month",
  marketplacePlatformMonthly: "Marketplace management per platform / month",
};
