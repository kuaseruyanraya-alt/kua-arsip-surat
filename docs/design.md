# Design Notes

- Use Postgres with a `letters` table storing JSONB for flexible forms.
- Validate NIK client-side for autofill; server should still validate.
- PDF templates are EJS files under backend/src/templates.
- Frontend formats names and addresses using utils/format.js rules.
