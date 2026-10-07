"use client";

import {
  ChangeEvent,
  DragEvent,
  useMemo,
  useState,
} from "react";

import {
  Check,
  Copy,
  Download,
  FileJson,
  Trash2,
  Upload,
} from "lucide-react";

import {
  formatJson,
  minifyJson,
  validateJson,
} from "@/lib/json";

import JsonTree from "@/components/common/JsonTree";

const SAMPLE_JSON = `{
  "name": "CodePrepTools",
  "version": "1.0.0",
  "description": "Free developer tools",
  "technologies": [
    "Next.js",
    "React",
    "TypeScript"
  ],
  "active": true
}`;

type Action = "format" | "minify" | "validate";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [filename, setFilename] =
    useState("formatted.json");

  const [error, setError] = useState<{
    message: string;
    line?: number;
    column?: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("");

  const inputStats = useMemo(
    () => ({
      characters: input.length,
      lines: input ? input.split("\n").length : 0,
    }),
    [input]
  );

  const outputStats = useMemo(
    () => ({
      characters: output.length,
      lines: output ? output.split("\n").length : 0,
    }),
    [output]
  );

  function processJson(action: Action) {
    setError(null);
    setCopied(false);
    setStatus("");

    const result =
      action === "format"
        ? formatJson(input, indentSize, sortKeys)
        : action === "minify"
          ? minifyJson(input, sortKeys)
          : validateJson(input);

    if (result.success) {
      setOutput(result.value as string);

      setStatus(
        action === "validate"
          ? "JSON is valid."
          : action === "format"
            ? "JSON formatted successfully."
            : "JSON minified successfully."
      );
    } else {
      setOutput("");
      setError(result.error);
    }
  }

  function loadSample() {
    setInput(SAMPLE_JSON);
    setOutput("");
    setError(null);
    setStatus("Example JSON loaded.");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError(null);
    setStatus("Editor cleared.");
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);
      setStatus("Formatted JSON copied to clipboard.");

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError({
        message:
          "Unable to copy automatically. Please copy the output manually.",
      });
    }
  }

  function downloadOutput() {
    if (!output) {
      return;
    }

    const safeFilename =
      filename.trim() || "formatted.json";

    const finalFilename = safeFilename.endsWith(".json")
      ? safeFilename
      : `${safeFilename}.json`;

    const blob = new Blob([output], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = finalFilename;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    setStatus(
      `Downloaded ${finalFilename}.`
    );
  }

  function handleFile(
    file: File | undefined
  ) {
    if (!file) {
      return;
    }

    if (
      file.type !== "application/json" &&
      !file.name.toLowerCase().endsWith(".json")
    ) {
      setError({
        message: "Please select a valid .json file.",
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const content = String(reader.result ?? "");

      setInput(content);
      setOutput("");
      setError(null);

      setFilename(
        file.name.replace(/\.json$/i, "-formatted.json")
      );

      setStatus(
        `${file.name} loaded successfully.`
      );
    };

    reader.onerror = () => {
      setError({
        message: "Unable to read the selected file.",
      });
    };

    reader.readAsText(file);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDragOver(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragging(false);

    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="json-tool">
      <div className="json-toolbar">
        <div className="toolbar-left">
          <label className="file-button">
            <Upload size={16} />

            Upload JSON

            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              hidden
            />
          </label>

          <button
            type="button"
            className="secondary-button"
            onClick={loadSample}
          >
            Load Example
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={clearAll}
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>

        <div className="toolbar-options">
          <label>
            Indent

            <select
              value={indentSize}
              onChange={(event) =>
                setIndentSize(
                  Number(event.target.value)
                )
              }
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(event) =>
                setSortKeys(event.target.checked)
              }
            />

            Sort keys
          </label>
        </div>
      </div>

      <div
        className={`json-editor-grid ${dragging ? "is-dragging" : ""
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Input JSON</h2>

              <span>
                {inputStats.characters.toLocaleString()} characters
                {" · "}
                {inputStats.lines} lines
              </span>
            </div>

            <FileJson size={20} />
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError(null);
              setStatus("");
            }}
            placeholder={`Paste your JSON here...

Example:
{
  "name": "John",
  "age": 30
}`}
            spellCheck={false}
            className="json-textarea"
            aria-label="JSON input"
          />

          <div className="action-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={() =>
                processJson("format")
              }
            >
              Format JSON
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                processJson("minify")
              }
            >
              Minify
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                processJson("validate")
              }
            >
              Validate
            </button>
          </div>

          <div className="drop-hint">
            Drag and drop a <strong>.json</strong> file here
            or use Upload JSON.
          </div>
        </div>

        <div className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Output</h2>

              <span>
                {outputStats.characters.toLocaleString()} characters
                {" · "}
                {outputStats.lines} lines
              </span>
            </div>

            <div className="output-actions">
              <button
                type="button"
                className="small-button"
                onClick={copyOutput}
                disabled={!output}
              >
                {copied ? (
                  <Check size={15} />
                ) : (
                  <Copy size={15} />
                )}

                {copied ? "Copied" : "Copy"}
              </button>

              <button
                type="button"
                className="small-button"
                onClick={downloadOutput}
                disabled={!output}
              >
                <Download size={15} />
                Download
              </button>
            </div>
          </div>

          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here."
            spellCheck={false}
            className="json-textarea output-textarea"
            aria-label="Formatted JSON output"
          />

          <div className="filename-control">
            <label htmlFor="filename">
              Download filename
            </label>

            <input
              id="filename"
              value={filename}
              onChange={(event) =>
                setFilename(event.target.value)
              }
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="json-error" role="alert">
          <strong>Invalid JSON</strong>

          <span>{error.message}</span>

          {error.line && (
            <span>
              Line {error.line}
              {error.column
                ? `, Column ${error.column}`
                : ""}
            </span>
          )}
        </div>
      )}

      <div
        className="sr-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </div>

      {output && (
        <div className="tree-panel">
          <h2>JSON Tree</h2>

          <JsonTree
            value={JSON.parse(output)}
          />
        </div>
      )}

      <div className="privacy-note">
        <strong>Privacy:</strong> JSON processing happens
        entirely in your browser. Your JSON is not sent to
        our server.
      </div>
    </section>
  );
}