import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Search, MessageSquare, GitCompare, Sparkles, 
  ArrowRight, ShieldCheck, Database, Cpu, CheckCircle2,
  Layers, Terminal, RefreshCw, Zap, Shield, Check
} from 'lucide-react';
import { systemService } from '../services/api';
import { 
  ParticlesBackground, SplitText, ShinyText, DecryptedText, 
  MagnetButton, CountUp, SpotlightCard, TiltedCard, BentoGrid, 
  BentoCard, GlowBadge, TerminalBox 
} from '../components/reactbits';

export default function HomePage() {
  const [healthData, setHealthData] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  const fetchHealth = () => {
    setLoadingHealth(true);
    systemService.getHealth()
      .then((data) => setHealthData(data))
      .catch((err) => setHealthData({ status: 'error', error: err.message }))
      .finally(() => setLoadingHealth(false));
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="pb-5 position-relative">
      {/* Hero Section */}
      <section className="py-5 text-center position-relative overflow-hidden" style={{ minHeight: '82vh', display: 'flex', alignItems: 'center' }}>
        <ParticlesBackground particleCount={50} speed={0.5} maxDistance={100} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Tag badge */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 rounded-pill glass-card" style={{ border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <Sparkles size={16} className="text-warning" />
            <span className="small fw-semibold text-gradient">Next-Gen Document AI & Grounded RAG</span>
            <span className="badge bg-primary rounded-pill px-2 py-0.5" style={{ fontSize: '0.65rem' }}>v1.0-PRO</span>
          </div>

          <h1 className="display-4 fw-extrabold mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.15 }}>
            <SplitText text="Transform Documents into" by="words" delay={0.05} />
            <br />
            <span className="text-gradient">Intelligent Knowledge Assets</span>
          </h1>

          <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: 740, fontSize: '1.2rem', lineHeight: 1.6 }}>
            Upload PDFs, DOCX, and scanned documents. Index them into high-dimensional vector spaces, perform hybrid semantic search, and chat with precision citations—zero hallucinations.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            <Link to="/documents" className="btn btn-lg btn-modern-primary">
              <FileText size={20} />
              <span>Launch Document Hub</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/chat" className="btn btn-lg btn-modern-outline">
              <MessageSquare size={20} />
              <span>Try RAG Chat</span>
            </Link>
          </div>

          {/* Interactive Live System Diagnostic Card */}
          <div className="glass-card mx-auto p-4 text-start" style={{ maxWidth: 860 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <Terminal size={18} className="text-primary" />
                <span className="fw-bold text-white small text-uppercase tracking-wider">Backend Gateway & Engine Status</span>
              </div>
              <button 
                onClick={fetchHealth} 
                className="btn btn-sm btn-link text-muted p-0 d-flex align-items-center gap-1 text-decoration-none"
                disabled={loadingHealth}
              >
                <RefreshCw size={14} className={loadingHealth ? 'spin-icon' : ''} />
                <span className="small">Refresh</span>
              </button>
            </div>

            {loadingHealth ? (
              <div className="py-3 text-center text-muted small">Checking backend engine connectivity...</div>
            ) : healthData?.status === 'healthy' ? (
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                    <div className="text-dim small mb-1">Database Engine</div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="pulse-dot success"></span>
                      <span className="fw-bold text-white text-capitalize">{healthData.database?.type} ({healthData.database?.status})</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                    <div className="text-dim small mb-1">AI Models Configured</div>
                    <div className="d-flex align-items-center gap-2">
                      <Cpu size={16} className="text-info" />
                      <span className="fw-bold text-white small">{healthData.ai_engine?.llm_model}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                    <div className="text-dim small mb-1">Vector Storage</div>
                    <div className="d-flex align-items-center gap-2">
                      <Database size={16} className="text-warning" />
                      <span className="fw-bold text-white small">{healthData.ai_engine?.embedding_model}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning py-2 small mb-0 d-flex align-items-center gap-2">
                <span>FastAPI backend initializing... Check if backend server is active on port 8000.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pipeline Visualizer Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="tech-badge mb-2">Ingestion & Retrieval Architecture</span>
          <h2 className="display-6 fw-bold text-white">How The Platform Operates</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
            From raw unstructured files to grounded, cited intelligence through a deterministic pipeline.
          </p>
        </div>

        <div className="row g-4">
          {[
            { step: '01', title: 'Multi-Format Ingestion', desc: 'PyMuPDF parses native PDFs, python-docx parses Office docs, and Tesseract OCR handles scanned pages automatically.', icon: FileText },
            { step: '02', title: 'Structure-Aware Chunking', desc: 'Preserves sections, titles, and page boundaries with configurable character overlap to maintain semantic continuity.', icon: Layers },
            { step: '03', title: 'Vector Indexing', desc: 'Dense vector embeddings stored permanently in PostgreSQL with pgvector cosine distance indexing.', icon: Database },
            { step: '04', title: 'Hybrid Search & RAG', desc: 'Dense vector similarity fused with BM25 keyword matching yields top-K chunks for the LLM to synthesize cited answers.', icon: ShieldCheck },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="glass-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="feature-icon-wrapper mb-0">
                    <item.icon size={24} />
                  </div>
                  <span className="fw-bold fs-4 text-dim font-monospace">{item.step}</span>
                </div>
                <h5 className="text-white fw-bold mb-2">{item.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="tech-badge mb-2">Capabilities</span>
          <h2 className="display-6 fw-bold text-white">Engineered For Depth, Not Gimmicks</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={26} />
              </div>
              <h4 className="text-white fw-bold mb-2">Grounding & Citations</h4>
              <p className="text-muted small">
                Every generated response includes verifiable, clickable citations like <code>[1] Page 7</code>. If the uploaded files don't contain the answer, the model explicitly declines.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <div className="feature-icon-wrapper">
                <GitCompare size={26} />
              </div>
              <h4 className="text-white fw-bold mb-2">Multi-Doc Comparison</h4>
              <p className="text-muted small">
                Compare multiple research papers or contracts side-by-side. Automatically extracts objectives, algorithms, datasets, accuracy, and limitations into structured tables.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <div className="feature-icon-wrapper">
                <Search size={26} />
              </div>
              <h4 className="text-white fw-bold mb-2">Semantic & Hybrid Search</h4>
              <p className="text-muted small">
                Search queries across your entire document repository using semantic intent or exact keyword matching with real-time similarity score gauges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="container py-5">
        <div className="glass-card p-5 text-center position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)' }}>
          <h2 className="display-6 fw-bold text-white mb-3">Ready to Analyze Documents?</h2>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: 540 }}>
            Sign in or register an account to upload documents, extract structured entities, and start conversational RAG sessions.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-modern-primary">Create Free Account</Link>
            <Link to="/documents" className="btn btn-modern-outline">Browse Documents</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
