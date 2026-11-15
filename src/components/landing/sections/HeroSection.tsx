import { landingContent } from "@/content/landing"
import LandingButton from "../LandingButton"
import LandingContainer from "../LandingContainer"
import LandingSection from "../LandingSection"

export default function HeroSection() {
  const { hero } = landingContent

  return (
    <LandingSection variant="hero" aria-labelledby="landing-hero-title">
      <div className="bg" aria-hidden="true" />
      <LandingContainer>
        <div className="inner">
          <div className="badge">
            <span className="badge-dot" aria-hidden="true" />
            <span>{hero.eyebrow}</span>
          </div>

          <h1 id="landing-hero-title" className="title">
            {hero.title}
          </h1>

          <p className="lede">{hero.lede}</p>

          <div className="actions">
            <LandingButton href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
            </LandingButton>
            <LandingButton href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </LandingButton>
          </div>
        </div>
      </LandingContainer>
      <style jsx>{`
        .bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(10, 10, 10, 0.04), transparent 70%),
            linear-gradient(to right, rgba(10, 10, 10, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 10, 10, 0.04) 1px, transparent 1px);
          background-size: auto, 56px 56px, 56px 56px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%);
        }
        .inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          padding-block: 1rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 0 1.75rem;
          padding: 0.4375rem 0.875rem 0.4375rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--app-text);
          background: var(--app-surface);
          border: 1px solid var(--app-border);
          border-radius: 999px;
          box-shadow: var(--app-shadow-sm);
        }
        .badge-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: var(--app-success);
          box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.18);
        }
        .title {
          margin: 0 0 1.5rem;
          max-width: 14ch;
          font-size: clamp(2.75rem, 8.5vw, 3.75rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 0.98;
          color: var(--app-text);
          text-wrap: balance;
        }
        .lede {
          margin: 0 0 2.5rem;
          max-width: 38rem;
          font-size: 1.125rem;
          line-height: 1.55;
          color: var(--app-text-muted);
          text-wrap: pretty;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.875rem;
        }
        @media (min-width: 768px) {
          .title {
            font-size: clamp(4rem, 7vw, 5.25rem);
            max-width: 16ch;
          }
          .lede {
            font-size: 1.25rem;
            max-width: 40rem;
          }
        }
        @media (min-width: 1280px) {
          .title {
            font-size: 5.75rem;
            max-width: 15ch;
          }
          .lede {
            font-size: 1.3125rem;
          }
          .actions {
            gap: 1rem;
          }
        }
      `}</style>
    </LandingSection>
  )
}
