const LINE_SEPARATOR = new RegExp('\\u2028', 'g');
const PARAGRAPH_SEPARATOR = new RegExp('\\u2029', 'g');

export function ldJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEPARATOR, '\\u2028')
    .replace(PARAGRAPH_SEPARATOR, '\\u2029');
}
