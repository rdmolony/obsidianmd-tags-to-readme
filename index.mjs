import { open } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import * as core from '@actions/core';
import * as path from 'path';


async function findMarkdownFiles(dir) {
  const files = await readdir(dir);
  console.log(dir)
  return files.filter(function isMarkdown(file) {
    return path.extname(file) === ".md"
  });
}

async function run() {
  try {
    const cwd = path.resolve();
    if (core.getInput('dirpath') == null) {
      // default to the current working directory
      const dirpath = cwd;
      const markdownFiles = await findMarkdownFiles(dirpath);
      console.log(markdownFiles)
    } else {
      const dirpath = path.join(cwd, core.getInput('dirpath'));
      const markdownFiles = await findMarkdownFiles(dirpath);
      console.log(markdownFiles)
    }
  } catch (err) {
    console.error(err);
  }
}

run();
