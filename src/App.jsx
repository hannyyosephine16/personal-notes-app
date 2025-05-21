// import React, { useState, useEffect } from 'react';
// import HomePage from './pages/HomePage';
// import ArchivesPage from './pages/ArchivesPage';
// import AddNotePage from './pages/AddNotePage';
// import NoteDetailPage from './pages/NoteDetailPage';
// import NotFoundPage from './pages/NotFoundPage';
// import Header from './components/Header';
// import { getAllNotes } from './utils/local-data';

// function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activePage, setActivePage] = useState('home');
//   const [activeNoteId, setActiveNoteId] = useState(null);
//   // Add a notes state to track changes
//   const [notesChanged, setNotesChanged] = useState(0);
  
//   // Function to trigger a refresh when notes change
//   const onNotesChange = () => {
//     setNotesChanged(prev => prev + 1);
//   };
  
//   const getMainContent = () => {
//     if (activeNoteId === 'new') {
//       return <AddNotePage onBackToHome={() => { 
//         setActiveNoteId(null); 
//         setActivePage('home'); 
//         onNotesChange(); 
//       }} />;
//     }
    
//     if (activeNoteId) {
//       return <NoteDetailPage 
//         noteId={activeNoteId} 
//         onBackToHome={() => { 
//           setActiveNoteId(null);
//           onNotesChange();
//         }}
//         onNotesChange={onNotesChange} 
//       />;
//     }
    
//     if (activePage === 'home') {
//       return <HomePage 
//         searchQuery={searchQuery} 
//         onViewDetail={setActiveNoteId}
//         notesChanged={notesChanged}
//         onNotesChange={onNotesChange}
//       />;
//     }
    
//     if (activePage === 'archives') {
//       return <ArchivesPage 
//         searchQuery={searchQuery} 
//         onViewDetail={setActiveNoteId}
//         notesChanged={notesChanged}
//         onNotesChange={onNotesChange}
//       />;
//     }
    
//     return <NotFoundPage onBackToHome={() => { setActiveNoteId(null); setActivePage('home'); }} />;
//   };
  
//   return (
//     <div className="app-container">
//       <Header 
//         searchQuery={searchQuery} 
//         setSearchQuery={setSearchQuery} 
//         activePage={activePage} 
//         setActivePage={(page) => {
//           setActivePage(page);
//           setActiveNoteId(null);
//         }} 
//       />
//       <main>
//         {getMainContent()}
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { subscribeToChanges } from './utils/local-data';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Subscribe to any changes in notes data
  useEffect(() => {
    const unsubscribe = subscribeToChanges(() => {
      // Force a re-render when notes change
      setForceUpdate(prev => prev + 1);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const handleBackToHome = () => {
    setActiveNoteId(null);
    setActivePage('home');
  };
  
  const getMainContent = () => {
    if (activeNoteId === 'new') {
      return <AddNotePage onBackToHome={handleBackToHome} />;
    }
    
    if (activeNoteId) {
      return <NoteDetailPage 
        noteId={activeNoteId} 
        onBackToHome={handleBackToHome}
      />;
    }
    
    if (activePage === 'home') {
      return <HomePage 
        searchQuery={searchQuery} 
        onViewDetail={setActiveNoteId}
        key={`home-${forceUpdate}`} // Force re-render on data change
      />;
    }
    
    if (activePage === 'archives') {
      return <ArchivesPage 
        searchQuery={searchQuery} 
        onViewDetail={setActiveNoteId}
        key={`archives-${forceUpdate}`} // Force re-render on data change
      />;
    }
    
    return <NotFoundPage onBackToHome={handleBackToHome} />;
  };
  
  return (
    <div className="app-container">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          setActiveNoteId(null);
        }} 
      />
      <main>
        {getMainContent()}
      </main>
    </div>
  );
}

export default App;