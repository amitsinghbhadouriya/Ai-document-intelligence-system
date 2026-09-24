import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Cpu, FileText, Search, MessageSquare, GitCompare, Layers, Activity 
} from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import ComparePage from './pages/ComparePage';
import AnalysisPage from './pages/AnalysisPage';
import EvaluationPage from './pages/EvaluationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ClickSpark, NoiseOverlay, Dock } from './components/reactbits';

const DOCK_ITEMS = [
  { label: 'Home', path: '/', icon: <Cpu size={20} /> },
  { label: 'Documents', path: '/documents', icon: <FileText size={20} /> },
  { label: 'Search', path: '/search', icon: <Search size={20} /> },
  { label: 'RAG Chat', path: '/chat', icon: <MessageSquare size={20} /> },
  { label: 'Compare', path: '/compare', icon: <GitCompare size={20} /> },
  { label: 'Analysis', path: '/analysis', icon: <Layers size={20} /> },
  { label: 'Benchmarks', path: '/evaluation', icon: <Activity size={20} /> },
];

export default function App() {
  return (
    <AuthProvider>
      <DocumentProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100 position-relative">
            <ClickSpark sparkColor="rgba(99, 102, 241, 0.75)" sparkCount={8} />
            <NoiseOverlay opacity={0.02} />
            <Navbar />
            <main className="flex-grow-1 pb-5">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="/evaluation" element={<EvaluationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Dock items={DOCK_ITEMS} className="d-none d-md-block" />
            <Footer />
          </div>
        </Router>
      </DocumentProvider>
    </AuthProvider>
  );
}
