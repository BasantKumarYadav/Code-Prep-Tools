import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about CodePrepTools and our developer-focused tools.",
};

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="container content-page">
        <p className="eyebrow">About</p>

        <h1>About CodePrepTools</h1>

        <p>
          CodePrepTools is a collection of practical developer
          tools and interview preparation resources designed to
          make everyday software development tasks simpler.
        </p>

        <h2>Our goal</h2>

        <p>
          We focus on building lightweight tools that are easy to
          use, fast and useful for developers.
        </p>
      </div>
    </section>
  );
}