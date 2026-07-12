# andreastojadinov.github.io

My personal cybersecurity portfolio and blog. Built from scratch with plain
HTML, CSS and a small amount of JavaScript, and deployed on GitHub Pages.

**Live site:** https://andreastojadinov.com

## About

I'm a Security Studies graduate transitioning into cybersecurity, focused on
blue team work: security monitoring, detection and incident response. This site
brings together who I am, what I'm learning, and writeups from my hands-on
practice as I work toward my first SOC L1 role.

## What's here

- **About** - my background and how I came into security
- **Skills** - the tools and areas I'm building experience in
- **Certifications & Learning** - completed Cisco and TryHackMe paths
- **Blog** - notes, lessons and writeups from my learning journey

## Built with

- HTML5 &amp; CSS3 (no frameworks)
- A small vanilla JavaScript scroll-spy for navigation
- Google Fonts (Chakra Petch, JetBrains Mono)
- GitHub Pages for hosting

No backend, no database, no third-party build tools — a deliberately minimal,
static site.

## Security

Security is treated as part of the project, not an afterthought. The site is
static by design to minimise attack surface, and it applies client-side
hardening such as a Content-Security-Policy and a strict referrer policy. The
reasoning behind each decision — including the honest limitations of what static
hosting can enforce — is documented in [SECURITY.md](SECURITY.md).

## Structure

```
.
├── index.html      # main page: about, skills, certifications, contact
├── blog.html       # blog index
├── posts/          # individual blog posts
├── images/         # images used in blog posts
├── style.css       # site-wide styles (cyberpunk / dark theme)
├── main.js         # scroll-spy navigation
└── SECURITY.md     # security decisions & posture
```

## Roadmap

- Custom domain
- Full HTTP security headers via a Cloudflare proxy
- More blog posts as I progress through my learning paths
