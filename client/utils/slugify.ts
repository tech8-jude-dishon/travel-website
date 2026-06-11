/**
 * Convert a string into a URL-friendly slug.
 * e.g. "Golden Triangle Tour!" -> "golden-triangle-tour"
 */
export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
