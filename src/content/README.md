# Content layer

Structured page content (services, FAQ entries, process steps) lives here
from **Phase 6** onward, as typed TypeScript modules consumed by pages and
passed down as props. No component imports content directly.

Division of responsibility:

- `src/i18n/messages/` — UI strings and short interface copy (labels,
  headings, actions), keyed per locale.
- `src/content/` — structured domain content with shape (a service has a
  slug, title, checklist, FAQ…), typed per entity.

Rules (see `docs/CONVENTIONS.md`):

- No lorem ipsum. Pending facts use visible `[BEKRÆFT: …]` markers.
- No invented testimonials, statistics, or client names — sections without
  real data are not rendered.
- English arrives as parallel modules when English content exists — the
  structure is not pre-created for a language that does not.