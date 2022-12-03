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

async function findTags(file) {
  const re = new RegExp('#[A-Za-z0-9\-]*');
  let filehandle;
  try {
    filehandle = await open(file, 'r');
    let tags = filehandle.readlines().filter(function extractTag(line) {
      console.log(line)
      return re.match(line)
    })
    console.log(tags)
    return tags
  } finally {
    await filehandle?.close();
  }
}

async function run() {
  try {
    const cwd = path.resolve();
    if (core.getInput('dirpath') == null) {
      // default to the current working directory
      let dirpath = cwd;
      let markdownFiles = await findMarkdownFiles(dirpath);
      // TODO
    } else {
      let dirpath = path.join(cwd, core.getInput('dirpath'));
      let markdownFiles = await findMarkdownFiles(dirpath);
      let tags = markdownFiles.map(findTags)
    }
  } catch (err) {
    console.error(err);
  }
}

run();
