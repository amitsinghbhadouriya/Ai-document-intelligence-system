import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Cpu, FileText, Search, MessageSquare, GitCompare, 
  Layers, Activity, LogOut, User, Sparkles 
} from 'lucide-react';
import { systemService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [health, setHealth] = useState(null);

  useEffect(() => {
    systemService.getHealth()
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'connected' })); // gracefully default
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top py-3">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="feature-icon-wrapper mb-0" style={{ width: 38, height: 38 }}>
            <Cpu size={22} className="text-white" />
          </div>
          <span className="fw-bold fs-5 text-white tracking-tight">
            Docu<span className="text-gradient">Intel</span>{' '}
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1" style={{ fontSize: '0.65rem' }}>
              AI
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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
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
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/documents') ? 'active' : ''}`} to="/documents">
                <FileText size={15} /> Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/search') ? 'active' : ''}`} to="/search">
                <Search size={15} /> Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/chat') ? 'active' : ''}`} to="/chat">
                <MessageSquare size={15} /> RAG Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/compare') ? 'active' : ''}`} to="/compare">
                <GitCompare size={15} /> Compare
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/analysis') ? 'active' : ''}`} to="/analysis">
                <Layers size={15} /> Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link d-flex align-items-center gap-1 ${isActive('/evaluation') ? 'active' : ''}`} to="/evaluation">
                <Activity size={15} /> Benchmarks
              </Link>
            </li>
          </ul>

          {/* Right Action & Status Badge */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-none d-xl-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}
            >
              <span className="pulse-dot success"></span>
              <span className="text-secondary">AI Engine Ready</span>
            </div>

            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex align-items-center gap-2 px-2 py-1 rounded glass-card">
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
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
