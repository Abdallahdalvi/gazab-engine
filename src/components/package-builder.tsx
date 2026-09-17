import { ArrowRight, Check, Plus, Printer } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";

import { submitPackageRequest } from "../lib/package-actions";
import {
  AUTOMATION_TYPE_LABELS,
  DEFAULT_PACKAGE_SELECTION,
  calculatePackageEstimate,
  formatMoney,
  type PackageSelection,
  type PricingMarket,
  type ServicePricing,
} from "../lib/package-types";

function ToggleCard({ checked, onChange, title, copy, children }: { checked: boolean; onChange: (checked: boolean) => void; title: string; copy: string; children?: ReactNode }) {
  return <article className={`builder-service ${checked ? "builder-service-active" : ""}`}>
    <label className="builder-toggle"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span>{checked ? <Check size={18} /> : <Plus size={18} />}</span><div><strong>{title}</strong><small>{copy}</small></div></label>
    {checked && children && <div className="builder-options">{children}</div>}
  </article>;
}

function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const commit = () => {
    const parsed = Number.parseInt(draft, 10);
    const nextValue = Number.isFinite(parsed) ? Math.max(min, Math.min(max, parsed)) : min;
    setDraft(String(nextValue));
    onChange(nextValue);
  };
  return <label>{label}<input className="builder-number-input" type="text" inputMode="numeric" pattern="[0-9]*" value={draft} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))} onBlur={commit} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }} /></label>;
}

