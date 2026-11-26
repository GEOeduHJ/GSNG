import { assembleBook } from './assemble.js';

const files = import.meta.glob('/content/**/*.{yaml,md}', { query: '?raw', import: 'default', eager: true });

let cached;

/** Browser entry: the whole book assembled from /content at build time. */
export function getBook() {
  if (!cached) cached = assembleBook(files);
  return cached;
}
