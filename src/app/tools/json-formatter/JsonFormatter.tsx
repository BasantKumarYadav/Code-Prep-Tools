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

type JsonError = {
  message: string;
  line?: number;
  column?: number;
};

function tryParseJson(value: string): unknown | null {
  if (!value.trim()) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const [filename, setFilename] =
    useState("formatted.json");

  const [error, setError] =
    useState<JsonError | null>(null);

  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("");

  /*
   * Safely parse the output.

   * This is important because output can be empty or,
   * in case of an unexpected state, contain non-JSON text.
   *
   * JSON.parse() is therefore NEVER called directly
   * inside JSX.
   */
  const parsedOutput = useMemo(
    () => tryParseJson(output),
    [output]
  );

  const inputStats = useMemo(
    () => ({
      characters: input.length,
      lines: input
        ? input.split("\n").length
        : 0,
    }),
    [input]
  );

  const outputStats = useMemo(
    () => ({
      characters: output.length,
      lines: output
        ? output.split("\n").length
        : 0,
    }),
    [output]
  );

  function processJson(action: Action) {
    setError(null);
    setCopied(false);
    setStatus("");

    /*
     * Do not process empty input.
     */
    if (!input.trim()) {
      setOutput("");

      setError({
        message: "Please enter some JSON to process.",
      });

      return;
    }

    const result =
      action === "format"
        ? formatJson(
            input,
            indentSize,
            sortKeys
          )
        : action === "minify"
          ? minifyJson(
              input,
              sortKeys
            )
          : validateJson(input);

    if (result.success) {
      /*
       * IMPORTANT:
       *
       * For format/minify:
       * result.value is the JSON string.
       *
       * For validate:
       * we DO NOT put "Valid JSON" into output.
       *
       * This prevents JSON.parse("Valid JSON")
       * from causing a runtime error.
       */
      if (action === "validate") {
        setStatus("JSON is valid.");

        /*
         * Keep existing formatted output if there is one.
         * Otherwise, create a formatted version so the
         * JSON Tree can still be displayed.
         */
        const formattedResult = formatJson(
          input,
          indentSize,
          sortKeys
        );

        if (formattedResult.success) {
          setOutput(formattedResult.value as string);
        } else {
          setOutput(input);
        }

        return;
      }

      setOutput(result.value as string);

      setStatus(
        action === "format"
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
    setCopied(false);
    setStatus("Example JSON loaded.");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
    setStatus("Editor cleared.");
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);
      setStatus(
        "JSON copied to clipboard."
      );

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

    const finalFilename =
      safeFilename.toLowerCase().endsWith(".json")
        ? safeFilename
        : `${safeFilename}.json`;

    const blob = new Blob(
      [output],
      {
        type: "application/json;charset=utf-8",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

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

    const isJsonFile =
      file.type === "application/json" ||
      file.name
        .toLowerCase()
        .endsWith(".json");

    if (!isJsonFile) {
      setError({
        message:
          "Please select a valid .json file.",
      });

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const content =
        String(reader.result ?? "");

      setInput(content);
      setOutput("");
      setError(null);
      setCopied(false);

      setFilename(
        file.name.replace(
          /\.json$/i,
          "-formatted.json"
        )
      );

      setStatus(
        `${file.name} loaded successfully.`
      );
    };

    reader.onerror = () => {
      setError({
        message:
          "Unable to read the selected file.",
      });
    };

    reader.readAsText(file);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    handleFile(
      event.target.files?.[0]
    );

    /*
     * Allows the user to select the same
     * file again after selecting it once.
     */
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

    handleFile(
      event.dataTransfer.files?.[0]
    );
  }

  return (
    <section className="json-tool">
      {/* Toolbar */}
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
                  Number(
                    event.target.value
                  )
                )
              }
            >
              <option value={2}>
                2 spaces
              </option>

              <option value={4}>
                4 spaces
              </option>

              <option value={8}>
                8 spaces
              </option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(event) =>
                setSortKeys(
                  event.target.checked
                )
              }
            />

            Sort keys
          </label>
        </div>
      </div>

      {/* Editor */}
      <div
        className={`json-editor-grid ${
          dragging
            ? "is-dragging"
            : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Input */}
        <div className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Input JSON</h2>

              <span>
                {inputStats.characters.toLocaleString()}
                {" characters"}
                {" · "}
                {inputStats.lines}
                {" lines"}
              </span>
            </div>

            <FileJson size={20} />
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(
                event.target.value
              );

              setError(null);
              setStatus("");
              setCopied(false);
            }}
            placeholder={`Paste your JSON here...
            Example:
            {
              "name": "John",
              "age": 30
            }`}
            spellCheck={false}
            className="json-textarea textSize"
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
            Drag and drop a{" "}
            <strong>.json</strong>{" "}
            file here or use Upload JSON.
          </div>
        </div>

        {/* Output */}
        <div className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Output</h2>

              <span>
                {outputStats.characters.toLocaleString()}
                {" characters"}
                {" · "}
                {outputStats.lines}
                {" lines"}
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

                {copied
                  ? "Copied"
                  : "Copy"}
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
            className="json-textarea output-textarea textSize"
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
                setFilename(
                  event.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="json-error"
          role="alert"
        >
          <strong>
            Invalid JSON
          </strong>

          <span>
            {error.message}
          </span>

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

      {/* Screen-reader status */}
      <div
        className="sr-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </div>

      {/* JSON Tree */}
      {output &&
        parsedOutput !== null && (
          <div className="tree-panel">
            <h2>JSON Tree</h2>

            <JsonTree
              value={parsedOutput}
            />
          </div>
        )}

      {/* Privacy */}
      <div className="privacy-note">
        <strong>
          Privacy:
        </strong>{" "}
        JSON processing happens
        entirely in your browser.
        Your JSON is not sent to
        our server.
      </div>
    </section>
  );
}