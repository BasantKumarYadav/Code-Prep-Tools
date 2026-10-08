import type { Metadata } from "next";
import Link from "next/link";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Formatter - Format & Beautify JSON Online",

  description:
    "Format, beautify, validate, minify, and inspect JSON online for free. CodePrepTools processes your JSON directly in your browser.",

  alternates: {
    canonical: "/tools/json-formatter",
  },

  openGraph: {
    title: "JSON Formatter - Format & Beautify JSON Online",
    description:
      "Free online JSON formatter, validator, beautifier, and minifier for developers.",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a JSON formatter?",
    answer:
      "A JSON formatter converts compact or difficult-to-read JSON into a structured, indented format that is easier to read, understand, and debug.",
  },
  {
    question: "How do I format JSON online?",
    answer:
      "Paste your JSON into the input editor, choose your preferred indentation, and click the Format JSON button. The formatted JSON will appear in the output section.",
  },
  {
    question: "Is this JSON formatter free?",
    answer:
      "Yes. CodePrepTools provides this JSON formatter as a free browser-based developer tool.",
  },
  {
    question: "Is my JSON uploaded to a server?",
    answer:
      "No. JSON formatting, validation, and minification are performed directly in your browser. Your JSON does not need to be uploaded to a server.",
  },
  {
    question: "What does JSON validation do?",
    answer:
      "JSON validation checks whether the supplied text follows valid JSON syntax and reports an error when the JSON is invalid.",
  },
  {
    question: "Can I minify JSON?",
    answer:
      "Yes. The Minify option removes unnecessary whitespace from valid JSON and produces a compact JSON string.",
  },
  {
    question: "Can I download formatted JSON?",
    answer:
      "Yes. After formatting your JSON, you can download the result as a JSON file using the download option.",
  },
];

const features = [
  {
    title: "Format JSON",
    description:
      "Beautify compact or difficult-to-read JSON with configurable indentation.",
  },
  {
    title: "Validate JSON",
    description:
      "Check whether your JSON contains valid syntax before using it in an application or API.",
  },
  {
    title: "Minify JSON",
    description:
      "Remove unnecessary whitespace and convert JSON into a compact format.",
  },
  {
    title: "Sort JSON Keys",
    description:
      "Organize object keys alphabetically to make large JSON structures easier to inspect.",
  },
  {
    title: "Copy JSON",
    description:
      "Copy formatted or minified JSON directly to your clipboard.",
  },
  {
    title: "Download JSON",
    description:
      "Download the processed JSON as a file for use in your development workflow.",
  },
];

const steps = [
  {
    number: "1",
    title: "Paste your JSON",
    description:
      "Paste the JSON response, configuration, API data, or object you want to format into the input editor.",
  },
  {
    number: "2",
    title: "Choose your options",
    description:
      "Select the indentation size and enable options such as sorting JSON keys when needed.",
  },
  {
    number: "3",
    title: "Format or validate",
    description:
      "Click Format JSON to beautify the data, Validate JSON to check its syntax, or Minify JSON to create a compact version.",
  },
  {
    number: "4",
    title: "Copy or download",
    description:
      "Copy the processed JSON to your clipboard or download it as a JSON file.",
  },
];

const formattedExample = `{
  "name": "Basant",
  "age": 23,
  "active": true
}`;

const compactExample = `{"name":"Basant","age":23,"active":true}`;

export default function JsonFormatterPage() {
  const jsonFormatterStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter",
    description:
      "Free online JSON formatter, validator, beautifier, and minifier for developers.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Developer Tools",
        item: "/developer-tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "JSON Formatter",
        item: "/tools/json-formatter",
      },
    ],
  };

  return (
    <main>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonFormatterStructuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      {/* Hero Section */}
      <section className="tool-hero">
        <div className="container">
          <p className="eyebrow">Free Developer Tool</p>

          <h1>JSON Formatter - Format &amp; Beautify JSON Online</h1>

          <p className="hero-description">
            Format, beautify, validate, minify, and inspect JSON online.
            CodePrepTools processes your JSON directly in your browser.
          </p>
        </div>
      </section>

      {/* JSON Tool */}
      <section className="container tool-content">
        <JsonFormatter />

        {/* Features */}
        <article className="content-section">
          <h2>JSON Formatter Features</h2>

          <p>
            Use this free JSON formatter to quickly format and inspect JSON
            while working with APIs, web applications, configuration files,
            and backend services.
          </p>

          <div className="feature-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </article>

        {/* How To */}
        <article className="content-section">
          <h2>How to Format JSON Online</h2>

          <p>
            Formatting JSON takes only a few simple steps. You do not need to
            install any software or browser extension.
          </p>

          <div className="steps-list">
            {steps.map((step) => (
              <div className="step-item" key={step.number}>
                <div className="step-number">{step.number}</div>

                <div>
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Example */}
        <article className="content-section">
          <h2>JSON Formatter Example</h2>

          <p>
            Minified JSON can be difficult to read, especially when working
            with large API responses. A formatter adds indentation and makes
            the structure easier to understand.
          </p>

          <h3>Input JSON</h3>

          <div className="code-example">
            <pre>{compactExample}</pre>
          </div>

          <h3>Formatted JSON</h3>

          <div className="code-example">
            <pre>{formattedExample}</pre>
          </div>
        </article>

        {/* What is JSON */}
        <article className="content-section">
          <h2>What is JSON?</h2>

          <p>
            JSON, or JavaScript Object Notation, is a lightweight text format
            used to represent and exchange structured data between
            applications.
          </p>

          <p>
            JSON is commonly used in REST APIs, web applications, configuration
            files, databases, and communication between frontend and backend
            systems.
          </p>

          <p>
            Because JSON is widely used in modern software development,
            developers frequently need to format, validate, inspect, and
            minify JSON during development and debugging.
          </p>
        </article>

        {/* Why Use */}
        <article className="content-section">
          <h2>Why Use an Online JSON Formatter?</h2>

          <p>
            API responses and JSON configuration files are often returned as a
            single line or contain inconsistent spacing. This makes the data
            difficult to inspect manually.
          </p>

          <p>
            A JSON formatter makes the structure easier to understand by
            adding indentation and line breaks. This can help developers
            quickly find objects, arrays, properties, and values.
          </p>

          <p>
            CodePrepTools also provides JSON validation and minification so you
            can check your JSON and prepare it for different development
            scenarios.
          </p>
        </article>

        {/* FAQ */}
        <article className="content-section">
          <h2>JSON Formatter FAQ</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>

                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>

        {/* Related Tools */}
        <article className="content-section related-tools-section">
          <h2>Related Developer Tools</h2>

          <p>
            Explore more free developer utilities from CodePrepTools.
          </p>

          <div className="related-tools-grid">
            <Link href="/developer-tools" className="related-tool-card">
              <h3>Developer Tools</h3>

              <p>
                Explore free tools for developers, programmers, and software
                engineers.
              </p>
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}