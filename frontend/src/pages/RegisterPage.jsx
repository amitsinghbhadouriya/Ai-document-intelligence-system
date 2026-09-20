import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, loginWithDemo, loading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleDemoClick = () => {
    loginWithDemo();
    navigate('/dashboard');
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '78vh' }}>
      <div className="glass-card p-4 p-md-5" style={{ maxWidth: 460, width: '100%' }}>
        <div className="text-center mb-4">
          <div className="feature-icon-wrapper mx-auto mb-3">
            <User size={24} />
          </div>
          <h2 className="h3 text-white fw-bold">Create Account</h2>
          <p className="text-muted small">Start extracting intelligence from multi-page documents.</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mb-3">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleDemoClick}
          className="btn btn-modern-outline w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2"
          style={{ borderColor: 'rgba(99, 102, 241, 0.5)', background: 'rgba(99, 102, 241, 0.12)' }}
        >
          <Sparkles size={16} className="text-warning" />
          <span className="fw-semibold text-white">Instant Demo Access</span>
        </button>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderColor: 'var(--border-subtle)' }} />
          <span className="px-2 text-dim small">or register new account</span>
          <hr className="flex-grow-1" style={{ borderColor: 'var(--border-subtle)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted small">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
                <User size={16} />
              </span>
              <input
                type="text"
                required
                className="form-control bg-transparent text-white border-start-0"
                style={{ borderColor: 'var(--border-subtle)' }}
                placeholder="Alex Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                className="form-control bg-transparent text-white border-start-0"
                style={{ borderColor: 'var(--border-subtle)' }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                className="form-control bg-transparent text-white border-start-0"
                style={{ borderColor: 'var(--border-subtle)' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-modern-primary w-100 mb-3" disabled={loading}>
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
            <ArrowRight size={16} />
          </button>

          <div className="text-center small text-muted">
            Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
