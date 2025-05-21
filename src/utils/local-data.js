// Initialize with default notes
let notes = [
  {
    id: 'notes-1',
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-2',
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-3',
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-4',
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-5',
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-6',
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
];

// Add event listener support
const listeners = [];

function notifyListeners() {
  console.log(`Notifying ${listeners.length} listeners about data change`);
  listeners.forEach(listener => {
    try {
      listener();
    } catch (e) {
      console.error('Error in listener:', e);
    }
  });
}

function subscribeToChanges(listener) {
  console.log('New listener subscribed');
  listeners.push(listener);
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
      console.log('Listener unsubscribed');
    }
  };
}

function getAllNotes() {
  return [...notes]; // Return a copy to prevent direct mutations
}

function getNote(id) {
  console.log(`Getting note with id: ${id}`);
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote ? {...foundedNote} : null; // Return a copy
}

function getActiveNotes() {
  console.log('Getting active notes');
  return notes.filter((note) => !note.archived).map(note => ({...note})); // Return copies
}

function getArchivedNotes() {
  console.log('Getting archived notes');
  return notes.filter((note) => note.archived).map(note => ({...note})); // Return copies
}

function addNote({ title, body }) {
  console.log('Adding new note');
  const newNote = {
    id: `notes-${+new Date()}`,
    title: title || '(untitled)',
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };
  
  notes = [...notes, newNote]; // Create new array
  notifyListeners(); // Notify about change
  return newNote;
}

function deleteNote(id) {
  console.log(`Deleting note with id: ${id}`);
  const previousLength = notes.length;
  notes = notes.filter((note) => note.id !== id);
  console.log(`Notes length before: ${previousLength}, after: ${notes.length}`);
  
  if (previousLength !== notes.length) {
    notifyListeners(); // Notify about change only if something changed
  }
}

function archiveNote(id) {
  console.log(`Archiving note with id: ${id}`);
  let wasChanged = false;
  
  notes = notes.map((note) => {
    if (note.id === id && !note.archived) {
      wasChanged = true;
      return { ...note, archived: true };
    }
    return note;
  });
  
  if (wasChanged) {
    notifyListeners(); // Notify about change only if something changed
  }
}

function unarchiveNote(id) {
  console.log(`Unarchiving note with id: ${id}`);
  let wasChanged = false;
  
  notes = notes.map((note) => {
    if (note.id === id && note.archived) {
      wasChanged = true;
      return { ...note, archived: false };
    }
    return note;
  });
  
  if (wasChanged) {
    notifyListeners(); // Notify about change only if something changed
  }
}

function editNote({ id, title, body }) {
  console.log(`Editing note with id: ${id}`);
  let wasChanged = false;
  
  notes = notes.map((note) => {
    if (note.id === id) {
      wasChanged = true;
      return { ...note, title, body };
    }
    return note;
  });
  
  if (wasChanged) {
    notifyListeners(); // Notify about change only if something changed
  }
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
  subscribeToChanges,
};