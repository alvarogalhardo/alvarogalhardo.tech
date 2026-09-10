import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// A CSP vive só no `public/_headers` (a edge do Workers aplica). Nada mais lê esse
// arquivo, então este teste é a rede de segurança contra afrouxar sem querer.
const headers = readFileSync(
  fileURLToPath(new URL('../../public/_headers', import.meta.url)),
  'utf8'
);

const cspLine = headers
  .split('\n')
  .map((l) => l.trim())
  .find((l) => l.startsWith('Content-Security-Policy:'));

const directives = new Map<string, string[]>(
  (cspLine ?? '')
    .replace(/^Content-Security-Policy:\s*/, '')
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const [name, ...values] = d.split(/\s+/);
      return [name, values];
    })
);

describe('CSP do public/_headers', () => {
  it('tem uma linha Content-Security-Policy', () => {
    expect(cspLine).toBeDefined();
  });

  it('libera o beacon do Cloudflare Web Analytics (RUM / Core Web Vitals)', () => {
    // script: https://static.cloudflareinsights.com/beacon.min.js/…
    // POST de telemetria: https://cloudflareinsights.com/cdn-cgi/rum
    expect(directives.get('script-src')).toContain('https://static.cloudflareinsights.com');
    expect(directives.get('connect-src')).toContain('https://cloudflareinsights.com');
  });

  it('connect-src ainda cobre a própria origem', () => {
    expect(directives.get('connect-src')).toContain("'self'");
  });

  it('mantém as diretivas rígidas', () => {
    expect(directives.get('default-src')).toEqual(["'self'"]);
    expect(directives.get('base-uri')).toEqual(["'none'"]);
    expect(directives.get('frame-ancestors')).toEqual(["'none'"]);
    expect(directives.get('form-action')).toEqual(["'none'"]);
  });

  it('font-src não aceita data: — a fonte inline é resolvida no build, não na CSP', () => {
    expect(directives.get('font-src')).toEqual(["'self'"]);
  });
});
