import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
      <div className="glass-card p-4 p-md-5" style={{ maxWidth: 460, width: '100%' }}>
        <div className="text-center mb-4">
          <div className="feature-icon-wrapper mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h2 className="h3 text-white fw-bold">Sign In</h2>
          <p className="text-muted small">Access your indexed documents and RAG sessions.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label text-muted small">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-subtle)' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
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
                className="form-control bg-transparent text-white border-start-0"
                style={{ borderColor: 'var(--border-subtle)' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-modern-primary w-100 mb-3">
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>

          <div className="text-center small text-muted">
            Don't have an account? <Link to="/register" className="text-primary text-decoration-none">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
