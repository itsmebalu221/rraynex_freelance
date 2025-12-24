const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "https://www.rraynex.com";

// HARD sanitize urls.txt (Windows-safe)
const urls = fs
  .readFileSync("urls.txt", "utf8")
  .split(/\r?\n/)              // handle CRLF + LF
  .map(u => u.trim())          // remove \r and spaces
  .filter(u => u.startsWith("http")); // drop junk lines

// Ensure snapshots directory exists
const SNAP_DIR = path.join(__dirname, "/build/snapshots");
if (!fs.existsSync(SNAP_DIR)) {
  fs.mkdirSync(SNAP_DIR, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  for (const url of urls) {
    console.log("Rendering:", url);

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const html = await page.content();

    let slug;
    if (url === BASE || url === BASE + "/") {
      slug = "home";
    } else {
      slug = url
        .replace(BASE, "")
        .replace(/^\/+/, "")
        .replace(/\/+/g, "__");
    }

    const filePath = path.join(SNAP_DIR, `${slug}.html`);
    fs.writeFileSync(filePath, html, "utf8");

    console.log("Saved:", filePath);
  }

  await browser.close();
})();
