import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CodePrepTools.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="page-section">
      <div className="container content-page">
        <p className="eyebrow">Legal</p>

        <h1>Privacy Policy</h1>

        <p>
          This Privacy Policy explains how CodePrepTools handles
          information when you use our website.
        </p>

        <h2>Developer tools</h2>

        <p>
          Tools such as our JSON Formatter process input directly
          in your browser. JSON entered into these tools is not
          intentionally transmitted to our servers by the tool.
        </p>

        <h2>Analytics</h2>

        <p>
          If analytics services are enabled, anonymous or
          pseudonymous usage information may be collected to
          understand how visitors use the website.
        </p>

        <h2>Advertising</h2>

        <p>
          We may use advertising services in the future. Such
          services may use cookies or similar technologies
          according to their own policies.
        </p>

        <h2>Changes</h2>

        <p>
          This policy may be updated as the website and its
          services change.
        </p>
      </div>
    </section>
  );
}