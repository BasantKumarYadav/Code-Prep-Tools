import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CodePrepTools for questions, feedback and suggestions.",
};

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="container content-page">
        <p className="eyebrow">Contact</p>

        <h1>Contact CodePrepTools</h1>

        <p>
          Have feedback, found a problem or have an idea for a
          developer tool?
        </p>

        <p>
          Email us at:
        </p>

        <p>
          <strong>basantbk024@gmail.com</strong>
        </p>
      </div>
    </section>
  );
}