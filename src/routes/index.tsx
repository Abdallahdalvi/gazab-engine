import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { WhatsAppFloat } from "../components/whatsapp-float";
import homeCss from "../homepage.css?url";
import whatsappFloatCss from "../whatsapp-float.css?url";
import { getPublicPricing, getPublicTrackingConfig } from "../lib/package-actions";
import {
  formatMoney,
  INTERNATIONAL_SERVICE_PRICING,
  type PricingMarket,
} from "../lib/package-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gazab Ki Agency — Clearer growth, less noise" },
      {
        name: "description",
        content:
          "Thoughtful marketing, content, websites and automation for businesses ready to grow with clarity.",
      },
      { property: "og:title", content: "Gazab Ki Agency — Clearer growth, less noise" },
      {
        property: "og:description",
        content: "A connected approach to attention, enquiries and better business systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "stylesheet", href: homeCss },
      { rel: "stylesheet", href: whatsappFloatCss },
    ],
  }),
  loader: async () => {
    const [pricing, tracking] = await Promise.all([getPublicPricing(), getPublicTrackingConfig()]);
    return { pricing, tracking };
  },
  component: Home,
});

const navigation = [
  ["Services", "#services"],
  ["Results", "#results"],
  ["Work", "#work"],
  ["Solutions", "#solutions"],
  ["Pricing", "#pricing"],
  ["About", "#about"],
] as const;

const countryOptions = [
  ["IN", "India — INR (₹)"],
  ["US", "United States — USD ($)"],
  ["GB", "United Kingdom — USD ($)"],
  ["AE", "United Arab Emirates — USD ($)"],
  ["QA", "Qatar — USD ($)"],
  ["SA", "Saudi Arabia — USD ($)"],
  ["CA", "Canada — USD ($)"],
  ["AU", "Australia — USD ($)"],
  ["SG", "Singapore — USD ($)"],
  ["DE", "Germany — USD ($)"],
  ["FR", "France — USD ($)"],
  ["NL", "Netherlands — USD ($)"],
  ["NZ", "New Zealand — USD ($)"],
  ["ZA", "South Africa — USD ($)"],
  ["OTHER", "Other country — USD ($)"],
] as const;

const services = [
  {
    title: "Social media",
    summary: "A consistent presence that builds familiarity and trust.",
    includes: [
      "Channel strategy and calendar",
      "Posts, reels and captions",
      "Publishing and reporting",
    ],
  },
  {
    title: "Content & creative",
    summary: "Ideas and assets shaped for the people you want to reach.",
    includes: ["Campaign concepts", "Short-form video and design", "Cross-channel repurposing"],
  },
  {
    title: "Paid ads",
    summary: "Campaigns built around useful leads and measurable learning.",
    includes: [
      "Meta, Google or LinkedIn setup",
      "Creative and audience tests",
      "Optimisation and reporting",
    ],
  },
  {
    title: "Lead generation",
    summary: "Turn interest into enquiries your team can follow up.",
    includes: ["Landing pages and offers", "Forms and lead routing", "CRM alerts and reporting"],
  },
  {
    title: "Websites",
    summary: "Fast, clear websites that make the next step obvious.",
    includes: [
      "Strategy and responsive design",
      "Business or commerce builds",
      "Analytics and ongoing care",
    ],
  },
  {
    title: "AI & automation",
    summary: "Remove repetitive work with practical, well-tested systems.",
    includes: ["Workflow discovery", "n8n and AI integrations", "Documentation and handover"],
  },
  {
    title: "Marketplace growth",
    summary: "Improve listings and enquiry operations where buyers already are.",
    includes: ["Account and catalogue audit", "Listing optimisation", "Enquiry workflows"],
  },
  {
    title: "Search visibility",
    summary: "Help customers find and understand your business.",
    includes: ["Google Business Profile", "SEO, AEO and GEO", "Reviews and visibility reporting"],
  },
];

