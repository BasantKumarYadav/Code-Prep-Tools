import Link from "next/link";
import {
  ArrowRight,
  Braces,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <p className="eyebrow">
            CodePrepTools provides free online developer tools,
            programming utilities, and interview preparation
            resources to help developers work faster and prepare
            for technical interviews.
          </p>

          <h1>
            Simple tools for
            <br />
            developers.
          </h1>

          <p className="home-description">
            Fast, free and privacy-friendly tools to help developers
            build, debug and prepare for technical interviews.
          </p>

          <div className="hero-actions">
            <Link
              href="/developer-tools"
              className="primary-button"
            >
              Explore Developer Tools
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <Zap size={24} />

              <h2>Fast</h2>

              <p>
                Lightweight browser-based tools without unnecessary
                complexity.
              </p>
            </div>

            <div className="feature-card">
              <ShieldCheck size={24} />

              <h2>Privacy Friendly</h2>

              <p>
                Tools such as the JSON formatter process your data
                directly in the browser.
              </p>
            </div>

            <div className="feature-card">
              <Braces size={24} />

              <h2>Developer Focused</h2>

              <p>
                Practical utilities designed around everyday
                development workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}