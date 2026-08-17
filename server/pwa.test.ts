import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("PWA offline contract", () => {
  it("exposes installable manifest and iPhone metadata", () => {
    const manifest = JSON.parse(readFileSync(resolve(process.cwd(), "client/public/manifest.json"), "utf8"));
    const html = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons[0].src).toBe("/apple-touch-icon.png");
    expect(html).toContain('rel="manifest" href="/manifest.json"');
    expect(html).toContain('name="apple-mobile-web-app-capable" content="yes"');
    expect(html).toContain('rel="apple-touch-icon" href="/apple-touch-icon.png"');
  });

  it("has a cache-first service worker with an offline app-shell fallback", () => {
    const serviceWorker = readFileSync(resolve(process.cwd(), "client/public/sw.js"), "utf8");
    expect(serviceWorker).toContain('self.addEventListener("install"');
    expect(serviceWorker).toContain('cache.addAll(APP_SHELL)');
    expect(serviceWorker).toContain('self.addEventListener("fetch"');
    expect(serviceWorker).toContain('caches.match(event.request)');
    expect(serviceWorker).toContain('caches.match("/")');
  });
});