const metrics = [
  { value: "100M+", label: "Organic reach", detail: "Across managed client channels" },
  { value: "330K+", label: "Followers grown", detail: "Combined audience growth" },
  { value: "16.5M+", label: "Interactions", detail: "Likes, comments, shares and saves" },
  { value: "7.8×", label: "Average ads ROAS", detail: "On tracked campaigns" },
];

const proof = [
  {
    client: "Radioandmusic",
    result: "Reach grew from 1.3M to 73.1M",
    image: "/results/radioandmusic-instagram.png",
  },
  {
    client: "Gerryson Mehta",
    result: "49,733 impressions and 3,681 followers",
    image: "/results/gerryson-mehta-linkedin.png",
  },
  {
    client: "Data analytics company",
    result: "96,966 LinkedIn impressions",
    image: "/results/data-analytics-hr-linkedin.png",
  },
  {
    client: "WhatsApp community",
    result: "Built from zero to 101 followers",
    image: "/results/data-analytics-whatsapp.png",
  },
];

const projects = [
  {
    name: "Ubiqedge",
    type: "B2B LinkedIn",
    copy: "A professional audience grew from 1,252 to 4,456 followers (+255.9%).",
    href: "/case-studies/ubiqedge",
  },
  {
    name: "Radioandmusic",
    type: "Social growth",
    copy: "Content and channel growth for an entertainment audience.",
  },
  {
    name: "BarrierBreak",
    type: "Event coverage",
    copy: "Social coverage for Inclusive India: Digital First 2025.",
  },
  {
    name: "Rentmax",
    type: "Lead generation",
    copy: "A clearer website journey supported by content and Meta campaigns.",
  },
  {
    name: "Motohom",
    type: "Content system",
    copy: "Content production, community care and Instagram growth.",
  },
  {
    name: "Furndepot",
    type: "Organic growth",
    copy: "Creative campaigns guided by audience and performance data.",
  },
] as const;

const products = [
  {
    name: "Links DC",
    kind: "Link-in-bio",
    href: "https://links.dalvi.cloud/",
    copy: "Brand-led link pages with analytics and custom domains.",
  },
  {
    name: "YT Scheduler",
    kind: "Content operations",
    href: "https://ytscheduler.dalvi.cloud/",
    copy: "A workspace for planning, publishing and tracking content.",
  },
  {
    name: "DalviCard CRM",
    kind: "AI tool",
    href: "https://cards.dalvi.cloud/",
    copy: "Turn business cards into organised CRM contacts.",
  },
  {
    name: "MoneyFive",
    kind: "Android app",
    href: "https://play.google.com/store/apps/details?id=com.moneyfive.moneyfive&hl=en_IN",
    copy: "A private AI money manager for daily finances.",
  },
  {
    name: "IndiaMART Lead Extractor",
    kind: "Chrome extension",
    href: "https://chromewebstore.google.com/detail/indiamart-lead-extractor/oohpjlfnfogjchmdeemhipjjdjbgegic",
    copy: "Move buyer leads into Google Sheets without duplicates.",
  },
  {
    name: "IM Applier",
    kind: "Marketplace automation",
    href: "https://github.com/Abdallahdalvi/IM-Applier-V1",
    copy: "Automate high-volume product listing work.",
  },
];

