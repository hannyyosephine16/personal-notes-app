import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LocaleContext = createContext();

// Translation dictionaries
const indonesianText = {
  // Navigation
  home: 'Beranda',
  archives: 'Arsip',
  login: 'Masuk',
  register: 'Daftar',
  logout: 'Keluar',
  
  // Notes
  activeNotes: 'Catatan Aktif',
  archivedNotes: 'Catatan Terarsip',
  emptyNotesMessage: 'Tidak ada catatan. Buat catatan baru sekarang!',
  emptyArchiveMessage: 'Arsip kosong. Arsipkan beberapa catatan terlebih dahulu!',
  searchPlaceholder: 'Cari catatan berdasarkan judul...',
  addNote: 'Tambah Catatan Baru',
  titlePlaceholder: 'Judul catatan',
  bodyPlaceholder: 'Tulis catatan Anda di sini...',
  save: 'Simpan',
  delete: 'Hapus',
  archive: 'Arsipkan',
  unarchive: 'Batal Arsip',
  
  // Auth
  name: 'Nama',
  email: 'Email',
  password: 'Kata Sandi',
  confirmPassword: 'Konfirmasi Kata Sandi',
  registerTitle: 'Daftar Akun Baru',
  loginTitle: 'Masuk ke Akun Anda',
  registerButton: 'Daftar',
  loginButton: 'Masuk',
  
  // Errors and notifications
  titleRequired: 'Judul catatan tidak boleh kosong!',
  passwordRequired: 'Kata sandi tidak boleh kosong!',
  passwordMinLength: 'Kata sandi minimal 6 karakter!',
  passwordMatch: 'Kata sandi dan konfirmasi kata sandi harus sama!',
  nameRequired: 'Nama tidak boleh kosong!',
  emailRequired: 'Email tidak boleh kosong!',
  loading: 'Memuat...',
  noteCreated: 'Catatan berhasil dibuat!',
  noteDeleted: 'Catatan telah dihapus!',
  noteArchived: 'Catatan telah diarsipkan!',
  noteUnarchived: 'Catatan telah dipindahkan ke aktif!',
  
  // Confirmation
  deleteConfirm: 'Apakah Anda yakin akan menghapus catatan',
  cancel: 'Batal',
  ok: 'OK',
  
  // Other
  notFound: 'Halaman Tidak Ditemukan',
  notFoundMessage: 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
  backToHome: 'Kembali ke Beranda',
  appTitle: 'Aplikasi Catatan',
  changeTheme: 'Ubah Tema',
  changeLanguage: 'Ubah Bahasa',
};

const englishText = {
  // Navigation
  home: 'Home',
  archives: 'Archives',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  
  // Notes
  activeNotes: 'Active Notes',
  archivedNotes: 'Archived Notes',
  emptyNotesMessage: 'No notes. Create a new note now!',
  emptyArchiveMessage: 'Archive is empty. Archive some notes first!',
  searchPlaceholder: 'Search notes by title...',
  addNote: 'Add New Note',
  titlePlaceholder: 'Note title',
  bodyPlaceholder: 'Write your note here...',
  save: 'Save',
  delete: 'Delete',
  archive: 'Archive',
  unarchive: 'Unarchive',
  
  // Auth
  name: 'Name',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  registerTitle: 'Register New Account',
  loginTitle: 'Login to Your Account',
  registerButton: 'Register',
  loginButton: 'Login',
  
  // Errors and notifications
  titleRequired: 'Note title is required!',
  passwordRequired: 'Password is required!',
  passwordMinLength: 'Password must be at least 6 characters!',
  passwordMatch: 'Password and confirm password must match!',
  nameRequired: 'Name is required!',
  emailRequired: 'Email is required!',
  loading: 'Loading...',
  noteCreated: 'Note created successfully!',
  noteDeleted: 'Note has been deleted!',
  noteArchived: 'Note has been archived!',
  noteUnarchived: 'Note has been moved to active!',
  
  // Confirmation
  deleteConfirm: 'Are you sure you want to delete note',
  cancel: 'Cancel',
  ok: 'OK',
  
  // Other
  notFound: 'Page Not Found',
  notFoundMessage: 'The page you are looking for does not exist or has been moved.',
  backToHome: 'Back to Home',
  appTitle: 'Notes App',
  changeTheme: 'Toggle Theme',
  changeLanguage: 'Toggle Language',
};

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    // Initialize locale from localStorage if available
    return localStorage.getItem('locale') || 'id';
  });
  
  const [texts, setTexts] = useState(() => {
    const savedLocale = localStorage.getItem('locale') || 'id';
    return savedLocale === 'id' ? indonesianText : englishText;
  });

  useEffect(() => {
    // Update texts when locale changes
    setTexts(locale === 'id' ? indonesianText : englishText);
    // Save locale to localStorage
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, texts }}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocaleContext, LocaleProvider };