import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { PackageBuilder } from "../components/package-builder";
import { getPublicPricing, getPublicTrackingConfig } from "../lib/package-actions";
import { formatMoney, INTERNATIONAL_SERVICE_PRICING, type PricingMarket } from "../lib/package-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gazab Ki Agency — Marketing, AI & Automation" },
      { name: "description", content: "A bold growth agency for social media, content, ads, websites, lead generation, AI and business automation." },
      { property: "og:title", content: "Gazab Ki Agency — Marketing, AI & Automation" },
      { property: "og:description", content: "Make your marketing remarkable with creative growth systems built for ambitious brands." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    const [pricing, tracking] = await Promise.all([getPublicPricing(), getPublicTrackingConfig()]);
    return { pricing, tracking };
  },
  component: Index,
});

const nav = ["home", "services", "results", "solutions", "work", "pricing", "about", "contact"];
const heroKeywords = ["ATTENTION.", "LEADS.", "SALES.", "TIME BACK."];
const countryOptions = [
  ["IN", "India — INR (₹)"], ["US", "United States — USD ($)"], ["GB", "United Kingdom — USD ($)"],
  ["AE", "United Arab Emirates — USD ($)"], ["QA", "Qatar — USD ($)"], ["SA", "Saudi Arabia — USD ($)"],
  ["CA", "Canada — USD ($)"], ["AU", "Australia — USD ($)"], ["SG", "Singapore — USD ($)"],
  ["DE", "Germany — USD ($)"], ["FR", "France — USD ($)"], ["NL", "Netherlands — USD ($)"],
  ["NZ", "New Zealand — USD ($)"], ["ZA", "South Africa — USD ($)"], ["OTHER", "Other country — USD ($)"],
] as const;
const services = [
  ["01", "SOCIAL MEDIA", "Content calendars, reels, posts, community management and growth strategy.", "✦"],
  ["02", "CONTENT THAT HITS", "Creative concepts, short-form video, graphics and campaign creatives.", "↗"],
  ["03", "PAID ADS", "Meta Ads, lead generation, retargeting and creative testing.", "◎"],
  ["04", "LEAD GENERATION", "IndiaMART, landing pages, social campaigns and conversion systems.", "⚡"],
  ["05", "WEBSITE & DIGITAL", "Website strategy, development, management, maintenance and conversion improvements.", "◒"],
  ["06", "AI + AUTOMATION", "n8n workflows, AI tools, reporting, lead handling and custom business systems.", "✳"],
  ["07", "MARKETPLACE GROWTH", "IndiaMART, Facebook, OLX, Amazon, Flipkart and listing optimisation.", "＋"],
  ["08", "GOOGLE PRESENCE", "Business Profile, reviews, reputation and local discoverability.", "★"],
];
const stats = [
  { value: "100M+", label: "COMBINED ORGANIC REACH", detail: "Across managed client channels" },
  { value: "330K+", label: "FOLLOWERS GROWN", detail: "Combined client audience growth" },
  { value: "16.5M+", label: "CONTENT INTERACTIONS", detail: "Likes, comments, shares and saves" },
  { value: "1.3M+", label: "WEBSITE VISITS", detail: "Generated across client properties" },
  { value: "7.8X", label: "AVERAGE PAID ADS ROAS", detail: "Average return on tracked ad spend" },
  { value: "30K", label: "COMMUNITY GROWN IN 1 MONTH", detail: "7.5K → 30K · +300%" },
];
const resultProofs = [
  { client: "RADIOANDMUSIC", platform: "INSTAGRAM INSIGHTS", result: "Reach grew from 1.3M to 73.1M", image: "/results/radioandmusic-instagram.png" },
  { client: "GERRYSON MEHTA", platform: "LINKEDIN INSIGHTS", result: "49,733 impressions and 3,681 followers", image: "/results/gerryson-mehta-linkedin.png" },
  { client: "DATA ANALYTICS COMPANY — HR", platform: "LINKEDIN INSIGHTS", result: "96,966 impressions and 1,306 followers", image: "/results/data-analytics-hr-linkedin.png" },
  { client: "DATA ANALYTICS COMPANY", platform: "WHATSAPP CHANNEL", result: "Built from scratch to 101 followers", image: "/results/data-analytics-whatsapp.png" },
];
const cases = [
  ["RADIOANDMUSIC / INDIAN TELEVISION", "Social growth, content, event promotions and monetisation.", "SOCIAL GROWTH"],
  ["BARRIERBREAK", "Event social media coverage for Inclusive India: Digital First 2025.", "EVENT COVERAGE"],
  ["RENTMAX", "Website improvement, content strategy and Meta lead generation.", "LEAD GENERATION"],
  ["MOTOHOM", "Content production, community management and Instagram growth.", "CONTENT SYSTEM"],
  ["FURNDEPOT", "Organic growth strategy, analytics and creative campaigns.", "ORGANIC GROWTH"],
];
const ubiqedgeLinkedInStats = [
  ["1,239 → 4,416", "FOLLOWERS", "+3,177 / +256.4%"],
  ["99.9%", "NEW FOLLOWERS ORGANIC", "3,173 of 3,177"],
  ["83,315", "CONTENT IMPRESSIONS", "1,344 reactions"],
  ["12,833", "PAGE VIEWS", "4,347 unique visitors"],
  ["388 → 1,786", "NEWSLETTER SUBSCRIBERS", "+1,398 / +360.3%"],
  ["2,379", "ARTICLE VIEWS", "9,554 impressions"],
] as const;
const ubiqedgeLinkedInProofs = [
  ["CONTENT PERFORMANCE", "83,315 impressions · 1,344 reactions", "/results/ubiqedge-linkedin-content.jpg"],
  ["FOLLOWER GROWTH", "4,416 total · 3,177 added", "/results/ubiqedge-linkedin-followers.jpg"],
  ["PAGE VISITORS", "12,833 views · 4,347 unique visitors", "/results/ubiqedge-linkedin-visitors.jpg"],
  ["NEWSLETTER GROWTH", "1,786 subscribers · 1,398 added", "/results/ubiqedge-linkedin-newsletter.jpg"],
  ["COMPETITOR BENCHMARKING", "Category growth and engagement tracking", "/results/ubiqedge-linkedin-competitors.jpg"],
] as const;
const process = [
  ["01", "DISCOVER", "We understand the business, audience, competitors and actual problem."],
  ["02", "BUILD", "We create the content, campaigns, websites and systems."],
  ["03", "AUTOMATE", "We remove repetitive work wherever technology can handle it."],
  ["04", "GROW", "We track what works, optimise it and keep improving."],
];
const builtProducts = [
  {
    name: "LINKS DC",
    category: "LINK-IN-BIO / LIVE",
    copy: "Custom link-in-bio pages with analytics, brand controls and custom-domain support.",
    href: "https://links.dalvi.cloud/",
  },
  {
    name: "YT SCHEDULER",
    category: "CONTENT OPS / LIVE",
    copy: "A multi-platform content workspace with queues, calendar, analytics, media library and account health.",
    href: "https://ytscheduler.dalvi.cloud/",
  },
  {
    name: "DALVICARD CRM",
    category: "AI TOOL / LIVE",
    copy: "An AI-powered business-card scanner that turns physical cards into organised CRM contacts.",
    href: "https://cards.dalvi.cloud/",
  },
  {
    name: "MONEYFIVE",
    category: "ANDROID APP / LIVE",
    copy: "An AI money manager for expenses, SMS payment parsing, budgets, cards and private money insights.",
    href: "https://play.google.com/store/apps/details?id=com.moneyfive.moneyfive&hl=en_IN",
  },
  {
    name: "INDIAMART LEAD EXTRACTOR",
    category: "CHROME EXTENSION / LIVE",
    copy: "Exports IndiaMART buyer leads to Google Sheets, skips duplicates and supports bulk extraction.",
    href: "https://chromewebstore.google.com/detail/indiamart-lead-extractor/oohpjlfnfogjchmdeemhipjjdjbgegic?hl=en-US&utm_source=ext_sidebar",
  },
  {
    name: "IM APPLIER",
    category: "INDIAMART AUTOMATION / GITHUB",
    copy: "Automates IndiaMART product listings with AI-written titles and descriptions plus image, PDF and video uploads — built for up to 1,000 products a day.",
    href: "https://github.com/Abdallahdalvi/IM-Applier-V1",
    linkLabel: "VIEW ON GITHUB",
  },
];
const automationSystems = [
  {
    type: "N8N + AI AUTOMATION",
    title: "WEEKLY WORK REPORTING",
    copy: "Collect employee updates on schedule, structure and summarise them with AI, then deliver one manager-ready report.",
  },
  {
    type: "AI VISIBILITY / GEO",
    title: "AI PRESENCE MONITORING",
    copy: "Repeatable checks track how a company or founder appears in AI answers, then reveal citation gaps, competitor mentions and next actions.",
  },
  {
    type: "CUSTOM OPERATIONS",
    title: "WORKFLOWS THAT DO THE BUSYWORK",
    copy: "Connect forms, sheets, inboxes, CRMs and alerts so leads move faster and routine admin stops eating the week.",
  },
];
const clientWebsites = [
  {
    name: "UNIVERSAL TRADER INDIA",
    category: "CLASSIC PHONES / E-COMMERCE",
    copy: "Nokia and BlackBerry keypad, QWERTY, flip and slide phones with accessories and nationwide ordering.",
    href: "https://universaltraderindia.com/",
  },
  {
    name: "RENTMAX",
    category: "REAL ESTATE / LEAD GENERATION",
    copy: "Premium rental listings, property filters and visit-booking journeys.",
    href: "https://rentmax.in/",
  },
  {
    name: "GERRYSON MEHTA",
    category: "PERSONAL BRAND / SERVICES",
    copy: "A data analyst's portfolio with mentorship offers, work history and conversion CTAs.",
    href: "https://gerrysonmehta.com/",
  },
  {
    name: "RED OLIVE VACATIONS",
    category: "TRAVEL / PILGRIMAGE",
    copy: "Tour packages, pilgrimage and visa services with clear enquiry flows.",
    href: "https://www.redolivevnl.com/",
  },
  {
    name: "AGHANIMS PHONES",
    category: "HARD-TO-FIND PHONES / GADGETS",
    copy: "Unique keypad, QWERTY, flip and compact devices you will not find in a regular smartphone store.",
    href: "https://aghanimsphones.in/",
  },
];
const buildServices = [
  "WEBSITE DEVELOPMENT",
  "ONGOING WEBSITE MANAGEMENT",
  "N8N AUTOMATIONS",
  "CUSTOM AI TOOLS",
  "INTERNAL APPS",
  "AI VISIBILITY / GEO",
  "MARKETPLACE AUTOMATION",
];

function ButtonLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return <a href={href} className={`brand-button ${dark ? "brand-button-dark" : ""}`}>{children}</a>;
}

function Index() {
  const { pricing, tracking } = Route.useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [market, setMarket] = useState<PricingMarket>("IN");
  const activePricing = market === "INTL" ? INTERNATIONAL_SERVICE_PRICING : pricing;
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 50);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localeRegion = navigator.languages.map((language) => language.match(/[-_]([A-Z]{2})$/i)?.[1]?.toUpperCase()).find(Boolean);
    const timezoneCountry = timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta" ? "IN" : timezone === "Asia/Qatar" ? "QA" : timezone === "Asia/Dubai" ? "AE" : undefined;
    const detected = timezoneCountry || localeRegion || "OTHER";
    const supported = countryOptions.some(([code]) => code === detected) ? detected : "OTHER";
    setSelectedCountry(supported);
    setMarket(supported === "IN" ? "IN" : "INTL");
  }, []);
  const changeCountry = (country: string) => {
    setSelectedCountry(country);
    setMarket(country === "IN" ? "IN" : "INTL");
  };
  const selectedCountryLabel = countryOptions.find(([code]) => code === selectedCountry)?.[1] || "Other country — USD ($)";
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Gazab project enquiry — ${String(data.get("company") || data.get("name"))}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nNeed: ${data.get("need")}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`);
    window.location.href = `mailto:dalviabdallah76@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <main id="home" className="overflow-hidden bg-background text-foreground">
      <TrackingPixels config={tracking} />
      <header className={`site-nav ${compact ? "site-nav-compact" : ""}`}>
        <a href="#home" aria-label="Gazab Ki Agency home" className="nav-brand"><img src="/brand/brand-icon.jpeg" alt="" /><span>GAZAB KI AGENCY</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav>
        <div className="nav-actions"><label className="nav-country"><select value={selectedCountry} onChange={(event) => changeCountry(event.target.value)} aria-label="Choose your country for pricing">{countryOptions.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select></label><a className="nav-cta" href="#contact">LET'S MAKE IT GAZAB <ArrowRight size={18} /></a></div>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav">{nav.map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav>}
      </header>

      <section className="hero-section section-shell">
        <div className="hero-copy">
          <span className="eyebrow">MARKETING <i>•</i> AI <i>•</i> AUTOMATION</span>
          <h1 aria-label="More attention, leads, sales and time back. Less chaos.">
            <span className="hero-line hero-line-dark">MORE</span>
            <span className="hero-word-window" aria-hidden="true">
              <span className="hero-word-track">
                {[...heroKeywords, heroKeywords[0]].map((keyword, index) => <span className="hero-word" key={`${keyword}-${index}`}>{keyword}</span>)}
              </span>
            </span>
            <span className="hero-line hero-line-purple">LESS CHAOS.</span>
          </h1>
          <p>Marketing, AI and automation built to win attention,<br className="hidden sm:block" /> generate leads and give your team time back.</p>
          <div className="button-row"><ButtonLink href="#contact">LET'S MAKE IT GAZAB <ArrowRight /></ButtonLink><ButtonLink href="#work" dark>SEE WHAT WE'VE DONE <ArrowDown /></ButtonLink></div>
        </div>
        <div className="hero-art" aria-label="Gazab Ki Agency logo artwork">
          <img src="/brand/hero-brand.jpeg" alt="Gazab Ki Agency — Marketing, AI, Automation" />
          <span className="sticker sticker-one">NO BORING BRANDS</span><span className="sticker sticker-two">AI IN ACTION</span><span className="sticker sticker-three">MORE LEADS ↗</span>
        </div>
      </section>
      <div className="marquee"><div>SOCIAL MEDIA • CONTENT • ADS • AI • AUTOMATION • WEBSITES • LEADS • GROWTH • SOCIAL MEDIA • CONTENT • ADS • AI • AUTOMATION • WEBSITES • LEADS • GROWTH •</div></div>

      <section id="services" className="section-shell cream-section">
        <div className="section-heading"><span className="section-number">02</span><div><p className="kicker">WHAT WE DO / WHAT MATTERS</p><h2>BUILD A BUSINESS.<br /><span>MAKE IT GAZAB.</span></h2></div></div>
        <p className="lead-copy">We don't just post content and call it marketing. We build the digital systems around your business — from attention and content to leads, websites and automation.</p>
        <div className="services-grid">{services.map(([n, title, copy, icon], i) => <article className={`service-card service-${i + 1}`} key={title}><div className="service-top"><span>{n}</span><b>{icon}</b></div><h3>{title}</h3><p>{copy}</p><span className="card-arrow">↗</span></article>)}</div>
      </section>

      <section id="results" className="black-section section-shell">
        <p className="kicker kicker-orange">OK BUT CAN YOU ACTUALLY DO IT?</p><h2 className="receipts">THE<br /><span>RECEIPTS.</span></h2>
        <div className="proof-intro"><h3>Organic growth.<br />Real numbers.</h3><p>Across client channels, our founder-led work has generated more than 100M organic reach, 330K followers and 16.5M meaningful interactions — including likes, comments, shares and saves. Paid campaigns average 7.8x ROAS.</p></div>
        <div className="stats-grid">{stats.map(({ value, label, detail }, i) => <article key={label} className={`stat stat-${i + 1}`}><strong>{value}</strong><span>{label}<small>{detail}</small></span></article>)}</div>
        <div className="results-gallery">
          {resultProofs.map(({ client, platform, result, image }, index) => <article className="result-proof-card" key={client + platform}>
            <a className="result-proof-image" href={image} target="_blank" rel="noreferrer" aria-label={`Open full ${platform.toLowerCase()} for ${client}`}>
              <img src={image} alt={`${platform} showing ${result} for ${client}`} loading="lazy" />
            </a>
            <div className="result-proof-copy"><span>0{index + 1} / {platform}</span><h3>{client}</h3><p>{result}</p><a href={image} target="_blank" rel="noreferrer">OPEN FULL INSIGHT <ArrowUpRight size={17} /></a></div>
          </article>)}
        </div>
        <p className="proof-note">Founder-led track record based on Abdallah's professional experience. No borrowed glory. No made-up numbers.</p>
      </section>

      <section id="solutions" className="solutions-section section-shell">
        <div className="solutions-heading">
          <div><p className="kicker">PRODUCTS / AUTOMATIONS / CLIENT PLATFORMS</p><h2>NOT JUST IDEAS.<br /><span>WORKING SYSTEMS.</span></h2></div>
          <p>Gazab has shipped real apps, browser tools, AI products, n8n workflows and business websites. We can build the whole system or handle one clearly defined service.</p>
        </div>

        <div className="solutions-label"><span>01</span><h3>LIVE PRODUCTS</h3><p>Open them. Use them. Judge the work.</p></div>
        <div className="product-grid">
          {builtProducts.map(({ name, category, copy, href, linkLabel }, index) => <a className="product-card" href={href} target="_blank" rel="noreferrer" key={name}>
            <div className={`product-thumbnail product-thumbnail-${index + 1}`} aria-hidden="true"><i /><i /><i /><strong>{["LINKS", "SCHEDULE", "SCAN", "₹ AI", "LEADS", "1K/DAY"][index]}</strong><span>{["↗", "▦", "▣", "₹", "⇩", "⚡"][index]}</span></div>
            <span>{String(index + 1).padStart(2, "0")} / {category}</span><h3>{name}</h3><p>{copy}</p><b>{linkLabel || "OPEN PRODUCT"} <ArrowUpRight size={18} /></b>
          </a>)}
        </div>

        <div className="solutions-label"><span>02</span><h3>AUTOMATION SYSTEMS</h3><p>Built around the way your team actually works.</p></div>
        <div className="automation-grid">
          {automationSystems.map(({ type, title, copy }) => <article className="automation-card" key={title}><span>{type}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">BUILD A SYSTEM <ArrowRight size={18} /></a></article>)}
        </div>

        <div className="websites-block">
          <div className="solutions-label"><span>03</span><h3>CLIENT WEBSITES</h3><p>Strategy, build, launch and ongoing management.</p></div>
          <div className="website-list">{clientWebsites.map(({ name, category, copy, href }, index) => <a href={href} target="_blank" rel="noreferrer" key={name}>
            <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{name}</strong><small>{category}</small></div><p>{copy}</p><ArrowUpRight />
          </a>)}</div>
        </div>

        <div className="build-service-strip"><strong>AVAILABLE INDIVIDUALLY:</strong>{buildServices.map((service) => <span key={service}>{service}</span>)}</div>
      </section>

      <section id="work" className="work-section">
        <div className="section-shell work-head"><p className="kicker">SELECTED WORK / TAKE A LOOK →</p><h2>SEE THE WORK.<br /><span>THEN LET'S TALK.</span></h2></div>
        <article className="company-case-study section-shell">
          <div className="company-case-heading">
            <div><p className="kicker">COMPANY CASE STUDY / 01</p><h3>UBIQEDGE.<br /><span>LINKEDIN THAT COMPOUNDS.</span></h3></div>
            <div className="company-case-intro"><div className="channel-tabs"><b>LINKEDIN</b><span>INSTAGRAM / COMING NEXT</span><span>FACEBOOK / COMING NEXT</span></div><p>Ubiqedge needed a consistent B2B presence that could grow a relevant professional audience, earn repeat page visits and turn industry content into an owned newsletter audience.</p><a href="https://ubiqedge.com" target="_blank" rel="noreferrer">VISIT UBIQEDGE.COM <ArrowUpRight size={18} /></a></div>
          </div>

          <div className="company-case-stats">{ubiqedgeLinkedInStats.map(([value, label, detail]) => <div key={label}><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>)}</div>

          <div className="company-case-story">
            <div><span>01 / CHALLENGE</span><h4>BUILD AUTHORITY, NOT EMPTY REACH.</h4><p>The goal was to make a specialist technology brand easier to discover and worth following—while reaching engineers, business-development teams, decision-makers and future hires.</p></div>
            <div><span>02 / EXECUTION</span><h4>CONSISTENT, INDUSTRY-LED CONTENT.</h4><p>We built the LinkedIn engine around company news, hiring, engineering, infrastructure and sector insight; maintained the publishing rhythm; grew the newsletter; and used analytics and competitor tracking to refine the work.</p></div>
            <div><span>03 / OUTCOME</span><h4>AN ORGANIC AUDIENCE THAT KEPT GROWING.</h4><p>The page added 3,177 followers—3,173 organically—while content generated 83K+ impressions, the page attracted 12.8K visits and the newsletter added nearly 1.4K subscribers.</p></div>
          </div>

          <div className="company-case-proof-grid">{ubiqedgeLinkedInProofs.map(([label, result, image]) => <a href={image} target="_blank" rel="noreferrer" key={label}><div><img src={image} alt={`Ubiqedge LinkedIn analytics — ${label.toLowerCase()}`} /></div><span>{label}</span><strong>{result}</strong><small>OPEN SOURCE SCREENSHOT <ArrowUpRight size={14} /></small></a>)}</div>
          <p className="company-case-source">LINKEDIN ANALYTICS · 15 DEC 2025–16 SEP 2026 · FOLLOWER STARTING VALUES CALCULATED AS CURRENT TOTAL MINUS REPORTED NEW FOLLOWERS. THIS IS THE LINKEDIN CHAPTER; OTHER CHANNELS WILL BE ADDED AS THEIR DATA IS SUPPLIED.</p>
        </article>
        <div className="case-scroll">{cases.map(([brand, copy, discipline], i) => <article className="case-card" key={brand}><div className={`case-image case-visual case-visual-${i + 1}`}><span>0{i + 1} / {discipline}</span><strong>{brand}</strong><b>GAZAB / WORK ↗</b></div><div className="case-copy"><span>0{i + 1} / CASE STUDY</span><h3>{brand}</h3><p>{copy}</p><b>VIEW THE WORK <ArrowUpRight /></b></div></article>)}</div>
      </section>

      <section className="process-section section-shell">
        <p className="kicker">OUR APPROACH</p><h2>HOW WE MAKE IT <span>HAPPEN.</span></h2>
        <div className="process-grid">{process.map(([n, title, copy]) => <article key={n}><strong>{n}</strong><div><h3>{title}</h3><p>{copy}</p></div><span className="process-arrow">→</span></article>)}</div>
      </section>

      <section className="systems-section section-shell">
        <div><p className="kicker kicker-orange">POSTING ≠ MARKETING</p><h2>POSTS ALONE<br /><span>DON'T GROW A BUSINESS.</span></h2><p className="lead-copy">Marketing works when content, traffic, conversion and operations are connected.</p></div>
        <div className="system-flow">{["ATTENTION", "CONTENT", "TRAFFIC", "LEADS", "SALES", "RETENTION", "AUTOMATION"].map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong>{i < 6 && <b>↓</b>}</div>)}</div>
      </section>

      <section id="pricing" className="pricing-section section-shell">
        <p className="kicker">PRICING / STRAIGHT TALK</p><h2>WHAT DOES IT <span>COST?</span></h2><p className="lead-copy">Clear packages, India-first pricing and no confusing 17-page document.</p>
        <p className="country-pricing-status">Prices below are shown for <b>{selectedCountryLabel}</b>. Change country from the selector beside the top CTA.</p>
        <div className="pricing-promises"><span><Check size={21} /> <b>NO LOCK-IN. EVER.</b></span><span><Check size={21} /> PAY MONTH-BY-MONTH IN ADVANCE</span><span><Check size={21} /> FREE 5-YEAR HOSTING</span><span><Check size={21} /> FREE LINKS DC + MONTHLY AI VISIBILITY REPORT</span></div>
        <div className="pricing-grid">
          <PriceCard number="01" title="GAZAB STARTER" price={formatMoney(activePricing.starterMonthly, market === "INTL" ? "USD" : "INR")} billing=" / MONTH" note="The complete digital foundation for a new business or startup that wants us to handle the essentials." items={["Business website setup + development", "FREE hosting for 5 years", "Ongoing website management", "2 social accounts: setup, optimisation + management", "8 posts / reels every month", "Google Business Profile setup + optimisation", "Monthly strategy + performance report", "2 strategy calls every month", "Complimentary Links DC page", "FREE monthly AI visibility report"]} cta="CHOOSE STARTER" />
          <PriceCard number="02" title="FULL GAZAB" price={formatMoney(activePricing.fullMonthly, market === "INTL" ? "USD" : "INR")} billing=" / MONTH" note="The done-for-you growth package for businesses that want visibility, leads and systems without managing multiple vendors." items={["Everything in Gazab Starter", "12 posts / reels every month", "4 social accounts managed", "Website SEO", "AEO + GEO / AI visibility", "Monthly backlink building", "2 basic business automations", "Paid ads management", "Advanced analysis + reporting", "Priority strategy support"]} cta="CHOOSE FULL GAZAB" featured />
          <PriceCard number="03" title="CUSTOM GAZAB" price="CUSTOM" note="For businesses with a specific scope, unusual workflow or a combination that does not fit a standard package." items={["Tailored strategy and scope", "Custom AI and n8n systems", "Website, content and ads as needed", "Marketplace operations", "One clear proposal", "Built around your team and tools"]} cta="LET'S SCOPE IT" />
        </div>
      </section>

      <PackageBuilder pricing={activePricing} market={market} countryLabel={selectedCountryLabel} />

      <section className="why-section section-shell">
        <p className="kicker">WHY US?</p><h2>WHY <span>GAZAB?</span></h2>
        <div className="why-list"><strong>NO BORING CONTENT.</strong><strong>NO COPY-PASTE STRATEGIES.</strong><strong>NO RANDOM POSTING.</strong><strong>NO EMPTY PROMISES.</strong></div>
        <div className="formula"><span>STRATEGY</span><b>+</b><span>CREATIVITY</span><b>+</b><span>TECHNOLOGY</span></div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="founder-art"><div className="founder-z">Z</div><span>FOUNDER-LED.<br />SYSTEM-OBSESSED.</span></div>
        <div><p className="kicker">ABOUT THE FOUNDER</p><h2>MEET THE MIND<br /><span>BEHIND GAZAB.</span></h2><h3>ABDALLAH DALVI</h3><h4>FOUNDER / GROWTH & MARKETING STRATEGIST</h4><p>Abdallah works across social media, digital marketing, growth, content, websites, AI and automation — combining creative execution with systems that help businesses grow.</p><div className="tag-list">{["SOCIAL STRATEGY", "AI AUTOMATION", "LEAD GENERATION", "WEBSITES", "CONTENT", "PAID ADS"].map(t => <span key={t}>{t}</span>)}</div></div>
      </section>

      <section className="mega-cta section-shell"><span className="cta-sticker">READY?</span><p>YOUR NEXT STEP.</p><h2>LET'S MAKE<br />YOUR BUSINESS<br /><span>GAZAB.</span></h2><div className="button-row"><ButtonLink href="#contact">START A PROJECT <ArrowRight /></ButtonLink><ButtonLink dark href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20let%27s%20make%20my%20business%20Gazab!">WHATSAPP US <ArrowUpRight /></ButtonLink></div></section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-info"><p className="kicker">NO CORPORATE JARGON REQUIRED.</p><h2>LET'S<br /><span>TALK.</span></h2><a href="mailto:dalviabdallah76@gmail.com">dalviabdallah76@gmail.com ↗</a><a href="tel:+917400239134">+91 74002 39134 ↗</a><a href="https://www.linkedin.com/in/abdallahdalvi" target="_blank" rel="noreferrer">LINKEDIN ↗</a><span className="social-pending">INSTAGRAM — LINK COMING SOON</span></div>
        <form onSubmit={submit} className="contact-form"><div className="form-row"><label>NAME<input name="name" required maxLength={100} /></label><label>COMPANY<input name="company" maxLength={100} /></label></div><div className="form-row"><label>EMAIL<input name="email" type="email" required maxLength={255} /></label><label>PHONE<input name="phone" type="tel" maxLength={20} /></label></div><div className="form-row"><label>WHAT DO YOU NEED?<select name="need" required defaultValue=""><option value="" disabled>Choose a service</option><option>Social media</option><option>Content & reels</option><option>Paid ads & leads</option><option>Website development & management</option><option>n8n automation</option><option>Custom AI tool or app</option><option>AI visibility / GEO</option><option>Full Gazab</option></select></label><label>BUDGET<select name="budget" required defaultValue=""><option value="" disabled>Pick a range</option>{market === "IN" ? <><option>₹5K–₹15K / month</option><option>₹15K–₹30K / month</option><option>₹30K+ / month</option></> : <><option>$99–$299 / month</option><option>$299–$599 / month</option><option>$599+ / month</option></>}<option>Let's discuss</option></select></label></div><label>MESSAGE<textarea name="message" required maxLength={1500} rows={4} /></label><button className="form-submit" type="submit">START THE CONVERSATION <ArrowRight /></button></form>
      </section>

      <a className="whatsapp-widget" href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20I%20want%20to%20discuss%20a%20Gazab%20package." target="_blank" rel="noreferrer" aria-label="Chat with Gazab Ki Agency on WhatsApp"><img src="/brand/whatsapp-icon.png" alt="" /><span><small>QUICK QUESTION?</small>CHAT ON WHATSAPP</span></a>

      <footer><div className="footer-main section-shell"><img className="footer-brand-banner" src="/brand/footer-brand-banner.png" alt="Gazab Ki Agency — Marketing, AI and Automation" /><nav>{nav.map(item => <a key={item} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav></div><div className="footer-strip"><strong>GAZAB KI AGENCY BY AGHANIMS GROUP</strong><span>© 2026 Aghanims Group. All Rights Reserved.</span><span>Made with too much coffee & too many ideas.</span></div></footer>
    </main>
  );
}

function PriceCard({ number, title, price, billing, note, items, cta, href = "#contact", featured = false }: { number: string; title: string; price: string; billing?: string; note: string; items: string[]; cta: string; href?: string; featured?: boolean }) {
  return <article className={`price-card ${featured ? "featured" : ""}`}>{featured && <span className="popular">MOST POPULAR ✦</span>}<span className="price-number">PACKAGE {number}</span><h3>{title}</h3><strong>{price}{billing && <small>{billing}</small>}</strong><p>{note}</p><ul>{items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><a href={href}>{cta} <ArrowRight /></a></article>;
}

type TrackingConfig = { clarityProjectId: string; gaMeasurementId: string; metaPixelId: string };

function TrackingPixels({ config }: { config: TrackingConfig }) {
  useEffect(() => {
    const appendInline = (id: string, code: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.textContent = code;
      document.head.appendChild(script);
    };
    if (config.clarityProjectId) appendInline("gazab-clarity", `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(config.clarityProjectId)});`);
    if (config.gaMeasurementId && !document.getElementById("gazab-ga-loader")) {
      const loader = document.createElement("script");
      loader.id = "gazab-ga-loader";
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.gaMeasurementId)}`;
      document.head.appendChild(loader);
      appendInline("gazab-ga", `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${JSON.stringify(config.gaMeasurementId)});`);
    }
    if (config.metaPixelId) appendInline("gazab-meta-pixel", `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init",${JSON.stringify(config.metaPixelId)});fbq("track","PageView");`);
  }, [config]);
  return null;
}
