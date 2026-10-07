import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for CodePrepTools.",
};

export default function TermsPage() {
  return (
    <section className="page-section">
      <div className="container content-page">
        <p className="eyebrow">Legal</p>

        <h1>Terms of Service</h1>

        <p>
          By using CodePrepTools, you agree to use the website
          responsibly and in accordance with applicable laws.
        </p>

        <h2>Use of tools</h2>

        <p>
          Our tools are provided for general informational and
          development purposes. You are responsible for verifying
          outputs before using them in production systems.
        </p>

        <h2>Availability</h2>

        <p>
          We may modify, suspend or discontinue features of the
          website at any time.
        </p>

        <h2>Limitation</h2>

        <p>
          CodePrepTools is provided on an as-is basis to the extent
          permitted by applicable law.
        </p>
      </div>
    </section>
  );
}