import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/case-studies/ubiqedge")({
  head: () => ({
    meta: [
      { title: "Ubiqedge LinkedIn Growth Case Study | Gazab Ki Agency" },
      {
        name: "description",
        content:
          "How Gazab Ki Agency helped AIoT company Ubiqedge grow its LinkedIn audience by 255.9%, generate 83,985 impressions and build an owned newsletter audience.",
      },
    ],
  }),
  component: UbiqedgeCaseStudy,
});

const stats = [
  ["1,252 → 4,456", "FOLLOWERS", "+3,204 / +255.9%"],
  ["99.8%", "NEW FOLLOWERS ORGANIC", "3,199 of 3,204"],
  ["83,985", "CONTENT IMPRESSIONS", "1,358 reactions"],
  ["12,940", "PAGE VIEWS", "4,379 unique visitors"],
  ["388 → 1,809", "NEWSLETTER SUBSCRIBERS", "+1,421 / +366.2%"],
  ["2,381", "ARTICLE VIEWS", "9,564 impressions"],
] as const;

const story = [
  {
    number: "01",
    eyebrow: "THE CHALLENGE",
    title: "BUILD AUTHORITY, NOT EMPTY REACH.",
    copy: "Ubiqedge needed a consistent B2B presence that could make a specialist technology brand easier to discover and worth following. The audience had to be relevant: engineers, business-development teams, decision-makers and future hires—not vanity traffic.",
  },
  {
    number: "02",
    eyebrow: "THE APPROACH",
    title: "TURN EXPERTISE INTO A CONTENT ENGINE.",
    copy: "We built the LinkedIn system around company news, hiring, engineering, infrastructure and sector insight. A reliable publishing rhythm, an owned newsletter and regular analytics reviews helped each useful idea travel further and informed what came next.",
  },
  {
    number: "03",
    eyebrow: "THE OUTCOME",
    title: "AN ORGANIC AUDIENCE THAT KEPT COMPOUNDING.",
    copy: "The page added 3,204 followers—3,199 organically. Content generated 83,985 impressions, the page attracted 12,940 visits and the newsletter added 1,421 subscribers, creating a stronger audience the brand could reach repeatedly.",
  },
] as const;

const proofs = [
  {
    label: "CONTENT PERFORMANCE",
    result: "83,985 impressions · 1,358 reactions · zero sponsored impressions",
    image: "/results/ubiqedge-linkedin-content-2026-09.jpg",
  },
  {
    label: "PAGE VISITORS",
    result: "12,940 views · 4,379 unique visitors",
    image: "/results/ubiqedge-linkedin-visitors-2026-09.jpg",
  },
  {
    label: "FOLLOWER GROWTH",
    result: "4,456 total · 3,204 added · 3,199 organic",
    image: "/results/ubiqedge-linkedin-followers-2026-09.jpg",
  },
  {
    label: "COMPETITOR BENCHMARKING",
    result: "11.9% engagement rate · 33.7% above competitors",
    image: "/results/ubiqedge-linkedin-benchmarks-2026-09.jpg",
    wide: true,
  },
  {
    label: "NEWSLETTER TOTALS",
    result: "1,809 subscribers · 1,421 added · 2,381 article views",
    image: "/results/ubiqedge-linkedin-newsletter-totals-2026-09.jpg",
  },
  {
    label: "NEWSLETTER TREND",
    result: "9,564 impressions · 160 engagements · 2,381 article views",
    image: "/results/ubiqedge-linkedin-newsletter-trend-2026-09.jpg",
  },
] as const;

