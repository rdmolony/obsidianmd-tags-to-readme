import { open } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import * as path from 'path';


async function logFiles(dirpath) {
  const markdownFiles = await readdir(dirpath);
    markdownFiles.map(function log(file) {
      if ( path.extname(file) === ".md" ) {
        console.log(file);
      }
    });
}

async function run() {
  try {
    const cwd = path.resolve();
    logFiles(cwd);
  } catch (err) {
    console.error(err);
  }
}

run();
