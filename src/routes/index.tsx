import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { PackageBuilder } from "../components/package-builder";
import { getPublicPricing, getPublicTrackingConfig } from "../lib/package-actions";
import { INTERNATIONAL_SERVICE_PRICING, type PricingMarket } from "../lib/package-types";

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

const nav = ["home", "services", "results", "solutions", "work", "build-package", "about", "contact"];
const heroKeywords = ["ATTENTION.", "LEADS.", "SALES.", "TIME BACK."];
const countryOptions = [
  ["IN", "India — INR (₹)"], ["US", "United States — USD ($)"], ["GB", "United Kingdom — USD ($)"],
  ["AE", "United Arab Emirates — USD ($)"], ["QA", "Qatar — USD ($)"], ["SA", "Saudi Arabia — USD ($)"],
  ["CA", "Canada — USD ($)"], ["AU", "Australia — USD ($)"], ["SG", "Singapore — USD ($)"],
  ["DE", "Germany — USD ($)"], ["FR", "France — USD ($)"], ["NL", "Netherlands — USD ($)"],
  ["NZ", "New Zealand — USD ($)"], ["ZA", "South Africa — USD ($)"], ["OTHER", "Other country — USD ($)"],
] as const;
const services = [
  {
    number: "01",
    title: "SOCIAL MEDIA",
    copy: "A consistent, brand-led presence that turns everyday expertise into attention and trust.",
    icon: "✦",
    outcome: "PRESENCE → ENGAGEMENT → DEMAND",
    includes: ["Profile audit and optimisation", "Monthly strategy and content calendar", "Captions, design, reels and publishing", "Community management and reporting"],
  },
  {
    number: "02",
    title: "CONTENT & CREATIVE",
    copy: "Campaign ideas and repeatable creative formats built for how people actually consume content.",
    icon: "↗",
    outcome: "IDEAS → ASSETS → ATTENTION",
    includes: ["Brand messaging and campaign concepts", "Scripts and short-form video", "Static, carousel and campaign design", "Content repurposing across channels"],
  },
  {
    number: "03",
    title: "PAID ADS & PERFORMANCE",
    copy: "Measured campaigns across Meta, Google and LinkedIn—built around leads, sales and learning.",
    icon: "◎",
    outcome: "SPEND → QUALIFIED LEADS → ROAS",
    includes: ["Audience, offer and tracking setup", "Campaign structure and launch", "Creative and audience testing", "Optimisation and performance reporting"],
  },
  {
    number: "04",
    title: "LEAD GENERATION",
    copy: "A complete path from first click to organised follow-up, not a spreadsheet of cold names.",
    icon: "⚡",
    outcome: "TRAFFIC → LEADS → FOLLOW-UP",
    includes: ["Landing pages and conversion forms", "Lead magnets and campaign offers", "IndiaMART and social lead systems", "CRM routing, alerts and lead reporting"],
  },
  {
    number: "05",
    title: "WEBSITES & COMMERCE",
    copy: "Fast, responsive websites that explain the offer clearly and make the next step obvious.",
    icon: "◒",
    outcome: "VISITS → TRUST → CONVERSION",
    includes: ["Strategy, sitemap and conversion journeys", "Responsive UI and development", "Business, WordPress and e-commerce builds", "Maintenance, analytics and improvements"],
  },
  {
    number: "06",
    title: "AI + AUTOMATION",
    copy: "Practical AI and n8n workflows that remove repetitive work from real business operations.",
    icon: "✳",
    outcome: "REPETITION → SYSTEM → TIME BACK",
    includes: ["Workflow discovery and solution design", "n8n integrations and AI workflows", "Lead routing, reporting and content systems", "Testing, documentation and handover"],
  },
  {
    number: "07",
    title: "MARKETPLACE GROWTH",
    copy: "Better listings and smoother enquiry operations across the marketplaces your buyers use.",
    icon: "＋",
    outcome: "LISTINGS → DISCOVERY → ENQUIRIES",
    includes: ["Account and catalogue audit", "Listing creation and keyword optimisation", "IndiaMART, Amazon, Flipkart, OLX and more", "Enquiry workflows and performance reporting"],
  },
  {
    number: "08",
    title: "SEARCH + LOCAL VISIBILITY",
    copy: "Make the business easier to find, understand and trust across search and AI answers.",
    icon: "★",
    outcome: "SEARCH → DISCOVERY → TRUST",
    includes: ["Google Business Profile setup and care", "Technical and on-page SEO", "AEO, GEO and AI visibility monitoring", "Reviews, reputation and visibility reporting"],
  },
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
  {
    brand: "UBIQEDGE",
    copy: "LinkedIn followers grew 1,252 → 4,456 (+255.9%), with 99.8% of new followers acquired organically.",
    discipline: "B2B LINKEDIN",
    href: "/case-studies/ubiqedge",
  },
  { brand: "RADIOANDMUSIC / INDIAN TELEVISION", copy: "Social growth, content, event promotions and monetisation.", discipline: "SOCIAL GROWTH" },
  { brand: "BARRIERBREAK", copy: "Event social media coverage for Inclusive India: Digital First 2025.", discipline: "EVENT COVERAGE" },
  { brand: "RENTMAX", copy: "Website improvement, content strategy and Meta lead generation.", discipline: "LEAD GENERATION" },
  { brand: "MOTOHOM", copy: "Content production, community management and Instagram growth.", discipline: "CONTENT SYSTEM" },
  { brand: "FURNDEPOT", copy: "Organic growth strategy, analytics and creative campaigns.", discipline: "ORGANIC GROWTH" },
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
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item} href={`#${item}`}>{item.replace("-", " ").toUpperCase()}</a>)}</nav>
        <div className="nav-actions"><label className="nav-country"><select value={selectedCountry} onChange={(event) => changeCountry(event.target.value)} aria-label="Choose your country for pricing">{countryOptions.map(([code, label]) => <option value={code} key={code}>{label}</option>)}</select></label><a className="nav-cta" href="#contact">LET'S MAKE IT GAZAB <ArrowRight size={18} /></a></div>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav">{nav.map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item}`}>{item.replace("-", " ").toUpperCase()}</a>)}</nav>}
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
        <div className="services-grid">{services.map(({ number, title, copy, icon, outcome, includes }, i) => <details className={`service-card service-${i + 1}`} key={title}><summary><div className="service-top"><span>{number}</span><b>{icon}</b></div><h3>{title}</h3><p>{copy}</p><strong className="service-outcome">{outcome}</strong><span className="service-expand">SEE WHAT'S INCLUDED <b>＋</b></span></summary><div className="service-details"><ul>{includes.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><a href="#contact">DISCUSS THIS SERVICE <ArrowRight size={17} /></a></div></details>)}</div>
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
        <div className="case-scroll">{cases.map(({ brand, copy, discipline, ...item }, i) => {
          const content = <><div className={`case-image case-visual case-visual-${i + 1}`}><span>0{i + 1} / {discipline}</span><strong>{brand}</strong><b>GAZAB / WORK ↗</b></div><div className="case-copy"><span>0{i + 1} / CASE STUDY</span><h3>{brand}</h3><p>{copy}</p><b>{"href" in item ? "READ THE CASE STUDY" : "FULL CASE STUDY COMING SOON"} <ArrowUpRight /></b></div></>;
          return "href" in item
            ? <a className="case-card case-card-link" href={item.href} key={brand} aria-label={`Read the ${brand} case study`}>{content}</a>
            : <article className="case-card" key={brand}>{content}</article>;
        })}</div>
      </section>

      <section className="process-section section-shell">
        <p className="kicker">OUR APPROACH</p><h2>HOW WE MAKE IT <span>HAPPEN.</span></h2>
        <div className="process-grid">{process.map(([n, title, copy]) => <article key={n}><strong>{n}</strong><div><h3>{title}</h3><p>{copy}</p></div><span className="process-arrow">→</span></article>)}</div>
      </section>

      <section className="systems-section section-shell">
        <div><p className="kicker kicker-orange">POSTING ≠ MARKETING</p><h2>POSTS ALONE<br /><span>DON'T GROW A BUSINESS.</span></h2><p className="lead-copy">Marketing works when content, traffic, conversion and operations are connected.</p></div>
        <div className="system-flow">{["ATTENTION", "CONTENT", "TRAFFIC", "LEADS", "SALES", "RETENTION", "AUTOMATION"].map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong>{i < 6 && <b>↓</b>}</div>)}</div>
      </section>

      <section className="pricing-section section-shell">
        <p className="kicker">SCOPE / STRAIGHT TALK</p><h2>BUILD THE RIGHT SCOPE.<br /><span>THEN SEE THE ESTIMATE.</span></h2><p className="lead-copy">Every business needs a different mix. Choose the services you need, select a retainer length and get a working estimate before we talk.</p>
        <div className="scope-benefits"><div><strong>CHOOSE WHAT FITS</strong><p>Pick the services, platforms and output that make sense for your business—not a forced package.</p></div><div><strong>LONGER RETAINERS SAVE MORE</strong><p>Choose 3, 6 or 12 months in the builder to receive a modest saving on ongoing services.</p></div><div><strong>CLEAR EXCLUSIONS</strong><p>Ad spend, travel, shoots, paid tools and complex production are scoped separately when needed.</p></div></div>
        <aside className="barter-trial"><div><p className="kicker">10-DAY TRIAL / CASH OR BARTER</p><h3>TRY THE WORK.<br /><span>THEN DECIDE.</span></h3><p>A focused ten-day sprint for selected product-led businesses. We can discuss a cash fee or a pre-approved product or service exchange that suits the work.</p></div><div><strong>THE TRIAL INCLUDES</strong><ul><li><Check size={17} />One channel audit + quick-win plan</li><li><Check size={17} />One clearly defined ten-day objective</li><li><Check size={17} />Up to 3 content pieces or equivalent agreed work</li><li><Check size={17} />Publishing / implementation + end-of-trial recap</li></ul><small>Subject to fit and availability. Ad spend, travel, shoots, website builds and paid tools are excluded unless agreed in writing.</small><a href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20I%27d%20like%20to%20discuss%20the%2010-day%20cash%20or%20barter%20trial." target="_blank" rel="noreferrer">PROPOSE A 10-DAY TRIAL <ArrowUpRight size={18} /></a></div></aside>
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
        <form onSubmit={submit} className="contact-form"><div className="form-row"><label>NAME<input name="name" required maxLength={100} /></label><label>COMPANY<input name="company" maxLength={100} /></label></div><div className="form-row"><label>EMAIL<input name="email" type="email" required maxLength={255} /></label><label>PHONE<input name="phone" type="tel" maxLength={20} /></label></div><div className="form-row"><label>WHAT DO YOU NEED?<select name="need" required defaultValue=""><option value="" disabled>Choose a service</option><option>10-day cash / barter trial</option><option>Social media</option><option>Content & reels</option><option>Paid ads & leads</option><option>Website development & management</option><option>n8n automation</option><option>Custom AI tool or app</option><option>AI visibility / GEO</option><option>Full Gazab</option></select></label><label>BUDGET<select name="budget" required defaultValue=""><option value="" disabled>Pick a range</option>{market === "IN" ? <><option>₹10K–₹25K</option><option>₹25K–₹50K / month</option><option>₹50K–₹1L / month</option><option>₹1L+ / month</option><option>Equivalent-value barter</option></> : <><option>$149–$399</option><option>$399–$799 / month</option><option>$799–$1,499 / month</option><option>$1,500+ / month</option><option>Equivalent-value barter</option></>}<option>Let's discuss</option></select></label></div><label>MESSAGE<textarea name="message" required maxLength={1500} rows={4} /></label><button className="form-submit" type="submit">START THE CONVERSATION <ArrowRight /></button></form>
      </section>

      <a className="whatsapp-widget" href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20I%20want%20to%20discuss%20a%20Gazab%20package." target="_blank" rel="noreferrer" aria-label="Chat with Gazab Ki Agency on WhatsApp"><img src="/brand/whatsapp-icon.png" alt="" /><span><small>QUICK QUESTION?</small>CHAT ON WHATSAPP</span></a>

      <footer><div className="footer-main section-shell"><img className="footer-brand-banner" src="/brand/footer-brand-banner.png" alt="Gazab Ki Agency — Marketing, AI and Automation" /><nav>{nav.map(item => <a key={item} href={`#${item}`}>{item.replace("-", " ").toUpperCase()}</a>)}</nav></div><div className="footer-strip"><strong>GAZAB KI AGENCY BY AGHANIMS GROUP</strong><span>© 2026 Aghanims Group. All Rights Reserved.</span><span>Made with too much coffee & too many ideas.</span></div></footer>
    </main>
  );
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
