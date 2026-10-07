import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
}

export default function ToolCard({
  name,
  description,
  href,
}: ToolCardProps) {
  return (
    <Link href={href} className="tool-card">
      <div className="tool-card-icon">
        <Wrench size={20} />
      </div>

      <h2>{name}</h2>

      <p>{description}</p>

      <span className="tool-card-link">
        Open tool
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}