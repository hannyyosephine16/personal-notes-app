import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { subscribeToChanges, getAllNotes } from './utils/local-data';
import { getQueryParam, updateQueryParam } from './utils/url-utils';

function App() {
  const [searchQuery, setSearchQuery] = useState(() => {
    // Inisialisasi query pencarian dari URL
    return getQueryParam('keyword') || '';
  });
  
  const [activePage, setActivePage] = useState('home');
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Menangani perubahan URL
  useEffect(() => {
    const path = window.location.pathname;
    
    // Periksa apakah path adalah path detail catatan
    if (path.startsWith('/notes/')) {
      const noteId = path.split('/notes/')[1];
      if (noteId === 'new') {
        setActiveNoteId('new');
        setActivePage('add');
      } else {
        setActiveNoteId(noteId);
        setActivePage('detail');
      }
    } else if (path === '/archives') {
      setActivePage('archives');
      setActiveNoteId(null);
    } else if (path === '/404') {
      setActivePage('not-found');
      setActiveNoteId(null);
    } else {
      setActivePage('home');
      setActiveNoteId(null);
    }
    
    // Perbarui query pencarian dari URL
    const keyword = getQueryParam('keyword');
    if (keyword !== searchQuery) {
      setSearchQuery(keyword || '');
    }
  }, []);
  
  // Berlangganan perubahan data catatan
  useEffect(() => {
    console.log('App mounted/updated, setting up subscription');
    
    const handleNotesChange = () => {
      console.log('Notes changed, forcing update');
      setForceUpdate(prev => prev + 1);
    };
    
    const unsubscribe = subscribeToChanges(handleNotesChange);
    
    console.log('Current notes:', getAllNotes());
    
    return () => {
      console.log('Cleaning up subscription');
      unsubscribe();
    };
  }, []);
  
  // Perbarui URL saat query pencarian berubah
  useEffect(() => {
    if (searchQuery) {
      updateQueryParam('keyword', searchQuery);
    } else {
      updateQueryParam('keyword', null); // Hapus parameter
    }
  }, [searchQuery]);
  
  const handleViewNoteDetail = (id) => {
    console.log('Viewing note detail for id:', id);
    setActiveNoteId(id);
    // Perbarui URL untuk mencerminkan perubahan
    window.history.pushState({}, '', id === 'new' ? '/notes/new' : `/notes/${id}`);
    setActivePage(id === 'new' ? 'add' : 'detail');
  };

  const handleSetActivePage = (page) => {
    console.log('Setting active page to:', page);
    setActivePage(page);
    setActiveNoteId(null); // Reset catatan aktif saat mengganti halaman
    
    // Perbarui URL untuk mencerminkan perubahan
    if (page === 'archives') {
      window.history.pushState({}, '', '/archives');
    } else if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'not-found') {
      window.history.pushState({}, '', '/404');
    }
  };

  const handleBackToHome = () => {
    console.log('Navigating back to home');
    setActiveNoteId(null);
    setActivePage('home');
    window.history.pushState({}, '', '/');
  };
  
  const getMainContent = () => {
    if (activeNoteId === 'new') {
      console.log('Rendering AddNotePage');
      return <AddNotePage onBackToHome={handleBackToHome} />;
    }
    
    if (activeNoteId) {
      console.log('Rendering NoteDetailPage for id:', activeNoteId);
      return <NoteDetailPage 
        noteId={activeNoteId} 
        onBackToHome={handleBackToHome}
      />;
    }
    
    if (activePage === 'home') {
      console.log('Rendering HomePage');
      return <HomePage 
        searchQuery={searchQuery} 
        onViewDetail={handleViewNoteDetail}
        key={`home-${forceUpdate}`}
      />;
    }
    
    if (activePage === 'archives') {
      console.log('Rendering ArchivesPage');
      return <ArchivesPage 
        searchQuery={searchQuery} 
        onViewDetail={handleViewNoteDetail}
        key={`archives-${forceUpdate}`}
      />;
    }
    
    if (activePage === 'not-found') {
      return <NotFoundPage onBackToHome={handleBackToHome} />;
    }
    
    return <NotFoundPage onBackToHome={handleBackToHome} />;
  };
  
  return (
    <div className="app-container">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activePage={activePage} 
        setActivePage={handleSetActivePage} 
      />
      <main>
        {getMainContent()}
      </main>
    </div>
  );
}

export default App;
// import React, { useState, useEffect } from 'react';
// import HomePage from './pages/HomePage';
// import ArchivesPage from './pages/ArchivesPage';
// import AddNotePage from './pages/AddNotePage';
// import NoteDetailPage from './pages/NoteDetailPage';
// import NotFoundPage from './pages/NotFoundPage';
// import Header from './components/Header';
// import { subscribeToChanges, getAllNotes } from './utils/local-data';

// function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activePage, setActivePage] = useState('home');
//   const [activeNoteId, setActiveNoteId] = useState(null);
//   const [forceUpdate, setForceUpdate] = useState(0);
  
//   // Subscribe to any changes in notes data with improved logging
//   useEffect(() => {
//     console.log('App mounted/updated, setting up subscription');
    
//     const handleNotesChange = () => {
//       console.log('Notes changed, forcing update');
//       setForceUpdate(prev => prev + 1);
//     };
    
//     const unsubscribe = subscribeToChanges(handleNotesChange);
    
//     console.log('Current notes:', getAllNotes());
    
//     return () => {
//       console.log('Cleaning up subscription');
//       unsubscribe();
//     };
//   }, []);
  
//   // Log when forceUpdate changes
//   useEffect(() => {
//     console.log('forceUpdate changed:', forceUpdate);
//   }, [forceUpdate]);
  
//   const handleViewNoteDetail = (id) => {
//     console.log('Viewing note detail for id:', id);
//     setActiveNoteId(id);
//   };

//   const handleSetActivePage = (page) => {
//     console.log('Setting active page to:', page);
//     setActivePage(page);
//     setActiveNoteId(null); // Reset active note when changing pages
//   };

//   const handleBackToHome = () => {
//     console.log('Navigating back to home');
//     setActiveNoteId(null);
//     setActivePage('home');
//   };
  
//   const getMainContent = () => {
//     if (activeNoteId === 'new') {
//       console.log('Rendering AddNotePage');
//       return <AddNotePage onBackToHome={handleBackToHome} />;
//     }
    
//     if (activeNoteId) {
//       console.log('Rendering NoteDetailPage for id:', activeNoteId);
//       return <NoteDetailPage 
//         noteId={activeNoteId} 
//         onBackToHome={handleBackToHome}
//       />;
//     }
    
//     if (activePage === 'home') {
//       console.log('Rendering HomePage');
//       return <HomePage 
//         searchQuery={searchQuery} 
//         onViewDetail={handleViewNoteDetail}
//         key={`home-${forceUpdate}`}
//       />;
//     }
    
//     if (activePage === 'archives') {
//       console.log('Rendering ArchivesPage');
//       return <ArchivesPage 
//         searchQuery={searchQuery} 
//         onViewDetail={handleViewNoteDetail}
//         key={`archives-${forceUpdate}`}
//       />;
//     }
    
//     return <NotFoundPage onBackToHome={handleBackToHome} />;
//   };
  
//   return (
//     <div className="app-container">
//       <Header 
//         searchQuery={searchQuery} 
//         setSearchQuery={setSearchQuery} 
//         activePage={activePage} 
//         setActivePage={handleSetActivePage} 
//       />
//       <main>
//         {getMainContent()}
//       </main>
//     </div>
//   );
// }

// export default App;