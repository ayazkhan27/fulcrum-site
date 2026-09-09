// Read-only public reference inventory. Does not copy media or submit forms.
import { mkdir, writeFile } from "node:fs/promises"

const base = "https://www.flyhyer.com"
const clean = (s = "") =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const urls = [
  ...new Set([
    ...[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]),
    ...["/stays", "/travel", "/ownership", "/page/cookies"].map(
      (p) => base + p
    ),
  ]),
]
const pages = []
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(
    urls.slice(i, i + 4).map(async (url) => {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) })
      const html = await response.text()
      const attributes = (name) =>
        [...html.matchAll(new RegExp(`${name}="([^"]+)"`, "g"))].map((m) =>
          m[1].replaceAll("&amp;", "&")
        )
      pages.push({
        path: new URL(url).pathname,
        status: response.status,
        destination: response.url,
        title: clean(html.match(/<title>(.*?)<\/title>/s)?.[1]),
        headings: [...html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gs)].map(
          (m) => ({ level: Number(m[1]), text: clean(m[2]) })
        ),
        links: [...new Set(attributes("href"))].filter(
          (x) => !x.startsWith("data:")
        ),
        imageAlt: [...html.matchAll(/<img\b[^>]*alt="([^"]*)"[^>]*>/g)].map(
          (m) => m[1]
        ),
        assets: [
          ...new Set([...attributes("src"), ...attributes("srcset")]),
        ].filter((x) => !x.startsWith("data:")),
        soft404: /<h1[^>]*>Error 404<\/h1>/.test(html),
      })
    })
  )
}
pages.sort((a, b) => a.path.localeCompare(b.path))
await mkdir("research", { recursive: true })
await writeFile(
  "research/flyhyer-inventory.json",
  JSON.stringify(
    {
      inspectedAt: new Date().toISOString(),
      scope:
        "All sitemap URLs plus current navigation destinations. HTML asset references only; not an exhaustive crawl of third-party services, dynamically generated routes, or media binaries. No forms submitted.",
      pages,
    },
    null,
    2
  ) + "\n"
)
console.log(
  `Recorded ${pages.length} routes, ${pages.filter((p) => p.soft404).length} soft 404s. No media copied.`
)
