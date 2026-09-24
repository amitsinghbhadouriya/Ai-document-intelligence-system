import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ParticlesBackground, SpotlightCard, MagnetButton, GlowBadge } from '../components/reactbits';

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
    <div className="position-relative py-5 d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: '84vh' }}>
      <ParticlesBackground particleCount={35} maxDistance={90} speed={0.4} />
      <div className="container position-relative d-flex justify-content-center" style={{ zIndex: 2 }}>
        <SpotlightCard className="p-4 p-md-5" style={{ maxWidth: 460, width: '100%' }}>
          <div className="text-center mb-4">
            <div className="feature-icon-wrapper mx-auto mb-3" style={{ width: 48, height: 48 }}>
              <User size={22} className="text-primary" />
            </div>
            <h2 className="h3 text-white fw-bold mb-1">Create Account</h2>
            <p className="text-muted small mb-2">Start extracting intelligence from multi-page documents.</p>
            <GlowBadge variant="cyan" pulse={true}>
              <ShieldCheck size={12} /> Enterprise Ready
            </GlowBadge>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small mb-3">
              {error}
            </div>
          )}

          <MagnetButton magnetStrength={0.2} className="w-100 mb-3">
            <button
              type="button"
              onClick={handleDemoClick}
              className="btn btn-modern-outline w-100 d-flex align-items-center justify-content-center gap-2 py-2"
              style={{ borderColor: 'rgba(99, 102, 241, 0.5)', background: 'rgba(99, 102, 241, 0.12)' }}
            >
              <Sparkles size={16} className="text-warning" />
              <span className="fw-semibold text-white">Instant Demo Access</span>
            </button>
          </MagnetButton>

          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
            <span className="px-2 text-dim small">or register new account</span>
            <hr className="flex-grow-1" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted small">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  className="form-control bg-transparent text-white border-start-0"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Dr. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  className="form-control bg-transparent text-white border-start-0"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  className="form-control bg-transparent text-white border-start-0"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <MagnetButton magnetStrength={0.2} className="w-100">
              <button
                type="submit"
                className="btn btn-modern-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
              >
                <span>{loading ? 'Creating Account...' : 'Register'}</span>
                <ArrowRight size={16} />
              </button>
            </MagnetButton>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="text-primary small text-decoration-none fw-semibold">
              Sign In
            </Link>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
