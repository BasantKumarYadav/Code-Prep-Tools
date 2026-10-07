import type { Metadata } from "next";
import ToolCard from "@/components/common/ToolCard";
import { toolCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Free online developer tools including JSON formatting, validation and more.",
};

export default function DeveloperToolsPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Developer Tools</p>

          <h1>Free Developer Tools</h1>

          <p>
            Simple browser-based tools designed to make everyday
            development tasks faster.
          </p>
        </div>

        {toolCategories.map((category) => (
          <section key={category.title} className="tool-category">
            <h2>{category.title}</h2>

            <p>{category.description}</p>

            <div className="tool-grid">
              {category.tools.map((tool) => (
                <ToolCard
                  key={tool.href}
                  name={tool.name}
                  description={tool.description}
                  href={tool.href}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}