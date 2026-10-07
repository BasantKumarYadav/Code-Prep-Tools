export interface JsonError {
  message: string;
  line?: number;
  column?: number;
}

export type JsonFormatResult =
  | {
    success: true;
    value: string;
  }
  | {
    success: false;
    error: JsonError;
  };

export function parseJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: {
        message: "Please enter JSON.",
      },
    };
  }

  try {
    const parsed = JSON.parse(input);

    return {
      success: true,
      value: parsed,
    };
  } catch (error) {
    return {
      success: false,
      error: getJsonError(error, input),
    };
  }
}

export function formatJson(
  input: string,
  indentSize: number,
  sortKeys = false
): JsonFormatResult {
  const result = parseJson(input);

  if (!result.success) {
    return result;
  }

  const value = sortKeys
    ? sortJsonKeys(result.value)
    : result.value;

  return {
    success: true,
    value: JSON.stringify(value, null, indentSize),
  };
}

export function minifyJson(
  input: string,
  sortKeys = false
): JsonFormatResult {
  const result = parseJson(input);

  if (!result.success) {
    return result;
  }

  const value = sortKeys
    ? sortJsonKeys(result.value)
    : result.value;

  return {
    success: true,
    value: JSON.stringify(value),
  };
}

export function validateJson(input: string): JsonFormatResult {
  const result = parseJson(input);

  if (!result.success) {
    return result;
  }

  return {
    success: true,
    value: "Valid JSON",
  };
}

function sortJsonKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const object = value as Record<string, unknown>;

    return Object.keys(object)
      .sort((a, b) => a.localeCompare(b))
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = sortJsonKeys(object[key]);
        return result;
      }, {});
  }

  return value;
}

function getJsonError(
  error: unknown,
  input: string
): JsonError {
  if (!(error instanceof SyntaxError)) {
    return {
      message: "Unable to parse JSON.",
    };
  }

  const message = error.message;

  const positionMatch = message.match(
    /position\s+(\d+)/i
  );

  if (!positionMatch) {
    return {
      message,
    };
  }

  const position = Number(positionMatch[1]);

  const beforeError = input.slice(0, position);

  const line = beforeError.split("\n").length;

  const lastNewLine = beforeError.lastIndexOf("\n");

  const column =
    position -
    (lastNewLine === -1 ? -1 : lastNewLine);

  return {
    message,
    line,
    column,
  };
}