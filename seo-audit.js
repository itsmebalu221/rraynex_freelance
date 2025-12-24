// Script to run Lighthouse SEO audits on all HTML files in build/snapshots/ and public/
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'seo-reports');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

function getHtmlFiles(dirs) {
  let files = [];
  dirs.forEach(dir => {
    const pattern1 = path.join(dir, '*.html');
    const pattern2 = dir + '/*.html';
    console.log(`Searching for HTML files with: ${pattern1}`);
    files = files.concat(glob.sync(pattern1));
    if (files.length === 0) {
      console.log(`No files found with pattern1, trying: ${pattern2}`);
      files = files.concat(glob.sync(pattern2));
    }
  });
  console.log('Files found:', files);
  return files;
}

async function runLighthouse(filePath) {
  const url = 'file://' + path.resolve(filePath);
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['seo'], port: chrome.port};
  const runnerResult = await lighthouse(url, options);
  const reportHtml = runnerResult.report;
  const fileName = path.basename(filePath).replace('.html', '') + '-seo-report.html';
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), reportHtml);
  await chrome.kill();
  return runnerResult.lhr.categories.seo.score * 100;
}

async function main() {
  const snapshotsDir = path.join(__dirname, 'build', 'snapshots');
  const publicDir = path.join(__dirname, 'public');
  console.log('Snapshots dir:', snapshotsDir);
  console.log('Public dir:', publicDir);
  const htmlFiles = getHtmlFiles([
    snapshotsDir,
    publicDir
  ]);
  console.log(`Found ${htmlFiles.length} HTML files.`);
  for (const file of htmlFiles) {
    console.log(`Auditing ${file}...`);
    try {
      const score = await runLighthouse(file);
      console.log(`SEO Score for ${file}: ${score}`);
    } catch (e) {
      console.error(`Failed to audit ${file}:`, e.message);
    }
  }
  console.log('SEO audit complete. Reports saved in seo-reports/.');
}

main();
