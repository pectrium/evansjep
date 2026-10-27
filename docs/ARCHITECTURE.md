# Evans Jep architecture

Dependency-free Node static generator in ejepsystems/evansjep. Public content lives in src/content.mjs, src/projects.mjs and src/articles.mjs; scripts/build.mjs supplies the shared page shell and explicit asset allowlist.

Primary navigation: About disclosure, Pectrium, Insights, Focus, Contact. Pectrium retains /ventures, with its company profile at /work/pectrium. About routes remain /about, /about/purpose and /about/approach; Biography & Media remains /media. Nine original essays are generated beneath /writing. Total: 20 HTML pages, including 404.

Pectrium is the only company showcased. Evans Jep’s CEO role and Pectrium positioning are supplied by the user. Earlier company/project pages are no longer generated; legacy paths redirect to /work/pectrium. Earlier case-study copy is retained only in the private editorial archive. This website does not establish legal transfers or corporate ownership of other ventures.

The homepage remains a minimal personal photographic opening with Explore Pectrium and Biography. Editorial serif content and compact system-font navigation sit on a neutral black default with an optional light appearance. The full monochrome About portrait retains its white canvas, desktop text placement and visible watermark.

No company symbol has been invented: Pectrium uses a plain text company name pending an approved identity asset. No unconfirmed company website destination is rendered.

editorial/, identity/, credentials and private archives are excluded from public commits and generated output. Noindex and existing Vercel Authentication are retained. Production releases are explicitly authorized in the current conversation; do not merge to main or change protection settings without authorization.

Validation records distinguish static checks, DOM-model interactions, authenticated HTTP and actual local browser inspection. See the private editorial/VALIDATION.md for current limitations.
