#!/usr/bin/env node
// Structure check for the v2 textbook. Exit 1 when any rule fails.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { assembleBook, fullUnitIds } from '../src/content-loader/assemble.js';
import { validateBook, checkCssFontSizes } from '../src/content-loader/validate.js';
import { activityTemplateRule } from '../src/content-loader/rules.js';

const ROOT = process.cwd();

function walk(dir, pattern) {
  let out = [];
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out = out.concat(walk(path, pattern));
    else if (pattern.test(name)) out.push(path);
  }
  return out;
}

const files = Object.fromEntries(walk(join(ROOT, 'content'), /\.(ya?ml|md)$/).map((path) => [relative(ROOT, path), readFileSync(path, 'utf8')]));
const book = assembleBook(files);
const FULL_UNITS = fullUnitIds(book);
const errors = validateBook(book, book, { fullUnits: FULL_UNITS, extraRules: [activityTemplateRule] });
for (const cssPath of walk(join(ROOT, 'src/book'), /\.css$/)) {
  for (const message of checkCssFontSizes(readFileSync(cssPath, 'utf8'))) errors.push(`${relative(ROOT, cssPath)}: ${message}`);
}

if (errors.length) {
  console.error(`check:book — ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`check:book — ok (${FULL_UNITS.join(', ')} full; ${book.units.length} unit file(s))`);
