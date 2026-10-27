# Evans Jep — copy-deck implementation

Existing project: ejepsystems/evansjep. Dependency-free Node static generator.

## Work locally

Run npm run build and npm test from this directory. Output: dist/. The generated site has 20 HTML pages, with clean routes on Vercel. No editorial directory is copied to the output.

## Source

- src/content.mjs: public-facing content selected from the supplied copy deck and previously confirmed venture descriptions/contact accounts.
- scripts/build.mjs: shared shell, pages and explicit asset allowlist.
- src/styles.css: consolidated mobile-first neutral editorial design, light/dark appearance.
- src/site.js: navigation disclosure, keyboard handling, focus loop and appearance.
- scripts/check.mjs: route, asset, fragment and content boundary verification.
- scripts/check-navigation.cjs: interaction tests against a DOM model, not a rendered browser.
- editorial/: local private copy deck, review record and legacy drafts. Never push this directory to the public repository or include it in website deployment.

## Release boundary

Use the existing review/evans-jep-final-identity branch and preserve unrelated work. Current conversation authorizes production updates; do not merge to main or weaken Vercel Authentication. Keep noindex settings. Only explicitly selected public source/assets belong in GitHub commits; editorial/, private archives and credentials remain local and excluded from generated output.

## Validation

See editorial/VALIDATION.md and editorial/CONTENT_REVIEW.md in the private review package. Record actual viewport coverage; do not describe HTTP or DOM-model tests as rendered browser certification.
