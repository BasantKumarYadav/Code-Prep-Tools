"use client";

import { useState } from "react";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

interface JsonTreeProps {
  value: JsonValue;
  name?: string;
  isLast?: boolean;
  level?: number;
}

interface JsonNodeProps {
  name?: string;
  value: JsonValue;
  isLast: boolean;
  level: number;
}

function isObject(value: JsonValue): value is {
  [key: string]: JsonValue;
} {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isArray(value: JsonValue): value is JsonValue[] {
  return Array.isArray(value);
}

function formatPrimitive(value: JsonPrimitive): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "boolean") {
    return String(value);
  }

  return String(value);
}

function PrimitiveValue({
  value,
  isLast,
}: {
  value: JsonPrimitive;
  isLast: boolean;
}) {
  let className = "json-value";

  if (typeof value === "string") {
    className += " json-string";
  } else if (typeof value === "number") {
    className += " json-number";
  } else if (typeof value === "boolean") {
    className += " json-boolean";
  } else {
    className += " json-null";
  }

  return (
    <span className={className}>
      {formatPrimitive(value)}
      {!isLast && <span className="json-comma">,</span>}
    </span>
  );
}

function JsonNode({
  name,
  value,
  isLast,
  level,
}: JsonNodeProps) {
  const [expanded, setExpanded] = useState(true);

  const objectValue = isObject(value);
  const arrayValue = isArray(value);
  const complexValue = objectValue || arrayValue;

  if (!complexValue) {
    return (
      <div
        className="json-tree-row"
        style={{ paddingLeft: `${level * 20} px` }}
      >
        {name !== undefined && (
          <>
            <span className="json-key">
              "{name}"
            </span>

            <span className="json-colon">:</span>
          </>
        )}

        <PrimitiveValue
          value={value}
          isLast={isLast}
        />
      </div>
    );
  }

  const entries = objectValue
    ? Object.entries(value)
    : value.map((item, index) => [String(index), item] as const);

  const openingBracket = objectValue ? "{" : "[";
  const closingBracket = objectValue ? "}" : "]";

  return (
    <div className="json-tree-node">
      <div
        className="json-tree-row json-tree-parent"
        style={{ paddingLeft: `${level * 20} px` }}
      >
        <button
          type="button"
          className="json-expand-button"
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? "Collapse" : "Expand"}
          aria-expanded={expanded}
        >
          {expanded ? "−" : "+"}
        </button>

        {name !== undefined && (
          <>
            <span className="json-key">
              "{name}"
            </span>

            <span className="json-colon">:</span>
          </>
        )}

        <span className="json-bracket">
          {openingBracket}
        </span>
      </div>

      {expanded && entries.length > 0 && (
        <div className="json-tree-children">
          {entries.map(([key, childValue], index) => (
            <JsonNode
              key={`${key} -${index} `}
              name={objectValue ? key : undefined}
              value={childValue}
              isLast={index === entries.length - 1}
              level={level + 1}
            />
          ))}
        </div>
      )}

      <div
        className="json-tree-row json-tree-closing"
        style={{ paddingLeft: `${level * 20} px` }}
      >
        {expanded && entries.length > 0 && (
          <span className="json-closing-indent" />
        )}

        {!expanded && (
          <span className="json-expand-placeholder" />
        )}

        <span className="json-bracket">
          {closingBracket}
        </span>

        {!isLast && (
          <span className="json-comma">,</span>
        )}
      </div>
    </div>
  );
}

export default function JsonTree({
  value,
  name,
  isLast = true,
  level = 0,
}: JsonTreeProps) {
  return (
    <div className="json-tree">
      <JsonNode
        name={name}
        value={value}
        isLast={isLast}
        level={level}
      />
    </div>
  );
}