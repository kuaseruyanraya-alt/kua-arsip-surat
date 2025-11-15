import React, { useState } from 'react';
import axios from 'axios';
import { parseNIK as parseNIKRemote } from '../utils/nik';
import { formatNameAllCaps, formatGeneralField } from '../utils/format';

export default function FormSuratTtCatin() {
  const [form, setForm] = useState({
    nomor: '',
    tanggal_surat: '',
    tanggal_akad: '',
    nik_laki: '',
    nama_laki: '',
    tempat_lahir_laki: '',
    tanggal_lahir_laki: '',
    alamat_laki: '',
    nik_perempuan: '',
    nama_perempuan: '',
    tempat_lahir_perempuan: '',
    tanggal_lahir_perempuan: '',
    alamat_perempuan: ''
  });

  const handleNikBlur = async (field) => {
    const nik = form[field];
    if (!nik) return;
    // try local parse util (bundled) first
    try {
      const parsed = parseNIKRemote(nik);
      if (parsed) {
        const dateField = field === 'nik_laki' ? 'tanggal_lahir_laki' : 'tanggal_lahir_perempuan';
        setForm(f => ({ ...f, [dateField]: parsed.dob }));
      }
    } catch (e) {
      // ignore
    }
  };

  const handleChange = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const handleSubmit = async () => {
    // format fields
    const payload = {
      type: 'tt_catin',
      date: form.tanggal_surat,
      data: {
        ...form,
        nama_laki: formatNameAllCaps(form.nama_laki),
        nama_perempuan: formatNameAllCaps(form.nama_perempuan),
        alamat_laki: formatGeneralField(form.alamat_laki),
        alamat_perempuan: formatGeneralField(form.alamat_perempuan)
      }
    };
    const res = await axios.post('/api/letters', payload).catch(err => { alert('Error'); });
    if (res && res.data) {
      alert('Tersimpan. ID: ' + res.data.id);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>Form Surat TT Catin</h2>
      <label>Nomor Surat<input value={form.nomor} onChange={handleChange('nomor')} /></label><br/>
      <label>Tanggal Surat<input type="date" value={form.tanggal_surat} onChange={handleChange('tanggal_surat')} /></label><br/>
      <label>Tanggal Akad<input type="date" value={form.tanggal_akad} onChange={handleChange('tanggal_akad')} /></label><br/>
      <hr/>
      <h3>Data Laki-laki</h3>
      <label>NIK<input value={form.nik_laki} onBlur={() => handleNikBlur('nik_laki')} onChange={handleChange('nik_laki')} /></label><br/>
      <label>Nama<input value={form.nama_laki} onChange={handleChange('nama_laki')} /></label><br/>
      <label>Tempat Lahir<input value={form.tempat_lahir_laki} onChange={handleChange('tempat_lahir_laki')} /></label><br/>
      <label>Tanggal Lahir<input type="date" value={form.tanggal_lahir_laki} onChange={handleChange('tanggal_lahir_laki')} /></label><br/>
      <label>Alamat<input value={form.alamat_laki} onChange={handleChange('alamat_laki')} /></label><br/>
      <hr/>
      <h3>Data Perempuan</h3>
      <label>NIK<input value={form.nik_perempuan} onBlur={() => handleNikBlur('nik_perempuan')} onChange={handleChange('nik_perempuan')} /></label><br/>
      <label>Nama<input value={form.nama_perempuan} onChange={handleChange('nama_perempuan')} /></label><br/>
      <label>Tempat Lahir<input value={form.tempat_lahir_perempuan} onChange={handleChange('tempat_lahir_perempuan')} /></label><br/>
      <label>Tanggal Lahir<input type="date" value={form.tanggal_lahir_perempuan} onChange={handleChange('tanggal_lahir_perempuan')} /></label><br/>
      <label>Alamat<input value={form.alamat_perempuan} onChange={handleChange('alamat_perempuan')} /></label><br/>
      <button onClick={handleSubmit}>Simpan</button>
    </div>
  );
}
