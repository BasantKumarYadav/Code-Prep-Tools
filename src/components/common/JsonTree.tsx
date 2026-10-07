"use client";

import { useState } from "react";

interface JsonTreeProps {
  value: unknown;
}

interface JsonNodeProps {
  label?: string;
  value: unknown;
  level: number;
}

export default function JsonTree({
  value,
}: JsonTreeProps) {
  return (
    <div className="json-tree">
      <JsonNode value={value} level={0} />
    </div>
  );
}

function JsonNode({
  label,
  value,
  level,
}: JsonNodeProps) {
  const [expanded, setExpanded] = useState(true);

  const isObject =
    value !== null &&
    typeof value === "object";

  if (!isObject) {
    return (
      <div
        className="json-tree-value"
        style={{ paddingLeft: level * 18 }}
      >
        {label && (
          <span className="json-tree-key">
            {label}:{" "}
          </span>
        )}

        <span
          className={
            typeof value === "string"
              ? "json-tree-string"
              : "json-tree-primitive"
          }
        >
          {JSON.stringify(value)}
        </span>
      </div>
    );
  }

  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value);

  return (
    <div className="json-tree-node">
      <button
        type="button"
        className="json-tree-toggle"
        style={{ paddingLeft: level * 18 }}
        onClick={() => setExpanded((current) => !current)}
      >
        <span>{expanded ? "▼" : "▶"}</span>

        {label && (
          <span className="json-tree-key">
            {label}
          </span>
        )}

        <span className="json-tree-type">
          {Array.isArray(value)
            ? `Array (${entries.length})`
            : `Object (${entries.length})`}
        </span>
      </button>

      {expanded && (
        <div>
          {entries.map(([key, child]) => (
            <JsonNode
              key={key}
              label={key}
              value={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}