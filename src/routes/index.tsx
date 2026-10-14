import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  Clapperboard,
  Compass,
  House,
  Instagram,
  Linkedin,
  Megaphone,
  Menu,
  MessagesSquare,
  MousePointerClick,
  PanelsTopLeft,
  Radio,
  Search,
  Sofa,
  Store,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { WhatsAppFloat } from "../components/whatsapp-float";
import homeCss from "../homepage.css?url";
import whatsappFloatCss from "../whatsapp-float.css?url";
import { getPublicTrackingConfig } from "../lib/package-actions";

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
    const tracking = await getPublicTrackingConfig();
    return { tracking };
  },
  component: Home,
});

const navigation = [
  ["Services", "#services"],
  ["Results", "#results"],
  ["Work", "#work"],
  ["Solutions", "#solutions"],
  ["Ways to work", "#ways-to-work"],
  ["About", "#about"],
] as const;

const services = [
  {
    title: "Social media",
    icon: MessagesSquare,
    summary: "A consistent presence that builds familiarity and trust.",
    includes: [
      "Channel strategy and calendar",
      "Posts, reels and captions",
      "Publishing and reporting",
    ],
  },
  {
    title: "Content & creative",
    icon: Clapperboard,
    summary: "Ideas and assets shaped for the people you want to reach.",
    includes: ["Campaign concepts", "Short-form video and design", "Cross-channel repurposing"],
  },
  {
    title: "Paid ads",
    icon: Megaphone,
    summary: "Campaigns built around useful leads and measurable learning.",
    includes: [
      "Meta, Google or LinkedIn setup",
      "Creative and audience tests",
      "Optimisation and reporting",
    ],
  },
  {
    title: "Lead generation",
    icon: MousePointerClick,
    summary: "Turn interest into enquiries your team can follow up.",
    includes: ["Landing pages and offers", "Forms and lead routing", "CRM alerts and reporting"],
  },
  {
    title: "Websites",
    icon: PanelsTopLeft,
    summary: "Fast, clear websites that make the next step obvious.",
    includes: [
      "Strategy and responsive design",
      "Business or commerce builds",
      "Analytics and ongoing care",
    ],
  },
  {
    title: "AI & automation",
    icon: Bot,
    summary: "Remove repetitive work with practical, well-tested systems.",
    includes: ["Workflow discovery", "n8n and AI integrations", "Documentation and handover"],
  },
  {
    title: "Marketplace growth",
    icon: Store,
    summary: "Improve listings and enquiry operations where buyers already are.",
    includes: ["Account and catalogue audit", "Listing optimisation", "Enquiry workflows"],
  },
  {
    title: "Search visibility",
    icon: Search,
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
    icon: Linkedin,
    type: "B2B LinkedIn",
    copy: "A professional audience grew from 1,252 to 4,456 followers (+255.9%).",
    href: "/case-studies/ubiqedge",
  },
  {
    name: "Radioandmusic",
    icon: Radio,
    type: "Social growth",
    copy: "Content and channel growth for an entertainment audience.",
  },
  {
    name: "BarrierBreak",
    icon: CalendarDays,
    type: "Event coverage",
    copy: "Social coverage for Inclusive India: Digital First 2025.",
  },
  {
    name: "Rentmax",
    icon: House,
    type: "Lead generation",
    copy: "A clearer website journey supported by content and Meta campaigns.",
  },
  {
    name: "Motohom",
    icon: Instagram,
    type: "Content system",
    copy: "Content production, community care and Instagram growth.",
  },
  {
    name: "Furndepot",
    icon: Sofa,
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
  const { tracking } = Route.useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      "Gazab project brief — " + String(data.get("company") || data.get("name")),
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
        "\nGoal: " +
        data.get("goal") +
        "\nTimeline: " +
        data.get("timeline") +
        "\nWebsite or social link: " +
        data.get("link") +
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
            Request a proposal <ArrowUpRight size={16} />
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
        <a href="#contact">
          Share your brief <ArrowUpRight size={17} />
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
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <details className="g-service-card" key={service.title}>
                  <summary>
                    <span className="g-service-top">
                      <span className="g-service-icon" aria-hidden="true">
                        <ServiceIcon size={26} strokeWidth={1.8} />
                      </span>
                      <span className="g-card-index">{String(index + 1).padStart(2, "0")}</span>
                    </span>
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
                    <a href="#contact" onClick={() => setSelectedNeed(service.title)}>
                      Discuss this service <ArrowRight size={16} />
                    </a>
                  </div>
                </details>
              );
            })}
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
              const ProjectIcon = project.icon;
              const card = (
                <>
                  <div className="g-work-top">
                    <span className="g-card-index">
                      {String(index + 1).padStart(2, "0")} / {project.type}
                    </span>
                    <span className="g-work-icon" aria-hidden="true">
                      <ProjectIcon size={23} strokeWidth={1.8} />
                    </span>
                  </div>
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
              <Workflow
                className="g-solution-icon"
                size={33}
                strokeWidth={1.8}
                aria-hidden="true"
              />
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
              <PanelsTopLeft
                className="g-solution-icon"
                size={33}
                strokeWidth={1.8}
                aria-hidden="true"
              />
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
              <div className="g-process-visual" aria-hidden="true">
                <Compass size={27} strokeWidth={1.8} />
              </div>
              <span>01 / DISCOVER</span>
              <h3>Understand</h3>
              <p>We learn the business, audience and bottleneck before recommending a solution.</p>
            </article>
            <article>
              <div className="g-process-visual" aria-hidden="true">
                <Workflow size={27} strokeWidth={1.8} />
              </div>
              <span>02 / CREATE</span>
              <h3>Build</h3>
              <p>We create the content, campaigns, website or workflow with agreed deliverables.</p>
            </article>
            <article>
              <div className="g-process-visual" aria-hidden="true">
                <ChartNoAxesCombined size={27} strokeWidth={1.8} />
              </div>
              <span>03 / OPTIMISE</span>
              <h3>Improve</h3>
              <p>We review the numbers, share what we learned and make the next round stronger.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="g-section g-engagement" id="ways-to-work">
        <div className="g-wrap">
          <SectionHeading
            eyebrow="06 / Ways to work"
            title="Ways to work"
            copy="Start with the kind of help you need. We’ll shape the deliverables, team and timeline around your goal."
          />
          <div className="g-engagement-grid">
            <EngagementCard
              title="Ongoing growth"
              icon={ChartNoAxesCombined}
              description="A consistent partner for content, channels and lead generation."
              items={[
                "Channel plan and content priorities",
                "Creative, publishing and campaign support",
                "Lead journey and conversion improvements",
                "Reporting and regular reviews",
              ]}
              cta="Discuss ongoing work"
              onSelect={() => setSelectedNeed("Ongoing growth")}
              featured
            />
            <EngagementCard
              title="Campaign launch"
              icon={Megaphone}
              description="A focused push for a launch, event or measurable growth objective."
              items={[
                "Audience and message planning",
                "Creative assets and channel activation",
                "Paid or organic campaign management",
                "Clear measures and a closing review",
              ]}
              cta="Plan a campaign"
              onSelect={() => setSelectedNeed("Campaign launch")}
            />
            <EngagementCard
              title="Web & automation"
              icon={Workflow}
              description="A stronger digital experience and less manual work behind it."
              items={[
                "Website or landing-page planning",
                "AI and workflow mapping",
                "Build, testing and handover",
                "A practical support plan",
              ]}
              cta="Explore a build"
              onSelect={() => setSelectedNeed("Web & automation")}
            />
          </div>
          <div className="g-proposal-promise" aria-label="What happens after you get in touch">
            <span>01 / Tell us your goal</span>
            <ArrowRight size={17} aria-hidden="true" />
            <span>02 / We map the work</span>
            <ArrowRight size={17} aria-hidden="true" />
            <span>03 / You get a clear proposal</span>
          </div>
          <div className="g-trial">
            <div>
              <span className="g-eyebrow">10-day trial / selected brands</span>
              <h3>Try working together.</h3>
              <p>
                A focused ten-day sprint for selected product-led businesses. Barter collaborations
                may be possible when the product and project are a good fit.
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
                We agree the objective, deliverables and responsibilities in writing before work
                begins.
              </small>
              <a href="#contact" onClick={() => setSelectedNeed("10-day trial")}>
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
            <h2>Tell us your brief</h2>
            <p>
              Tell us what you want to achieve. We’ll recommend a sensible approach and send a
              proposal shaped around your project.
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
            <h3>Start a project conversation</h3>
            <p>Share the essentials; we’ll take it from there.</p>
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
                Where do you need help?
                <select
                  name="need"
                  required
                  value={selectedNeed}
                  onChange={(event) => setSelectedNeed(event.target.value)}
                >
                  <option value="" disabled>
                    Select an area
                  </option>
                  <option>Ongoing growth</option>
                  <option>Campaign launch</option>
                  <option>Web &amp; automation</option>
                  <option>10-day trial</option>
                  <option>Social media</option>
                  <option>Content &amp; creative</option>
                  <option>Paid ads</option>
                  <option>Lead generation</option>
                  <option>Websites</option>
                  <option>AI &amp; automation</option>
                  <option>Marketplace growth</option>
                  <option>Search visibility</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                Main goal
                <select name="goal" required defaultValue="">
                  <option value="" disabled>
                    Select a goal
                  </option>
                  <option>Get more qualified enquiries</option>
                  <option>Grow brand visibility</option>
                  <option>Launch a campaign or product</option>
                  <option>Improve a website or conversion path</option>
                  <option>Save time through automation</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
            <div className="g-form-row">
              <label>
                When would you like to start?
                <select name="timeline" required defaultValue="">
                  <option value="" disabled>
                    Select a timeframe
                  </option>
                  <option>As soon as possible</option>
                  <option>Within a month</option>
                  <option>In the next 1–3 months</option>
                  <option>Just exploring</option>
                </select>
              </label>
              <label>
                Website or social link (optional)
                <input name="link" type="url" placeholder="https://" maxLength={300} />
              </label>
            </div>
            <label>
              What are you trying to achieve?
              <textarea name="message" required maxLength={1500} rows={4} />
            </label>
            <button className="g-button g-button-primary" type="submit">
              Email your brief <ArrowRight size={18} />
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
            <a href="#ways-to-work">Ways to work</a>
          </nav>
          <small>© 2026 Aghanims Group. All rights reserved.</small>
        </div>
      </footer>
      <WhatsAppFloat />
    </main>
  );
}

function EngagementCard({
  title,
  icon: Icon,
  description,
  items,
  cta,
  onSelect,
  featured = false,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
  items: string[];
  cta: string;
  onSelect: () => void;
  featured?: boolean;
}) {
  return (
    <article className={"g-engagement-card" + (featured ? " g-engagement-featured" : "")}>
      {featured && <span className="g-engagement-badge">Ongoing collaboration</span>}
      <div className="g-engagement-art" aria-hidden="true">
        <span className="g-engagement-orbit" />
        <span className="g-engagement-icon">
          <Icon size={31} strokeWidth={1.8} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </ul>
      <a href="#contact" onClick={onSelect}>
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
