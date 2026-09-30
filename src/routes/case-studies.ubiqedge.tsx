import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WhatsAppFloat } from "../components/whatsapp-float";
import caseStudyCss from "../case-study.css?url";
import whatsappFloatCss from "../whatsapp-float.css?url";

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
    links: [
      { rel: "stylesheet", href: caseStudyCss },
      { rel: "stylesheet", href: whatsappFloatCss },
    ],
  }),
  component: UbiqedgeCaseStudy,
});

const stats = [
  ["1,252 → 4,456", "Followers", "+3,204 / +255.9%"],
  ["99.8%", "New followers organic", "3,199 of 3,204"],
  ["83,985", "Content impressions", "1,358 reactions"],
  ["12,940", "Page views", "4,379 unique visitors"],
  ["388 → 1,809", "Newsletter subscribers", "+1,421 / +366.2%"],
  ["2,381", "Article views", "9,564 impressions"],
] as const;

const story = [
  {
    number: "01",
    eyebrow: "The challenge",
    title: "Build relevance",
    copy: "Ubiqedge needed a consistent B2B presence that could make a specialist technology brand easier to discover and worth following. The audience had to be relevant: engineers, business-development teams, decision-makers and future hires—not vanity traffic.",
  },
  {
    number: "02",
    eyebrow: "The approach",
    title: "Publish with purpose",
    copy: "We built the LinkedIn system around company news, hiring, engineering, infrastructure and sector insight. A reliable publishing rhythm, an owned newsletter and regular analytics reviews helped each useful idea travel further and informed what came next.",
  },
  {
    number: "03",
    eyebrow: "The outcome",
    title: "Compound the gains",
    copy: "The page added 3,204 followers—3,199 organically. Content generated 83,985 impressions, the page attracted 12,940 visits and the newsletter added 1,421 subscribers, creating a stronger audience the brand could reach repeatedly.",
  },
] as const;

const proofs = [
  {
    label: "Content performance",
    result: "83,985 impressions · 1,358 reactions · zero sponsored impressions",
    image: "/results/ubiqedge-linkedin-content-2026-09.jpg",
  },
  {
    label: "Page visitors",
    result: "12,940 views · 4,379 unique visitors",
    image: "/results/ubiqedge-linkedin-visitors-2026-09.jpg",
  },
  {
    label: "Follower growth",
    result: "4,456 total · 3,204 added · 3,199 organic",
    image: "/results/ubiqedge-linkedin-followers-2026-09.jpg",
  },
  {
    label: "Competitor benchmarking",
    result: "11.9% engagement rate · 33.7% above competitors",
    image: "/results/ubiqedge-linkedin-benchmarks-2026-09.jpg",
    wide: true,
  },
  {
    label: "Newsletter totals",
    result: "1,809 subscribers · 1,421 added · 2,381 article views",
    image: "/results/ubiqedge-linkedin-newsletter-totals-2026-09.jpg",
  },
  {
    label: "Newsletter trend",
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
          <span>Gazab Ki Agency</span>
        </a>
        <nav>
          <a href="/#work">
            <ArrowLeft size={16} /> Back to work
          </a>
          <a className="case-study-nav-cta" href="/#contact">
            Start a project <ArrowRight size={17} />
          </a>
        </nav>
      </header>

      <article className="case-study-article">
        <section className="case-study-hero">
          <div>
            <p className="case-study-kicker">Case study / B2B LinkedIn</p>
            <h1>Ubiqedge growth</h1>
          </div>
          <div className="case-study-summary">
            <p>
              Ubiqedge is a Mumbai-based AIoT company building connected hardware and cloud software
              for smarter, more sustainable infrastructure.
            </p>
            <a href="https://ubiqedge.com" target="_blank" rel="noreferrer">
              Visit Ubiqedge <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="case-study-company">
          <div>
            <p className="case-study-kicker">About the company</p>
            <h2>Meet Ubiqedge</h2>
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
              <span>Industrial IoT</span>
              <span>AI + analytics</span>
              <span>Smart water</span>
              <span>Solar monitoring</span>
              <span>Environmental monitoring</span>
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
            <p>The story</p>
            <h2>The strategy</h2>
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
            <p>Source material</p>
            <h2>The evidence</h2>
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
                  Open screenshot <ArrowUpRight size={14} />
                </small>
              </a>
            ))}
          </div>
          <p className="case-study-source">
            Source: LinkedIn Analytics, 15 Dec 2025–17 Sep 2026 depending on the report. Starting
            values are current totals minus reported new followers. This case study covers LinkedIn;
            other channels can be added when their data is supplied.
          </p>
        </section>

        <section className="case-study-cta">
          <p>Ready for clearer growth?</p>
          <h2>Let's talk</h2>
          <a href="/#contact">
            Start a project <ArrowRight size={20} />
          </a>
        </section>
      </article>
      <WhatsAppFloat />
    </main>
  );
}
