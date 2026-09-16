import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import logoAsset from "@/assets/gazab-logo.jpeg.asset.json";
import iconAsset from "@/assets/gazab-icon.jpeg.asset.json";
import socialWorkAsset from "@/assets/social-work.png.asset.json";
import instagramResultsAsset from "@/assets/instagram-results.png.asset.json";
import linkedinResultsAsset from "@/assets/linkedin-results.png.asset.json";
import whatsappResultsAsset from "@/assets/whatsapp-results.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gazab Ki Agency — Marketing, AI & Automation" },
      { name: "description", content: "A bold growth agency for social media, content, ads, websites, lead generation, AI and business automation." },
      { property: "og:title", content: "Gazab Ki Agency — Marketing, AI & Automation" },
      { property: "og:description", content: "Marketing karo. Gazab karo. Creative growth systems without the boring agency playbook." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const nav = ["home", "services", "results", "work", "pricing", "about", "contact"];
const services = [
  ["01", "SOCIAL MEDIA", "Content calendars, reels, posts, community management and growth strategy.", "✦"],
  ["02", "CONTENT THAT HITS", "Creative concepts, short-form video, graphics and campaign creatives.", "↗"],
  ["03", "PAID ADS", "Meta Ads, lead generation, retargeting and creative testing.", "◎"],
  ["04", "LEAD GENERATION", "IndiaMART, landing pages, social campaigns and conversion systems.", "⚡"],
  ["05", "WEBSITE & DIGITAL", "Business websites, landing pages, optimisation and conversion improvements.", "◒"],
  ["06", "AI + AUTOMATION", "Lead handling, reporting, repetitive task automation and AI systems.", "✳"],
  ["07", "MARKETPLACE GROWTH", "IndiaMART, Facebook, OLX, Amazon, Flipkart and listing optimisation.", "＋"],
  ["08", "GOOGLE PRESENCE", "Business Profile, reviews, reputation and local discoverability.", "★"],
];
const stats = [
  ["300K+", "FOLLOWER GROWTH"], ["7.2K → 98K", "INSTAGRAM GROWTH"], ["44K → 231K", "FACEBOOK GROWTH"],
  ["250 → 1.5K", "LINKEDIN GROWTH"], ["50+", "META CAMPAIGN LEADS"], ["30K+", "COMMUNITY MANAGED"],
];
const cases = [
  ["RADIOANDMUSIC / INDIAN TELEVISION", "Social growth, content, event promotions and monetisation.", instagramResultsAsset.url],
  ["BARRIERBREAK", "Event social media coverage for Inclusive India: Digital First 2025.", socialWorkAsset.url],
  ["RENTMAX", "Website improvement, content strategy and Meta lead generation.", linkedinResultsAsset.url],
  ["MOTOHOM", "Content production, community management and Instagram growth.", whatsappResultsAsset.url],
  ["FURNDEPOT", "Organic growth strategy, analytics and creative campaigns.", socialWorkAsset.url],
  ["UBIQEDGE", "Digital marketing, AI automation and connected growth systems.", linkedinResultsAsset.url],
];
const process = [
  ["01", "DEKHENGE", "We understand the business, audience, competitors and actual problem."],
  ["02", "BANAYENGE", "We build the content, campaigns, websites and systems."],
  ["03", "AUTOMATE KARENGE", "We remove repetitive work wherever technology can handle it."],
  ["04", "GROW KARENGE", "We track what works, optimise it and keep improving."],
];

function ButtonLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a href={href} className={`brand-button ${dark ? "brand-button-dark" : ""}`}>{children}</a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 50);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Gazab project enquiry — ${String(data.get("company") || data.get("name"))}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nNeed: ${data.get("need")}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`);
    window.location.href = `mailto:dalviabdallah76@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <main id="home" className="overflow-hidden bg-background text-foreground">
      <header className={`site-nav ${compact ? "site-nav-compact" : ""}`}>
        <a href="#home" aria-label="Gazab Ki Agency home" className="nav-brand"><img src={iconAsset.url} alt="" /><span>GAZAB KI AGENCY</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav>
        <a className="nav-cta" href="#contact">LET'S MAKE IT GAZAB <ArrowRight size={18} /></a>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav">{nav.map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav>}
      </header>

      <section className="hero-section section-shell">
        <div className="hero-copy">
          <span className="eyebrow">MARKETING <i>•</i> AI <i>•</i> AUTOMATION</span>
          <h1>MARKETING<br />KARO.<br /><span>GAZAB</span><br />KARO.</h1>
          <p>Social media, ads, websites, AI & automation —<br className="hidden sm:block" /> sab ek jagah. Aur boring bilkul nahi.</p>
          <div className="button-row"><ButtonLink href="#contact">LET'S MAKE IT GAZAB <ArrowRight /></ButtonLink><ButtonLink href="#work" dark>SEE WHAT WE'VE DONE <ArrowDown /></ButtonLink></div>
        </div>
        <div className="hero-art" aria-label="Gazab Ki Agency logo artwork">
          <div className="orange-orbit" /><div className="purple-splash" />
          <img src={logoAsset.url} alt="Gazab Ki Agency — Marketing, AI, Automation" />
          <span className="sticker sticker-one">NO BORING BRANDS</span><span className="sticker sticker-two">AI WALA SCENE</span><span className="sticker sticker-three">MORE LEADS ↗</span>
          <span className="scribble">scroll kar na. ↓</span>
        </div>
      </section>
      <div className="marquee"><div>SOCIAL MEDIA • CONTENT • ADS • AI • AUTOMATION • WEBSITES • LEADS • GROWTH • SOCIAL MEDIA • CONTENT • ADS • AI • AUTOMATION • WEBSITES • LEADS • GROWTH •</div></div>

      <section id="services" className="section-shell cream-section">
        <div className="section-heading"><span className="section-number">02</span><div><p className="kicker">WHAT WE DO / KAAM KI BAAT HAI</p><h2>BUSINESS HAI.<br /><span>AB GAZAB BANAO.</span></h2></div></div>
        <p className="lead-copy">We don't just post content and call it marketing. We build the digital systems around your business — from attention and content to leads, websites and automation.</p>
        <div className="services-grid">{services.map(([n, title, copy, icon], i) => <article className={`service-card service-${i + 1}`} key={title}><div className="service-top"><span>{n}</span><b>{icon}</b></div><h3>{title}</h3><p>{copy}</p><span className="card-arrow">↗</span></article>)}</div>
      </section>

      <section id="results" className="black-section section-shell">
        <p className="kicker kicker-orange">OK BUT CAN YOU ACTUALLY DO IT?</p><h2 className="receipts">THE<br /><span>RECEIPTS.</span></h2>
        <div className="proof-intro"><h3>Sirf bakchodi nahi.<br />Numbers bhi hain.</h3><p>Gazab Ki Agency is founder-led by Abdallah Dalvi, bringing years of hands-on experience across social media, digital marketing, growth, content and automation.</p></div>
        <div className="stats-grid">{stats.map(([value, label], i) => <article key={label} className={`stat stat-${i + 1}`}><strong>{value}</strong><span>{label}</span></article>)}</div>
        <p className="proof-note">Founder-led track record based on Abdallah's professional experience. No borrowed glory. No made-up numbers.</p>
      </section>

      <section id="work" className="work-section">
        <div className="section-shell work-head"><p className="kicker">SELECTED WORK / YEH WALA DEKHO →</p><h2>KAAM DEKHO.<br /><span>BAATEIN BAAD MEIN.</span></h2></div>
        <div className="case-scroll">{cases.map(([brand, copy, image], i) => <article className="case-card" key={brand}><div className="case-image"><img src={image} alt={`${brand} work sample`} loading="lazy" /></div><div className="case-copy"><span>0{i + 1} / CASE STUDY</span><h3>{brand}</h3><p>{copy}</p><b>VIEW THE WORK <ArrowUpRight /></b></div></article>)}</div>
      </section>

      <section className="process-section section-shell">
        <p className="kicker">OUR SECRET SAUCE</p><h2>TOH HOGA <span>KAISE?</span></h2>
        <div className="process-grid">{process.map(([n, title, copy]) => <article key={n}><strong>{n}</strong><div><h3>{title}</h3><p>{copy}</p></div><span className="process-arrow">→</span></article>)}</div>
      </section>

      <section className="systems-section section-shell">
        <div><p className="kicker kicker-orange">POSTING ≠ MARKETING</p><h2>POST KARNE SE<br /><span>BUSINESS NAHI CHALTA.</span></h2><p className="lead-copy">Marketing tab kaam karti hai jab content, traffic, conversion and operations ek doosre se connected ho.</p></div>
        <div className="system-flow">{["ATTENTION", "CONTENT", "TRAFFIC", "LEADS", "SALES", "RETENTION", "AUTOMATION"].map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong>{i < 6 && <b>↓</b>}</div>)}</div>
      </section>

      <section id="pricing" className="pricing-section section-shell">
        <p className="kicker">PRICING / SEEDHI BAAT</p><h2>PAISA KITNA<br /><span>LAGEGA, BHAI?</span></h2><p className="lead-copy">No confusing 17-page pricing PDF. Seedhi baat.</p>
        <div className="pricing-grid">
          <PriceCard number="01" title="THODA GAZAB" price="₹14,999" note="For businesses that need a consistent social media presence." items={["Social media management", "Content calendar", "8–12 content pieces / month", "Reels + static creatives", "Captions & hashtags", "Basic analytics", "Monthly strategy call"]} cta="THODA GAZAB KARO" />
          <PriceCard number="02" title="FULL GAZAB" price="₹24,999" note="For businesses that want growth + lead generation." items={["Everything in Thoda Gazab", "More reels / content", "Social media strategy", "Meta Ads management", "Lead generation", "Website optimisation", "Google Business Profile support", "Performance reporting", "Basic automation"]} cta="FULL GAZAB KARO" featured />
          <PriceCard number="03" title="APNA SCENE, APNA PRICE" price="CUSTOM" note="Har business ka scene alag hota hai. Custom strategy, custom work, custom pricing." items={["Full digital marketing", "Advanced automation", "AI workflows", "Website development", "Marketplace management", "Paid advertising", "Custom growth systems"]} cta="BAAT KARTE HAIN" />
        </div>
      </section>

      <section className="why-section section-shell">
        <p className="kicker">WHY US?</p><h2>KYUN <span>HUM?</span></h2>
        <div className="why-list"><strong>NO BORING CONTENT.</strong><strong>NO COPY-PASTE STRATEGIES.</strong><strong>NO RANDOM POSTING.</strong><strong>NO “BHAI REACH NAHI AA RAHI.”</strong></div>
        <div className="formula"><span>STRATEGY</span><b>+</b><span>CREATIVITY</span><b>+</b><span>TECHNOLOGY</span></div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="founder-art"><div className="founder-z">Z</div><span>FOUNDER-LED.<br />SYSTEM-OBSESSED.</span></div>
        <div><p className="kicker">ABOUT THE FOUNDER</p><h2>IS GAZAB KE<br /><span>PICHE KAUN HAI?</span></h2><h3>ABDALLAH DALVI</h3><h4>FOUNDER / GROWTH & MARKETING STRATEGIST</h4><p>Abdallah works across social media, digital marketing, growth, content, websites, AI and automation — combining creative execution with systems that help businesses grow.</p><div className="tag-list">{["SOCIAL STRATEGY", "AI AUTOMATION", "LEAD GENERATION", "WEBSITES", "CONTENT", "PAID ADS"].map(t => <span key={t}>{t}</span>)}</div></div>
      </section>

      <section className="mega-cta section-shell"><span className="cta-sticker">HAAN BHAI.</span><p>BAS AB. NEXT STEP?</p><h2>LET'S MAKE<br />YOUR BUSINESS<br /><span>GAZAB.</span></h2><div className="button-row"><ButtonLink href="#contact">START A PROJECT <ArrowRight /></ButtonLink><ButtonLink dark href="https://wa.me/917400239134?text=Hi%20Abdallah%2C%20let%27s%20make%20my%20business%20Gazab!">WHATSAPP US <ArrowUpRight /></ButtonLink></div></section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-info"><p className="kicker">NO CORPORATE JARGON REQUIRED.</p><h2>BAAT<br /><span>KARTE HAIN.</span></h2><a href="mailto:dalviabdallah76@gmail.com">dalviabdallah76@gmail.com ↗</a><a href="tel:+917400239134">+91 74002 39134 ↗</a><a href="https://www.linkedin.com/in/abdallahdalvi" target="_blank" rel="noreferrer">LINKEDIN ↗</a><span className="social-pending">INSTAGRAM — LINK COMING SOON</span></div>
        <form onSubmit={submit} className="contact-form"><div className="form-row"><label>NAME<input name="name" required maxLength={100} /></label><label>COMPANY<input name="company" maxLength={100} /></label></div><div className="form-row"><label>EMAIL<input name="email" type="email" required maxLength={255} /></label><label>PHONE<input name="phone" type="tel" maxLength={20} /></label></div><div className="form-row"><label>WHAT DO YOU NEED?<select name="need" required defaultValue=""><option value="" disabled>Choose the scene</option><option>Social media</option><option>Content & reels</option><option>Paid ads & leads</option><option>Website</option><option>AI & automation</option><option>Full Gazab</option></select></label><label>BUDGET<select name="budget" required defaultValue=""><option value="" disabled>Pick a range</option><option>₹15K–₹25K / month</option><option>₹25K–₹50K / month</option><option>₹50K+ / month</option><option>Let's discuss</option></select></label></div><label>MESSAGE<textarea name="message" required maxLength={1500} rows={4} /></label><button className="form-submit" type="submit">CHALO SHURU KARTE HAIN <ArrowRight /></button></form>
      </section>

      <footer><div className="footer-main section-shell"><img src={logoAsset.url} alt="Gazab Ki Agency" /><div><h2>GAZAB KI<br />AGENCY</h2><p>MARKETING • AI • AUTOMATION</p></div><nav>{nav.slice(0, 6).map(item => <a key={item} href={`#${item}`}>{item.toUpperCase()}</a>)}</nav></div><div className="footer-strip"><strong>GAZAB KI AGENCY BY AGHANIMS GROUP</strong><span>© 2026 Aghanims Group. All Rights Reserved.</span><span>Made with too much coffee & too many ideas.</span></div></footer>
    </main>
  );
}

function PriceCard({ number, title, price, note, items, cta, featured = false }: { number: string; title: string; price: string; note: string; items: string[]; cta: string; featured?: boolean }) {
  return <article className={`price-card ${featured ? "featured" : ""}`}>{featured && <span className="popular">MOST POPULAR ✦</span>}<span className="price-number">PACKAGE {number}</span><h3>{title}</h3><strong>{price}{price !== "CUSTOM" && <small> / MONTH</small>}</strong><p>{note}</p><ul>{items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><a href="#contact">{cta} <ArrowRight /></a></article>;
}