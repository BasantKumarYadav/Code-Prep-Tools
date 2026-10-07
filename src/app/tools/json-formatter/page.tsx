import type { Metadata } from "next";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online | CodePrepTools",
  description:
    "Format, beautify, minify and validate JSON online. Process JSON directly in your browser with CodePrepTools.",
  keywords: [
    "JSON formatter",
    "JSON beautifier",
    "JSON validator",
    "JSON minifier",
    "format JSON online",
  ],
};

const faqs = [
  {
    question: "What is a JSON formatter?",
    answer:
      "A JSON formatter converts compact or difficult-to-read JSON into a structured, indented format that is easier to read and debug.",
  },
  {
    question: "Is this JSON formatter free?",
    answer:
      "Yes. CodePrepTools provides this JSON formatter as a free browser-based developer tool.",
  },
  {
    question: "Is my JSON uploaded to a server?",
    answer:
      "No. The formatting and validation operations are performed directly in your browser.",
  },
  {
    question: "What does JSON validation do?",
    answer:
      "JSON validation checks whether the supplied text follows valid JSON syntax and reports an error when the syntax is invalid.",
  },
  {
    question: "Can I minify JSON?",
    answer:
      "Yes. The Minify option removes unnecessary whitespace and produces compact JSON.",
  },
];

export default function JsonFormatterPage() {
  return (
    <main>
      <section className="tool-hero">
        <div className="container">
          <p className="eyebrow">Developer Tool</p>

          <h1>JSON Formatter &amp; Validator</h1>

          <p className="hero-description">
            Format, beautify, validate and minify JSON directly in
            your browser.
          </p>
        </div>
      </section>

      <section className="container tool-content">
        <JsonFormatter />

        <article className="content-section">
          <h2>What is JSON?</h2>

          <p>
            JSON, or JavaScript Object Notation, is a lightweight
            text format commonly used for exchanging structured
            data between applications and APIs.
          </p>

          <p>
            JSON is frequently used in REST APIs, configuration
            files, web applications and communication between
            frontend and backend systems.
          </p>
        </article>

        <article className="content-section">
          <h2>Why use a JSON formatter?</h2>

          <p>
            JSON returned by an API is sometimes compressed into a
            single line. Formatting it with indentation makes the
            structure easier to inspect, understand and debug.
          </p>

          <h3>Example</h3>

          <div className="code-example">
            <pre>
              {`{"name":"John","age":30,"active":true}`}
            </pre>
          </div>

          <p>After formatting:</p>

          <div className="code-example">
            <pre>
              {`{
  "name": "John",
  "age": 30,
  "active": true
}`}
            </pre>
          </div>
        </article>

        <article className="content-section">
          <h2>How to format JSON</h2>

          <ol>
            <li>Paste your JSON into the input box.</li>
            <li>Select your preferred indentation.</li>
            <li>Click Format JSON.</li>
            <li>Copy or download the formatted result.</li>
          </ol>
        </article>

        <article className="content-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}