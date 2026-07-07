# Security Policy

This document describes the security posture of this portfolio site and the
deliberate decisions behind it. It doubles as a short case study: the site is a
cybersecurity portfolio, so its own security is part of the work.

## Architecture: minimal attack surface by design

The site is **fully static** (plain HTML, CSS and a small amount of JavaScript),
hosted on GitHub Pages. There is intentionally:

- **no backend / server-side code** — nothing on a server executes user input
- **no database** — no SQL injection surface
- **no authentication** — no login to bypass or brute-force
- **no contact form** — no user-supplied input is processed anywhere

This removes entire classes of common web vulnerabilities before they can exist.

## Client-side hardening

Because GitHub Pages does not allow custom HTTP response headers, the following
protections are applied via HTML `<meta>` tags, which browsers honour:

- **Content-Security-Policy (CSP)** — restricts which origins may load scripts,
  styles and fonts. Scripts are limited to same-origin (`script-src 'self'`),
  with no `'unsafe-inline'`. This is the primary defence against cross-site
  scripting (XSS): even if malicious markup were somehow injected, the browser
  would refuse to execute unauthorised scripts.
- **Referrer-Policy** (`strict-origin-when-cross-origin`) — limits the referrer
  information leaked to external sites when a visitor follows an outbound link.

To keep the CSP strict, all JavaScript lives in an external file (`main.js`)
rather than inline in the HTML, so `'unsafe-inline'` is never required.

## Outbound links

External links (LinkedIn, TryHackMe) use `rel="noopener noreferrer"` to prevent
reverse tabnabbing and to avoid leaking referrer data to the destination.

## Data minimisation

Only information relevant to employment is published. Personal data such as
phone number, home address and date of birth is deliberately omitted from the
public site to reduce exposure to spam harvesting, social engineering and
identity-based attacks. (Such details belong in a CV sent directly to a
specific employer, not on a page visible to the entire internet.)

## Known limitations & roadmap

Some protections can only be delivered as **real HTTP headers**, which GitHub
Pages cannot set. These are not yet active and are planned via a Cloudflare
proxy in front of the site:

- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options` / CSP `frame-ancestors` (clickjacking protection)
- `Permissions-Policy`

> Note: `frame-ancestors`, `X-Frame-Options` and `nosniff` are ignored when set
> via `<meta>` tags — they are only effective as response headers. This is a
> known constraint of static hosting, documented here for transparency rather
> than glossed over.

## Account security

The repository and deployment are protected by two-factor authentication (2FA)
on the GitHub account, since the integrity of a static site depends directly on
the integrity of the account that publishes it.

## Reporting a vulnerability

If you notice a security issue with this site, please reach out via
[LinkedIn](https://www.linkedin.com/in/andrea-stojadinov-2642943a7/).
Responsible disclosure is appreciated.