const websites = [
  { name: "Universal Trader India", href: "https://universaltraderindia.com/" },
  { name: "Rentmax", href: "https://rentmax.in/" },
  { name: "Gerryson Mehta", href: "https://gerrysonmehta.com/" },
  { name: "Red Olive Vacations", href: "https://www.redolivevnl.com/" },
  { name: "Aghanims Phones", href: "https://aghanimsphones.in/" },
];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="g-section-head">
      <div>
        <span className="g-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Home() {
  const { pricing, tracking } = Route.useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [market, setMarket] = useState<PricingMarket>("IN");
  const activePricing = market === "INTL" ? INTERNATIONAL_SERVICE_PRICING : pricing;
  const currency = market === "INTL" ? "USD" : "INR";

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localeRegion = navigator.languages
      .map((language) => language.match(/[-_]([A-Z]{2})$/i)?.[1]?.toUpperCase())
      .find(Boolean);
    const timezoneCountry =
      timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta"
        ? "IN"
        : timezone === "Asia/Qatar"
          ? "QA"
          : timezone === "Asia/Dubai"
            ? "AE"
            : undefined;
    const detected = timezoneCountry || localeRegion || "OTHER";
    const supported = countryOptions.some(([code]) => code === detected) ? detected : "OTHER";
    setSelectedCountry(supported);
    setMarket(supported === "IN" ? "IN" : "INTL");
  }, []);

  const changeCountry = (country: string) => {
    setSelectedCountry(country);
    setMarket(country === "IN" ? "IN" : "INTL");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      "Gazab project enquiry — " + String(data.get("company") || data.get("name")),
    );
    const body = encodeURIComponent(
      "Name: " +
        data.get("name") +
        "\nCompany: " +
        data.get("company") +
        "\nEmail: " +
        data.get("email") +
        "\nPhone: " +
        data.get("phone") +
        "\nNeed: " +
        data.get("need") +
        "\nBudget: " +
        data.get("budget") +
        "\n\n" +
        data.get("message"),
    );
    window.location.href = "mailto:dalviabdallah76@gmail.com?subject=" + subject + "&body=" + body;
  };

  return (
    <main id="home-v2">
      <TrackingPixels config={tracking} />
      <header className="g-nav">
        <div className="g-wrap g-nav-inner">
          <a className="g-brand" href="#top" aria-label="Gazab Ki Agency home">
            <img src="/brand/brand-icon.jpeg" alt="" />
            <span>Gazab Ki Agency</span>
          </a>
          <nav className="g-desktop-links" aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a className="g-nav-cta" href="#contact">
            Start a project <ArrowUpRight size={16} />
          </a>
          <button
            className="g-menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="g-mobile-links" aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Start a project
            </a>
          </nav>
        )}
      </header>

      <section className="g-hero" id="top">
        <div className="g-wrap g-hero-grid">
          <div>
            <span className="g-eyebrow">Marketing · AI · Automation</span>
            <h1>Make growth simple.</h1>
            <p className="g-hero-lead">
              Clear strategy. Strong creative. Useful technology. We connect the pieces that help
              your business get noticed, win enquiries and work smarter.
            </p>
            <div className="g-actions">
              <a className="g-button g-button-primary" href="#services">
                Explore services <ArrowRight size={18} />
              </a>
              <a className="g-button g-button-secondary" href="#work">
                See our work <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="g-hero-footnote">
              One service or the whole growth system. Built around what you actually need.
            </p>
          </div>
          <div className="g-hero-panel">
            <img
              className="g-hero-artwork"
              src="/brand/hero-brand.jpeg"
              alt="Gazab Ki — Marketing, AI and Automation"
            />
          </div>
        </div>
      </section>

      <div className="g-quick-nav g-wrap" aria-label="Quick links">
        <a href="#services">
          Find a service <ArrowUpRight size={17} />
        </a>
        <a href="#results">
          Check the results <ArrowUpRight size={17} />
        </a>
        <a href="#pricing">
          See starting prices <ArrowUpRight size={17} />
        </a>
      </div>

      <section className="g-section g-services" id="services">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="01 / Services"
            title="What we do"
            copy="Choose a focused service or connect several. We’ll shape the work around your goals, not a generic checklist."
          />
          <div className="g-service-grid">
            {services.map((service, index) => (
              <details className="g-service-card" key={service.title}>
                <summary>
                  <span className="g-card-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span className="g-card-more">
                    What’s included <span aria-hidden="true">+</span>
                  </span>
                </summary>
                <div className="g-service-detail">
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>
                        <Check size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact">
                    Discuss this service <ArrowRight size={16} />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section g-results" id="results">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="02 / Results"
            title="Proof that counts"
            copy="Real channel work, measured over time. These figures come from client projects and Abdallah’s professional track record."
          />
          <div className="g-metric-grid">
            {metrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <small>{metric.detail}</small>
              </article>
            ))}
          </div>
          <div className="g-proof-head">
            <h3>Open the evidence</h3>
            <p>See the platform screenshots behind a selection of results.</p>
          </div>
          <div className="g-proof-grid">
            {proof.map((item) => (
              <a href={item.image} target="_blank" rel="noreferrer" key={item.client}>
                <img
                  src={item.image}
                  alt={item.client + " insights showing " + item.result}
                  loading="lazy"
                />
                <span>
                  <strong>{item.client}</strong>
                  <small>{item.result}</small>
                </span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section g-work" id="work">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="03 / Work"
            title="Selected work"
            copy="A few of the brands and challenges we’ve worked on. Open Ubiqedge for the full story and source screenshots."
          />
          <div className="g-work-grid">
            {projects.map((project, index) => {
              const card = (
                <>
                  <span className="g-card-index">
                    {String(index + 1).padStart(2, "0")} / {project.type}
                  </span>
                  <h3>{project.name}</h3>
                  <p>{project.copy}</p>
                  <span className="g-work-action">
                    {"href" in project ? "Read the case study" : "Project snapshot"}{" "}
                    {"href" in project && <ArrowUpRight size={17} />}
                  </span>
                </>
              );
              return "href" in project ? (
                <a className="g-work-card g-work-featured" href={project.href} key={project.name}>
                  {card}
                </a>
              ) : (
                <article className="g-work-card" key={project.name}>
                  {card}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="g-section g-solutions" id="solutions">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="04 / Solutions"
            title="Beyond campaigns"
            copy="We also build the tools and web experiences that help teams move faster. Explore live examples below."
          />
          <div className="g-solution-group">
            <div className="g-solution-intro">
              <span>01</span>
              <h3>Products & tools</h3>
              <p>Useful software we’ve designed and shipped.</p>
            </div>
            <div className="g-product-list">
              {products.map((product) => (
                <a href={product.href} target="_blank" rel="noreferrer" key={product.name}>
                  <span>
                    <small>{product.kind}</small>
                    <strong>{product.name}</strong>
                    <em>{product.copy}</em>
                  </span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="g-solution-bottom">
            <div>
              <span>02 / AUTOMATION</span>
              <h3>Less busywork.</h3>
              <p>
                Lead routing, reporting, content operations and AI-assisted workflows built around
                your team.
              </p>
              <a href="#contact">
                Discuss automation <ArrowRight size={17} />
              </a>
            </div>
            <div>
              <span>03 / WEB DEVELOPMENT</span>
              <h3>Better journeys.</h3>
              <p>
                Business websites, stores and lead-focused pages—designed, launched and improved.
              </p>
              <div className="g-site-links">
                {websites.map((site) => (
                  <a href={site.href} target="_blank" rel="noreferrer" key={site.name}>
                    {site.name} <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="g-section g-process">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="05 / Approach"
            title="How we work"
            copy="No mystery process. A clear brief, useful execution and regular improvement."
          />
          <div className="g-process-grid">
            <article>
              <span>01</span>
              <h3>Understand</h3>
              <p>We learn the business, audience and bottleneck before recommending a solution.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Build</h3>
              <p>We create the content, campaigns, website or workflow with agreed deliverables.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Improve</h3>
              <p>We review the numbers, share what we learned and make the next round stronger.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="g-section g-pricing" id="pricing">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="06 / Pricing"
            title="Simple pricing"
            copy="Starting prices, visible before a call. Every project gets a written scope and a clear final quote."
          />
          <label className="g-country-picker">
            View prices for
            <select
              value={selectedCountry}
              onChange={(event) => changeCountry(event.target.value)}
              aria-label="Choose your country for pricing"
            >
              {countryOptions.map(([code, label]) => (
                <option value={code} key={code}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="g-pricing-grid">
            <PriceCard
              title="Gazab Starter"
              price={formatMoney(activePricing.starterMonthly, currency)}
              suffix="/ month"
              description="A dependable social presence for a growing business."
              items={[
                "2 social platforms managed",
                "8 posts or reels each month",
                "Calendar, captions and publishing",
                "Google Business Profile setup",
                "Monthly report and strategy call",
              ]}
              cta="Ask about Starter"
            />
            <PriceCard
              title="Full Gazab"
              price={formatMoney(activePricing.fullMonthly, currency)}
              suffix="/ month"
              description="Content, paid growth and smarter operations together."
              items={[
                "Everything in Starter",
                "4 platforms and 12 content pieces",
                "Ads management on 1 platform",
                "SEO and AI visibility work",
                "2 basic automations and advanced reporting",
              ]}
              cta="Ask about Full Gazab"
              featured
            />
            <PriceCard
              title="Custom scope"
              price={formatMoney(activePricing.websiteSingleSetup, currency)}
              label="Single-page websites from"
              description="A precise quote for your website, campaign or automation brief."
              items={[
                "Websites and landing pages",
                "AI and n8n automations",
                "Content or campaign sprints",
                "Marketplace and lead operations",
                "Written deliverables before we begin",
              ]}
              cta="Discuss your scope"
            />
          </div>
          <div className="g-pricing-notes">
            <p>
              <strong>Flexible terms.</strong> Choose 1, 3, 6 or 12 months. Longer ongoing retainers
              can cost less.
            </p>
            <p>
              <strong>Clear exclusions.</strong> Ad spend, travel, shoots and paid tools are quoted
              separately when needed.
            </p>
          </div>
          <div className="g-trial">
            <div>
              <span className="g-eyebrow">10-day trial / cash or barter</span>
              <h3>Try working together.</h3>
              <p>
                A focused ten-day sprint for selected product-led businesses. We can agree a cash
                fee or suitable product/service exchange before work begins.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Check size={17} />
                  One channel audit and quick-win plan
                </li>
                <li>
                  <Check size={17} />
                  One clearly defined objective
                </li>
                <li>
                  <Check size={17} />
                  Up to 3 content pieces or equivalent work
                </li>
                <li>
                  <Check size={17} />
                  Implementation and a short recap
                </li>
              </ul>
              <small>
                Subject to fit and availability. Ad spend, shoots, travel and paid tools are
                separate unless agreed in writing.
              </small>
              <a
                href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20I%27d%20like%20to%20discuss%20the%2010-day%20cash%20or%20barter%20trial."
                target="_blank"
                rel="noreferrer"
              >
                Discuss a trial <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="g-section g-about" id="about">
        <div className="g-wrap g-about-grid">
          <div className="g-about-mark">
            <img
              src="/brand/hero-brand.jpeg"
              alt="Gazab Ki — Marketing, AI and Automation"
              loading="lazy"
            />
          </div>
          <div>
            <span className="g-eyebrow">07 / About</span>
            <h2>Meet Abdallah</h2>
            <p>
              Abdallah Dalvi works across marketing, content, websites, AI and automation. His
              approach brings creative thinking and practical systems into the same conversation.
            </p>
            <p>
              Gazab Ki Agency is built for teams that want an active partner: someone who can make
              the work, measure it and improve it.
            </p>
            <a className="g-text-link" href="#contact">
              Tell us what you’re building <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="g-section g-contact" id="contact">
        <div className="g-wrap g-contact-grid">
          <div>
            <span className="g-eyebrow">08 / Contact</span>
            <h2>Let’s talk</h2>
            <p>
              Tell us what you need. We’ll help you find a sensible next step and an honest starting
              budget.
            </p>
            <div className="g-contact-links">
              <a href="mailto:dalviabdallah76@gmail.com">
                dalviabdallah76@gmail.com <ArrowUpRight size={17} />
              </a>
              <a href="tel:+917400239134">
                +91 74002 39134 <ArrowUpRight size={17} />
              </a>
              <a href="https://wa.me/917400239134" target="_blank" rel="noreferrer">
                Chat on WhatsApp <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <form className="g-contact-form" onSubmit={submit}>
            <div className="g-form-row">
              <label>
                Name
                <input name="name" required maxLength={100} />
              </label>
              <label>
                Company
                <input name="company" maxLength={100} />
              </label>
            </div>
            <div className="g-form-row">
              <label>
                Email
                <input name="email" type="email" required maxLength={255} />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" maxLength={20} />
              </label>
            </div>
            <div className="g-form-row">
              <label>
                What do you need?
                <select name="need" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Gazab Starter</option>
                  <option>Full Gazab</option>
                  <option>Custom scope</option>
                  <option>10-day cash / barter trial</option>
                  <option>Social media and content</option>
                  <option>Paid ads and leads</option>
                  <option>Website development</option>
                  <option>AI and automation</option>
                  <option>Search visibility</option>
                </select>
              </label>
              <label>
                Budget
                <select name="budget" required defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {market === "IN" ? (
                    <>
                      <option>Under ₹10K / specific project</option>
                      <option>₹10K–₹25K</option>
                      <option>₹25K–₹50K / month</option>
                      <option>₹50K–₹1L / month</option>
                      <option>₹1L+ / month</option>
                      <option>Equivalent-value barter</option>
                    </>
                  ) : (
                    <>
                      <option>Under $149 / specific project</option>
                      <option>$149–$399</option>
                      <option>$399–$799 / month</option>
                      <option>$799–$1,499 / month</option>
                      <option>$1,500+ / month</option>
                      <option>Equivalent-value barter</option>
                    </>
                  )}
                  <option>Let’s discuss</option>
                </select>
              </label>
            </div>
            <label>
              What are you trying to achieve?
              <textarea name="message" required maxLength={1500} rows={4} />
            </label>
            <button className="g-button g-button-primary" type="submit">
              Start the conversation <ArrowRight size={18} />
            </button>
            <small>
              This opens your email app with the details you entered. Nothing is submitted in the
              background.
            </small>
          </form>
        </div>
      </section>

      <footer className="g-footer">
        <div className="g-wrap g-footer-inner">
          <div>
            <strong>Gazab Ki Agency</strong>
            <span>Clearer growth. Less noise.</span>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#top">Back to top ↑</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <small>© 2026 Aghanims Group. All rights reserved.</small>
        </div>
      </footer>
      <WhatsAppFloat />
    </main>
  );
}

function PriceCard({
  title,
  price,
  suffix,
  label = "Starting at",
  description,
  items,
  cta,
  featured = false,
}: {
  title: string;
  price: string;
  suffix?: string;
  label?: string;
  description: string;
  items: string[];
  cta: string;
  featured?: boolean;
}) {
  return (
    <article className={"g-price-card" + (featured ? " g-price-featured" : "")}>
      {featured && <span className="g-price-badge">Most popular</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="g-price-label">{label}</span>
      <strong>
        {price}
        <small>{suffix}</small>
      </strong>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </ul>
      <a href="#contact">
        {cta} <ArrowRight size={17} />
      </a>
    </article>
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
    if (config.clarityProjectId)
      appendInline(
        "gazab-clarity",
        '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",' +
          JSON.stringify(config.clarityProjectId) +
          ");",
      );
    if (config.gaMeasurementId && !document.getElementById("gazab-ga-loader")) {
      const loader = document.createElement("script");
      loader.id = "gazab-ga-loader";
      loader.async = true;
      loader.src =
        "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.gaMeasurementId);
      document.head.appendChild(loader);
      appendInline(
        "gazab-ga",
        'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",' +
          JSON.stringify(config.gaMeasurementId) +
          ");",
      );
    }
    if (config.metaPixelId)
      appendInline(
        "gazab-meta-pixel",
        '!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init",' +
          JSON.stringify(config.metaPixelId) +
          ');fbq("track","PageView");',
      );
  }, [config]);
  return null;
}
