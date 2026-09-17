import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/case-studies/ubiqedge")({
  head: () => ({
    meta: [
      { title: "Ubiqedge LinkedIn Growth Case Study | Gazab Ki Agency" },
      {
        name: "description",
        content:
          "How Gazab Ki Agency helped Ubiqedge grow its LinkedIn audience by 256.4%, generate 83,315 impressions and build an owned newsletter audience.",
      },
    ],
  }),
  component: UbiqedgeCaseStudy,
});

const stats = [
  ["1,239 → 4,416", "FOLLOWERS", "+3,177 / +256.4%"],
  ["99.9%", "NEW FOLLOWERS ORGANIC", "3,173 of 3,177"],
  ["83,315", "CONTENT IMPRESSIONS", "1,344 reactions"],
  ["12,833", "PAGE VIEWS", "4,347 unique visitors"],
  ["388 → 1,786", "NEWSLETTER SUBSCRIBERS", "+1,398 / +360.3%"],
  ["2,379", "ARTICLE VIEWS", "9,554 impressions"],
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
    copy: "The page added 3,177 followers—3,173 organically. Content generated more than 83,000 impressions, the page attracted 12,833 visits and the newsletter added 1,398 subscribers, creating a stronger audience the brand could reach repeatedly.",
  },
] as const;

const proofs = [
  [
    "CONTENT PERFORMANCE",
    "83,315 impressions · 1,344 reactions",
    "/results/ubiqedge-linkedin-content.jpg",
  ],
  ["FOLLOWER GROWTH", "4,416 total · 3,177 added", "/results/ubiqedge-linkedin-followers.jpg"],
  [
    "PAGE VISITORS",
    "12,833 views · 4,347 unique visitors",
    "/results/ubiqedge-linkedin-visitors.jpg",
  ],
  [
    "NEWSLETTER GROWTH",
    "1,786 subscribers · 1,398 added",
    "/results/ubiqedge-linkedin-newsletter.jpg",
  ],
  [
    "COMPETITOR BENCHMARKING",
    "Category growth and engagement tracking",
    "/results/ubiqedge-linkedin-competitors.jpg",
  ],
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
              A consistent B2B content system that grew a relevant professional audience, earned
              repeat page visits and turned industry expertise into an owned newsletter audience.
            </p>
            <a href="https://ubiqedge.com" target="_blank" rel="noreferrer">
              VISIT UBIQEDGE.COM <ArrowUpRight size={18} />
            </a>
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
            {proofs.map(([label, result, image]) => (
              <a href={image} target="_blank" rel="noreferrer" key={label}>
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
            SOURCE: LINKEDIN ANALYTICS · 15 DEC 2025–16 SEP 2026. STARTING VALUES ARE CALCULATED AS
            CURRENT TOTAL MINUS REPORTED NEW FOLLOWERS. THIS IS THE LINKEDIN CHAPTER; OTHER CHANNELS
            WILL BE ADDED WHEN THEIR DATA IS SUPPLIED.
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