export function PackageBuilder({ pricing, market, countryLabel }: { pricing: ServicePricing; market: PricingMarket; countryLabel: string }) {
  const [selection, setSelection] = useState<PackageSelection>(DEFAULT_PACKAGE_SELECTION);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successId, setSuccessId] = useState("");
  const submitRequest = useServerFn(submitPackageRequest);
  const currency = market === "INTL" ? "USD" : "INR";
  const estimate = useMemo(() => calculatePackageEstimate(selection, pricing, currency), [selection, pricing, currency]);
  const hasServices = estimate.lines.length > 0;

  const update = <K extends keyof PackageSelection>(key: K, value: PackageSelection[K]) => setSelection((current) => ({ ...current, [key]: value }));
  const updateWebsiteType = (websiteType: PackageSelection["websiteType"]) => setSelection((current) => ({
    ...current,
    websiteType,
    websitePages: websiteType === "single" ? 1 : Math.max(5, current.websitePages),
  }));
  const togglePlatform = (platform: string) => update("adPlatforms", selection.adPlatforms.includes(platform) ? selection.adPlatforms.filter((item) => item !== platform) : [...selection.adPlatforms, platform]);
  const toggleMarketplace = (marketplace: string) => update("marketplaces", selection.marketplaces.includes(marketplace) ? selection.marketplaces.filter((item) => item !== marketplace) : [...selection.marketplaces, marketplace]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasServices) { setError("Choose at least one service before requesting the package."); return; }
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSubmitting(true); setError(""); setSuccessId("");
    try {
      const result = await submitRequest({ data: {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        company: String(form.get("company") || ""),
        market,
        selection,
        estimate,
      } });
      setSuccessId(result.requestId);
      formElement.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not submit your package. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <section id="build-package" className="package-builder-section section-shell">
    <div className="builder-heading"><div><p className="kicker kicker-orange">BUILD YOUR OWN PACKAGE</p><h2>ONLY PAY FOR <span>WHAT YOU NEED.</span></h2></div><div><p>Choose the services, tell us the scope and see a live starting estimate. Setup work and ongoing monthly services are shown separately.</p></div></div>
    <div className="package-builder-layout">
      <div className="builder-services">
        <ToggleCard checked={selection.websiteEnabled} onChange={(value) => update("websiteEnabled", value)} title="WEBSITE" copy="New builds, redesigns and ongoing website management.">
          <label>WHAT DO YOU NEED?<select value={selection.websiteService} onChange={(event) => update("websiteService", event.target.value as PackageSelection["websiteService"])}><option value="new">Build a new website</option><option value="redesign">Redesign / rebuild my existing website</option><option value="management">Manage my existing website</option></select></label>
          {selection.websiteService !== "management" && <>
            <label>WEBSITE TYPE<select value={selection.websiteType} onChange={(event) => updateWebsiteType(event.target.value as PackageSelection["websiteType"])}><option value="single">Single-page — {formatMoney(pricing.websiteSingleSetup, currency)}</option><option value="business">Business — 5 pages / {formatMoney(pricing.websiteBusinessSetup, currency)}</option><option value="ecommerce">E-commerce — 5 pages / {formatMoney(pricing.websiteEcommerceSetup, currency)}</option></select></label>
            {selection.websiteType !== "single" && <NumberField label="NUMBER OF PAGES" value={selection.websitePages} min={1} max={50} onChange={(value) => update("websitePages", value)} />}
            <label className="inline-check"><input type="checkbox" checked={selection.hostingFiveYears} onChange={(event) => update("hostingFiveYears", event.target.checked)} /> FREE 5-year hosting</label>
            <label className="inline-check"><input type="checkbox" checked={selection.websiteManagement} onChange={(event) => update("websiteManagement", event.target.checked)} /> Add ongoing management</label>
          </>}
        </ToggleCard>

        <ToggleCard checked={selection.socialEnabled} onChange={(value) => update("socialEnabled", value)} title="SOCIAL MEDIA" copy="New account setup, optimisation, management or content only.">
          <label>WHAT DO YOU NEED?<select value={selection.socialService} onChange={(event) => update("socialService", event.target.value as PackageSelection["socialService"])}><option value="setup">Set up new social accounts</option><option value="optimise">Optimise existing accounts</option><option value="management">Ongoing management + content</option><option value="content">Content creation only</option></select></label>
          {selection.socialService !== "content" && <NumberField label="NUMBER OF ACCOUNTS" value={selection.socialAccounts} min={1} max={8} onChange={(value) => update("socialAccounts", value)} />}
          {(selection.socialService === "management" || selection.socialService === "content") && <label>POSTS / REELS PER MONTH<select value={selection.contentVolume} onChange={(event) => update("contentVolume", Number(event.target.value) as PackageSelection["contentVolume"])}><option value={8}>8 pieces</option><option value={12}>12 pieces</option><option value={20}>20 pieces</option></select></label>}
        </ToggleCard>

        <ToggleCard checked={selection.automationEnabled} onChange={(value) => update("automationEnabled", value)} title="AI + N8N AUTOMATION" copy="Reporting, leads, content, monitoring or a custom workflow.">
          <label>AUTOMATION TYPE<select value={selection.automationType} onChange={(event) => update("automationType", event.target.value as PackageSelection["automationType"])}>{Object.entries(AUTOMATION_TYPE_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <label>COMPLEXITY<select value={selection.automationComplexity} onChange={(event) => update("automationComplexity", event.target.value as PackageSelection["automationComplexity"])}><option value="basic">Basic</option><option value="advanced">Advanced</option></select></label>
          <NumberField label="NUMBER OF AUTOMATIONS" value={selection.automationCount} min={1} max={10} onChange={(value) => update("automationCount", value)} />
        </ToggleCard>

        <ToggleCard checked={selection.adsEnabled} onChange={(value) => update("adsEnabled", value)} title="PAID ADS MANAGEMENT" copy="Choose every advertising platform we should manage.">
          <div className="builder-check-grid">{["Meta Ads", "Google Ads", "LinkedIn Ads"].map((platform) => <label className="inline-check" key={platform}><input type="checkbox" checked={selection.adPlatforms.includes(platform)} onChange={() => togglePlatform(platform)} /> {platform}</label>)}</div>
        </ToggleCard>

        <ToggleCard checked={selection.marketplaceEnabled} onChange={(value) => update("marketplaceEnabled", value)} title="MARKETPLACE MANAGEMENT" copy="Listings, optimisation and ongoing operations across the channels you use.">
          <div className="builder-check-grid">{["IndiaMART", "Amazon", "Flipkart", "Facebook Marketplace", "OLX", "eBay", "Etsy", "Other"].map((marketplace) => <label className="inline-check" key={marketplace}><input type="checkbox" checked={selection.marketplaces.includes(marketplace)} onChange={() => toggleMarketplace(marketplace)} /> {marketplace}</label>)}</div>
          {selection.marketplaces.includes("Other") && <label className="builder-wide-field">OTHER MARKETPLACE(S)<input type="text" maxLength={200} value={selection.otherMarketplace} onChange={(event) => update("otherMarketplace", event.target.value)} placeholder="Type the platform name(s)" /></label>}
        </ToggleCard>

        <article className="builder-service builder-service-active"><div className="builder-static-title"><strong>SEARCH + AI VISIBILITY</strong><small>Choose one or combine them into a complete visibility system.</small></div><div className="builder-check-grid search-options">
          <label className="inline-check"><input type="checkbox" checked={selection.seo} onChange={(event) => update("seo", event.target.checked)} /> SEO</label>
          <label className="inline-check"><input type="checkbox" checked={selection.aeo} onChange={(event) => update("aeo", event.target.checked)} /> AEO</label>
          <label className="inline-check"><input type="checkbox" checked={selection.geo} onChange={(event) => update("geo", event.target.checked)} /> GEO</label>
          <label className="inline-check"><input type="checkbox" checked={selection.backlinks} onChange={(event) => update("backlinks", event.target.checked)} /> Backlinking</label>
        </div></article>

        <div className="builder-small-services">
          <ToggleCard checked={selection.googleProfile} onChange={(value) => update("googleProfile", value)} title="GOOGLE BUSINESS PROFILE" copy="New setup, existing-profile optimisation or management.">
            <label>WHAT DO YOU NEED?<select value={selection.googleProfileService} onChange={(event) => update("googleProfileService", event.target.value as PackageSelection["googleProfileService"])}><option value="setup">Set up a new profile</option><option value="optimise">Optimise / rebuild existing profile</option><option value="management">Ongoing profile management</option></select></label>
          </ToggleCard>
          <ToggleCard checked={selection.strategyReporting} onChange={(value) => update("strategyReporting", value)} title="STRATEGY + REPORTING" copy="Monthly reporting and two calls." />
        </div>

        <label className="builder-details">MORE DETAILS / TOOLS / GOALS<textarea rows={5} maxLength={3000} value={selection.otherDetails} onChange={(event) => update("otherDetails", event.target.value)} placeholder="Example: Employees submit updates in Google Forms, manager receives a Friday email summary. We use Zoho CRM and WhatsApp..." /></label>
      </div>

      <aside className="builder-summary print-package">
        <div className="print-brand">
          <div className="print-brand-lockup">
            <img src="/brand/brand-icon.jpeg" alt="Gazab Ki Agency" />
            <div><strong>GAZAB KI<br />AGENCY</strong><small>MARKETING · AI · AUTOMATION</small></div>
          </div>
          <div className="print-brand-meta"><strong>CUSTOM DIGITAL GROWTH PROPOSAL</strong><span>{countryLabel}</span></div>
        </div>
        <p className="kicker">YOUR PACKAGE</p><h3>{hasServices ? `${estimate.lines.length} SERVICE${estimate.lines.length === 1 ? "" : "S"}` : "START BUILDING"}</h3>
        <div className="builder-line-items">{hasServices ? estimate.lines.map((line) => <div key={line.label}><span>{line.label}</span><b>{line.complimentary ? "FREE" : <>{line.setup > 0 && `${formatMoney(line.setup, currency)} setup`}{line.setup > 0 && line.monthly > 0 && " + "}{line.monthly > 0 && `${formatMoney(line.monthly, currency)}/mo`}</>}</b></div>) : <p>Select services on the left to create your estimate.</p>}</div>
        {estimate.complimentary.length > 0 && <div className="builder-complimentary"><strong>ALWAYS COMPLIMENTARY</strong>{estimate.complimentary.map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div>}
        <div className="builder-totals"><div><span>SETUP</span><strong>{formatMoney(estimate.setupTotal, currency)}</strong></div><div><span>MONTHLY</span><strong>{formatMoney(estimate.monthlyTotal, currency)}</strong></div><div className="first-month"><span>ESTIMATED FIRST MONTH</span><strong>{formatMoney(estimate.firstMonthTotal, currency)}</strong></div></div>
        <p className="estimate-note">Starting estimate only. Final pricing is confirmed after a scope call. No lock-in period; each month is paid in advance. Ad spend and third-party subscriptions are not included.</p>
        <button className="print-package-button" type="button" onClick={() => window.print()} disabled={!hasServices}><Printer size={18} /> PRINT / SAVE AS PDF</button>
        <form className="package-request-form" onSubmit={submit}><h4>REQUEST THIS PACKAGE</h4><div className="form-row"><label>NAME<input name="name" required maxLength={100} /></label><label>COMPANY<input name="company" maxLength={120} /></label></div><label>EMAIL<input name="email" type="email" required maxLength={255} /></label><label>WHATSAPP / PHONE<input name="phone" type="tel" required maxLength={30} /></label>{error && <p className="builder-error" role="alert">{error}</p>}{successId && <p className="builder-success" role="status">Package received. We’ll contact you shortly.<small>Request: {successId.slice(0, 8).toUpperCase()}</small></p>}<button type="submit" disabled={submitting || !hasServices}>{submitting ? "SENDING..." : "REQUEST THIS PACKAGE"} <ArrowRight size={19} /></button></form>
      </aside>
    </div>
  </section>;
}
