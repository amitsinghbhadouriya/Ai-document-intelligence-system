import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Cpu, FileText, Search, MessageSquare, GitCompare, 
  Layers, Activity, LogOut, User, Sparkles 
} from 'lucide-react';
import { systemService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { GlowBadge, ShinyText } from '../reactbits';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [health, setHealth] = useState(null);

  useEffect(() => {
    systemService.getHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'connected' }));
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top py-2.5">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div
            className="feature-icon-wrapper mb-0 d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40, borderRadius: 12 }}
          >
            <Cpu size={22} className="text-white" />
          </div>
          <span className="fw-bold fs-5 text-white tracking-tight">
            Docu<span className="text-gradient">Intel</span>{' '}
            <span
              className="badge px-2 py-0.5"
              style={{
                fontSize: '0.65rem',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                color: '#fff',
                borderRadius: '6px',
              }}
            >
              PRO
            </span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/documents') ? 'active' : ''}`} to="/documents">
                <FileText size={15} /> Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/search') ? 'active' : ''}`} to="/search">
                <Search size={15} /> Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/chat') ? 'active' : ''}`} to="/chat">
                <MessageSquare size={15} /> RAG Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/compare') ? 'active' : ''}`} to="/compare">
                <GitCompare size={15} /> Compare
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/analysis') ? 'active' : ''}`} to="/analysis">
                <Layers size={15} /> Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1.5 ${isActive('/evaluation') ? 'active' : ''}`} to="/evaluation">
                <Activity size={15} /> Benchmarks
              </Link>
            </li>
          </ul>

          {/* Right Action & Status Badge */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-xl-flex">
              <GlowBadge variant="emerald" pulse={true}>
                <span className="small">Gemini RAG Engine Live</span>
              </GlowBadge>
            </div>

            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex align-items-center gap-2 px-2.5 py-1 rounded glass-card">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white fw-bold"
                    style={{ width: 28, height: 28, fontSize: '0.8rem' }}
                  >
                    {user?.full_name ? user.full_name.charAt(0) : 'U'}
                  </div>
                  <span className="small text-white fw-semibold d-none d-md-inline" style={{ maxWidth: 120, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {user?.full_name || user?.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="btn btn-sm btn-link text-muted p-1"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-sm btn-modern-outline">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-sm btn-modern-primary">
                  <Sparkles size={14} /> Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