function UbiqedgeCaseStudy() {
  return (
    <main className="case-study-page">
      <header className="case-study-nav">
        <a className="case-study-brand" href="/" aria-label="Gazab Ki Agency home">
          <img src="/brand/brand-icon.jpeg" alt="" />
          <span>GAZAB KI AGENCY</span>
        </a>
        <nav>
          <a href="/#work">
            <ArrowLeft size={16} /> BACK TO WORK
          </a>
          <a className="case-study-nav-cta" href="/#contact">
            START A PROJECT <ArrowRight size={17} />
          </a>
        </nav>
      </header>

      <article className="case-study-article">
        <section className="case-study-hero">
          <div>
            <p className="case-study-kicker">COMPANY CASE STUDY / 01 · LINKEDIN</p>
            <h1>
              UBIQEDGE.
              <br />
              <span>LINKEDIN THAT COMPOUNDS.</span>
            </h1>
          </div>
          <div className="case-study-summary">
            <p>
              Ubiqedge is a Mumbai-based AIoT company building connected hardware and cloud software
              for smarter, more sustainable infrastructure.
            </p>
            <a href="https://ubiqedge.com" target="_blank" rel="noreferrer">
              VISIT UBIQEDGE.COM <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="case-study-company">
          <div>
            <p className="case-study-kicker">ABOUT THE COMPANY</p>
            <h2>AIoT FOR SMARTER INFRASTRUCTURE.</h2>
          </div>
          <div>
            <p>
              Ubiqedge Technology Pvt. Ltd. helps organisations monitor, control and optimise
              distributed infrastructure in real time. Its KLEON industrial IoT hardware gathers
              data from field assets, while the SAMASTH cloud platform turns that data into live
              dashboards, alerts, reports and operational insight.
            </p>
            <p>
              The company works across smart water management, solar monitoring, concrete
              operations, air-quality monitoring and other industrial use cases. LinkedIn needed to
              translate that technical depth into a clear, credible story for buyers, partners,
              engineers and future hires.
            </p>
            <div className="case-study-company-tags">
              <span>INDUSTRIAL IoT</span>
              <span>AI + ANALYTICS</span>
              <span>SMART WATER</span>
              <span>SOLAR MONITORING</span>
              <span>ENVIRONMENTAL MONITORING</span>
            </div>
          </div>
        </section>

        <section className="case-study-metrics" aria-label="Ubiqedge LinkedIn results">
          {stats.map(([value, label, detail]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{detail}</small>
            </div>
          ))}
        </section>

        <section className="case-study-story">
          <div className="case-study-section-intro">
            <p>THE STORY</p>
            <h2>
              A CLEAR STRATEGY.
              <br />
              <span>CONSISTENT EXECUTION.</span>
            </h2>
          </div>
          <div className="case-study-story-list">
            {story.map(({ number, eyebrow, title, copy }) => (
              <section key={number}>
                <span>{number}</span>
                <div>
                  <small>{eyebrow}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="case-study-evidence">
          <div className="case-study-section-intro">
            <p>THE RECEIPTS</p>
            <h2>
              SOURCE DATA,
              <br />
              <span>NOT VANITY CLAIMS.</span>
            </h2>
          </div>
          <div className="case-study-proof-grid">
            {proofs.map(({ label, result, image, ...proof }) => (
              <a
                className={"wide" in proof && proof.wide ? "case-study-proof-wide" : undefined}
                href={image}
                target="_blank"
                rel="noreferrer"
                key={label}
              >
                <div>
                  <img
                    src={image}
                    alt={`Ubiqedge LinkedIn analytics — ${label.toLowerCase()}`}
                    loading="lazy"
                  />
                </div>
                <span>{label}</span>
                <strong>{result}</strong>
                <small>
                  OPEN FULL SCREENSHOT <ArrowUpRight size={14} />
                </small>
              </a>
            ))}
          </div>
          <p className="case-study-source">
            SOURCE: LINKEDIN ANALYTICS · 15 DEC 2025–17 SEP 2026, DEPENDING ON REPORT. STARTING
            VALUES ARE CALCULATED AS CURRENT TOTAL MINUS REPORTED NEW FOLLOWERS. THIS IS THE
            LINKEDIN CHAPTER; OTHER CHANNELS WILL BE ADDED WHEN THEIR DATA IS SUPPLIED.
          </p>
        </section>

        <section className="case-study-cta">
          <p>WANT RESULTS THAT COMPOUND?</p>
          <h2>
            LET'S MAKE YOUR
            <br />
            <span>BUSINESS GAZAB.</span>
          </h2>
          <a href="/#contact">
            START A PROJECT <ArrowRight size={20} />
          </a>
        </section>
      </article>
    </main>
  );
}
