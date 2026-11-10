// Astro configuration for Uber Property Investments.
// Static site deployed on Netlify — see netlify.toml and docs/deployment.md.
// Docs: docs/architecture.md
//
// NOTE: the live site deploys from branch `agent-new-template-ba5e`, not
// from main. See docs/deployment.md before changing deploy settings.
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    // Canonical URL of the live site (the www form, matching the canonical
    // link tag in src/pages/index.astro). Used for absolute URLs Astro
    // generates. Change this if the domain changes.
    site: 'https://www.uberpropertyinvestments.com/',
    // No Vite plugins and no framework integrations: the site is a single
    // self-contained Astro page with its own <style> block
    // (src/pages/index.astro). Tailwind and React were part of the old
    // starter template and are not used anywhere — they were removed.
    integrations: [],
    // Netlify adapter with default (static) output. The site ships as static
    // HTML; the only server-side behaviour is Netlify Forms handling the
    // lead-form submission (no custom functions).
    adapter: netlify()
});
