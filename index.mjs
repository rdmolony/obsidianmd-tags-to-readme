import { open } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import * as path from 'path';


async function findMarkdownFiles(dirpath) {
  const files = await readdir(dirpath);
  return files.filter(function isMarkdown(file) {
    return path.extname(file) === ".md"
  });
}

async function run() {
  try {
    const cwd = path.resolve();
    const markdownFiles = await findMarkdownFiles(cwd);
  } catch (err) {
    console.error(err);
  }
}

run();
