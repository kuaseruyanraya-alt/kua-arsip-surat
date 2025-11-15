function parseNIK(nik) {
  const cleaned = (nik || '').replace(/\D/g, '');
  if (cleaned.length < 12) return null;

  const dd = parseInt(cleaned.slice(6, 8), 10);
  const mm = parseInt(cleaned.slice(8, 10), 10);
  const yy = parseInt(cleaned.slice(10, 12), 10);

  if (isNaN(dd) || isNaN(mm) || isNaN(yy)) return null;

  let gender = 'Laki-laki';
  let day = dd;
  if (dd > 40) {
    gender = 'Perempuan';
    day = dd - 40;
  }

  const currentYear = new Date().getFullYear() % 100;
  const fullYear = yy > currentYear ? 1900 + yy : 2000 + yy;

  const dateStr = `${fullYear}-${String(mm).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return null;

  return {
    gender,
    dob: dateObj.toISOString().slice(0, 10),
    day,
    month: mm,
    year: fullYear
  };
}

module.exports = { parseNIK };
