import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ComparisonBar from './components/common/ComparisonBar';

import HomePage from './pages/HomePage';
import SearchListPage from './pages/SearchListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ComparePage from './pages/ComparePage';
import AiFinderPage from './pages/AiFinderPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import ListPropertyPage from './pages/ListPropertyPage';

// Safe scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // safe fallback
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <CompareProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchListPage />} />
                  <Route path="/property/:id" element={<PropertyDetailPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/ai-finder" element={<AiFinderPage />} />
                  <Route path="/saved" element={<SavedPropertiesPage />} />
                  <Route path="/list-property" element={<ListPropertyPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <ComparisonBar />
              <Footer />
            </div>
          </BrowserRouter>
        </CompareProvider>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}
