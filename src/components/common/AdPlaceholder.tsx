interface AdPlaceholderProps {
  label?: string;
}

export default function AdPlaceholder({
  label = "Advertisement",
}: AdPlaceholderProps) {
  return (
    <div
      className="ad-placeholder"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}