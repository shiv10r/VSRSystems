import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Advantage, StoryPanel } from "../components/home/HomePrimary"
import { DeliveryProcess, FinalCta } from "../components/home/HomeSecondary"
import { PageMeta } from "../components/shared/PageMeta"
import { RouteHero } from "../components/shared/RouteHero"
import { industries, insights } from "../data/content"
import { siteConfig } from "../data/site"

export const CompanyPage = () => (
  <>
    <PageMeta
      title="Company"
      description="Learn how VSR Systems connects strategy, engineering and operations."
    />
    <RouteHero
      eyebrow="Company"
      title="Built for accountable technology progress"
      description="We combine consulting discipline with hands-on engineering so priorities, architecture and delivery remain connected."
    />
    <section className="section">
      <div className="container editorial-grid">
        <h2>
          Practical by design.
          <br />
          <span className="gradient-text">Ambitious by outcome.</span>
        </h2>
        <div>
          <p>
            VSR Systems helps organizations modernize applications, automate operations, adopt cloud
            platforms, use data intelligently and build secure digital products.
          </p>
          <p>
            We favor clear scope, small expert teams, maintainable architecture and evidence from
            working software over buzzwords or inflated claims.
          </p>
        </div>
      </div>
    </section>
    <Advantage />
    <DeliveryProcess />
    <StoryPanel />
    <FinalCta />
  </>
)

export const IndustriesPage = () => (
  <>
    <PageMeta
      title="Industries"
      description="Technology engineering for healthcare, finance, retail, manufacturing, travel and logistics."
    />
    <RouteHero
      eyebrow="Industries"
      title="Engineering shaped by operating reality"
      description="Industry context changes risk, workflows and the definition of reliability. We start there, then apply modern technology with discipline."
    />
    <section className="section">
      <div className="container industry-page-grid">
        {industries.map((industry, index) => (
          <article key={industry.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{industry.title}</h2>
            <p>{industry.description}</p>
            <Link to="/contact">
              Discuss your challenge <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </article>
        ))}
      </div>
    </section>
    <FinalCta />
  </>
)

export const InsightsPage = () => (
  <>
    <PageMeta
      title="Insights"
      description="Practical VSR Systems perspectives on software, AI, cloud and modernization."
    />
    <RouteHero
      eyebrow="Insights"
      title="Clear thinking for consequential technology decisions"
      description="Practical perspectives for leaders building, modernizing and operating digital systems."
    />
    <section className="section">
      <div className="container insight-page-list">
        {insights.map((insight, index) => (
          <article key={insight.title}>
            <span>Perspective / 0{index + 1}</span>
            <div>
              <h2>{insight.title}</h2>
              <p>{insight.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
    <FinalCta />
  </>
)

export const CareersPage = () => (
  <>
    <PageMeta
      title="Careers"
      description="Explore the working principles and future opportunities at VSR Systems."
    />
    <RouteHero
      eyebrow="Careers"
      title="Do meaningful engineering work with clear ownership"
      description="VSR Systems is building a practical, high-trust engineering culture around complex technology outcomes."
    />
    <section className="section">
      <div className="container careers-panel surface">
        <div>
          <p className="eyebrow">Working principles</p>
          <h2>Depth over theatre</h2>
        </div>
        <div>
          <p>
            We value clear thinking, strong craft, respectful communication and the discipline to
            make complex systems understandable.
          </p>
          <p>
            No verified open roles are published right now. If your experience aligns with software,
            cloud, data, AI or security engineering, you can introduce yourself directly.
          </p>
          <a
            className="button button--primary"
            href={`mailto:${siteConfig.email}?subject=VSR%20Systems%20career%20introduction`}
          >
            Introduce yourself
          </a>
        </div>
      </div>
    </section>
  </>
)

export const PrivacyPage = () => (
  <>
    <PageMeta title="Privacy" description="VSR Systems website privacy information." />
    <RouteHero
      eyebrow="Privacy"
      title="A clear, minimal privacy approach"
      description="This website collects only the information you choose to submit through the contact form."
    />
    <section className="section">
      <div className="container legal-copy">
        <h2>Contact information</h2>
        <p>
          When you submit the contact form, the supplied details are processed by Netlify Forms so
          VSR Systems can respond to your inquiry. Do not submit sensitive personal, financial or
          confidential information.
        </p>
        <h2>External services</h2>
        <p>
          This release does not include advertising trackers, social pixels or a live chatbot.
          Hosting infrastructure may retain standard operational logs according to the hosting
          provider's policies.
        </p>
        <h2>Your choice</h2>
        <p>
          You may contact VSR Systems directly at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> instead of using the form.
        </p>
      </div>
    </section>
  </>
)

export const NotFoundPage = () => (
  <>
    <PageMeta
      title="Page Not Found"
      description="The requested VSR Systems page could not be found."
    />
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">404 / Route not found</p>
        <h1>This path is outside the system.</h1>
        <p>The page may have moved or the address may be incorrect.</p>
        <div>
          <Link className="button button--primary" to="/">
            Return home
          </Link>
          <Link className="button button--secondary" to="/services">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  </>
)
