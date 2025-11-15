function toTitleCaseKeepRomanAndRtRw(text) {
  if (!text) return text;
  let s = text.trim();

  s = s.replace(/\b[rR][tT]\.?,?\s*0*([0-9]+)\b/g, (m, p1) => `RT. ${String(p1).padStart(2,'0')}`);
  s = s.replace(/\b[rR][wW]\.?,?\s*0*([0-9]+)\b/g, (m, p1) => `RW. ${String(p1).padStart(2,'0')}`);

  s = s.split(/\s+/).map(token => {
    if (/^[ivxlcdm]+$/i.test(token)) return token.toUpperCase();
    if (/^(RT\.|RW\.)$/i.test(token)) return token.toUpperCase();
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  }).join(' ');

  return s;
}

export function formatNameAllCaps(name) {
  return (name || '').toUpperCase();
}

export function formatGeneralField(value) {
  return toTitleCaseKeepRomanAndRtRw(value);
}
