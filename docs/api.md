# API Documentation (singkat)

## Endpoints
- POST /api/auth/login
- POST /api/auth/register
- POST /api/parse-nik
- POST /api/letters         # create letter (JSON)
- GET  /api/letters/:id
- POST /api/letters/:id/generate-pdf
- POST /api/letters/:id/share

Payload untuk POST /api/parse-nik:
{ "nik": "3203015101010001" }

Letter example payload:
{
  "type": "tt_catin",
  "date": "2025-10-15",
  "data": { ... fields ... }
}
