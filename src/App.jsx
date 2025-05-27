import React, { useState, useEffect, useContext } from 'react';
import HomePage from './pages/HomePage';
import ArchivesPage from './pages/ArchivesPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { getQueryParam, updateQueryParam } from './utils/url-utils';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { LocaleProvider, LocaleContext } from './contexts/LocaleContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState(() => {
    // Initialize search query from URL
    return getQueryParam('keyword') || '';
  });
  
  const [activePage, setActivePage] = useState('home');
  const [activeNoteId, setActiveNoteId] = useState(null);
  
  const { authUser, isLoading } = useContext(AuthContext);
  const { texts } = useContext(LocaleContext);
  
  // Handle URL changes
  useEffect(() => {
    if (!authUser) return; // Don't process routes when not authenticated
    
    const path = window.location.pathname;
    
    // Check if path is a note detail path
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
    
    // Update search query from URL
    const keyword = getQueryParam('keyword');
    if (keyword !== searchQuery) {
      setSearchQuery(keyword || '');
    }
  }, [authUser]);
  
  // Update URL when search query changes
  useEffect(() => {
    if (!authUser) return; // Don't update URL when not authenticated
    
    if (searchQuery) {
      updateQueryParam('keyword', searchQuery);
    } else {
      updateQueryParam('keyword', null); // Remove parameter
    }
  }, [searchQuery, authUser]);
  
  const handleViewNoteDetail = (id) => {
    console.log('Viewing note detail for id:', id);
    setActiveNoteId(id);
    // Update URL to reflect the change
    window.history.pushState({}, '', id === 'new' ? '/notes/new' : `/notes/${id}`);
    setActivePage(id === 'new' ? 'add' : 'detail');
  };

  const handleSetActivePage = (page) => {
    console.log('Setting active page to:', page);
    setActivePage(page);
    setActiveNoteId(null); // Reset active note when changing pages
    
    // Update URL to reflect the change
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
  
  // Show auth page if user is not authenticated
  if (!authUser) {
    return <AuthPage />;
  }
  
  // Show loading spinner when fetching data
  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }
  
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
      />;
    }
    
    if (activePage === 'archives') {
      console.log('Rendering ArchivesPage');
      return <ArchivesPage 
        searchQuery={searchQuery} 
        onViewDetail={handleViewNoteDetail}
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

function App() {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <LocaleProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;