import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { subscribeToChanges, getAllNotes } from './utils/local-data';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Subscribe to any changes in notes data with improved logging
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
  
  // Log when forceUpdate changes
  useEffect(() => {
    console.log('forceUpdate changed:', forceUpdate);
  }, [forceUpdate]);
  
  const handleViewNoteDetail = (id) => {
    console.log('Viewing note detail for id:', id);
    setActiveNoteId(id);
  };

  const handleSetActivePage = (page) => {
    console.log('Setting active page to:', page);
    setActivePage(page);
    setActiveNoteId(null); // Reset active note when changing pages
  };

  const handleBackToHome = () => {
    console.log('Navigating back to home');
    setActiveNoteId(null);
    setActivePage('home');
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