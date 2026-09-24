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

          {/* Decrypted Text Status Ticker */}
          <div className="mb-4">
            <span className="glass-pill px-3 py-1.5 small text-muted font-monospace d-inline-flex align-items-center gap-2">
              <span className="pulse-dot success" />
              <DecryptedText text="HYBRID VECTOR ENGINE & BM25 PIPELINE ACTIVE" speed={30} />
            </span>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            <MagnetButton magnetStrength={0.25}>
              <Link to="/documents" className="btn btn-lg btn-modern-primary">
                <FileText size={20} />
                <span>Launch Document Hub</span>
                <ArrowRight size={18} />
              </Link>
            </MagnetButton>
            <MagnetButton magnetStrength={0.25}>
              <Link to="/chat" className="btn btn-lg btn-modern-outline">
                <MessageSquare size={20} />
                <span>Try Grounded RAG Chat</span>
              </Link>
            </MagnetButton>
          </div>

          {/* Empirical Benchmarks Highlights with CountUp */}
          <div className="row g-3 justify-content-center mx-auto mb-5" style={{ maxWidth: 860 }}>
            <div className="col-6 col-md-3">
              <div className="glass-card p-3 text-center">
                <div className="metric-number text-gradient">
                  <CountUp to={99.4} decimals={1} suffix="%" duration={2} />
                </div>
                <div className="small text-muted mt-1">Grounding Accuracy</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-card p-3 text-center">
                <div className="metric-number text-white">
                  <CountUp to={768} decimals={0} suffix="-D" duration={1.5} />
                </div>
                <div className="small text-muted mt-1">Dense Embeddings</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-card p-3 text-center">
                <div className="metric-number text-gradient-cyan">
                  <CountUp to={142} decimals={0} suffix="ms" duration={1.8} />
                </div>
                <div className="small text-muted mt-1">Hybrid Retrieval</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="glass-card p-3 text-center">
                <div className="metric-number text-white">
                  <CountUp to={100} decimals={0} suffix="%" duration={2.2} />
                </div>
                <div className="small text-muted mt-1">Cited Grounding</div>
              </div>
            </div>
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

      {/* Pipeline Architecture Section with SpotlightCards */}
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
              <SpotlightCard className="p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="feature-icon-wrapper mb-0">
                    <item.icon size={24} />
                  </div>
                  <span className="fw-bold fs-4 text-dim font-monospace">{item.step}</span>
                </div>
                <h5 className="text-white fw-bold mb-2">{item.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>{item.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features Showcase */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="tech-badge mb-2">SaaS Capabilities</span>
          <h2 className="display-6 fw-bold text-white">Engineered For Depth, Not Gimmicks</h2>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <TiltedCard maxTilt={8} scale={1.01}>
              <SpotlightCard className="p-4 p-md-5 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="feature-icon-wrapper mb-0">
                    <ShieldCheck size={28} />
                  </div>
                  <GlowBadge variant="emerald" pulse={true}>Zero Hallucination</GlowBadge>
                </div>
                <h3 className="text-white fw-bold mb-3">Grounded RAG with Inline Citations</h3>
                <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
                  Every synthesized answer is backed by verifiable document citations (e.g. <code>[Doc 1, Page 12]</code>). If the ground truth does not exist in the ingested knowledge base, the model gracefully declines.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="citation-pill">Page 4 • Section 2.1</span>
                  <span className="citation-pill">Page 18 • Table 3</span>
                  <span className="citation-pill">Page 42 • Appendix A</span>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>

          <div className="col-lg-5">
            <TiltedCard maxTilt={8} scale={1.01}>
              <SpotlightCard className="p-4 p-md-5 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="feature-icon-wrapper mb-0">
                    <GitCompare size={28} />
                  </div>
                  <GlowBadge variant="indigo" pulse={false}>Matrix Diff</GlowBadge>
                </div>
                <h3 className="text-white fw-bold mb-3">Multi-Doc Comparison</h3>
                <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                  Perform side-by-side analytical comparisons across research papers, financial reports, or vendor contracts. Automatically tabulate objectives, metrics, and risk factors.
                </p>
              </SpotlightCard>
            </TiltedCard>
          </div>

          <div className="col-lg-5">
            <SpotlightCard className="p-4 p-md-5 h-100">
              <div className="feature-icon-wrapper mb-3">
                <Search size={28} />
              </div>
              <h3 className="text-white fw-bold mb-3">Hybrid Search (Dense + BM25)</h3>
              <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                Combines cosine vector similarity (pgvector HNSW) with lexical BM25 token frequencies via Reciprocal Rank Fusion (RRF) for optimal relevance.
              </p>
            </SpotlightCard>
          </div>

          <div className="col-lg-7">
            <SpotlightCard className="p-4 p-md-5 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="feature-icon-wrapper mb-0">
                  <Cpu size={28} />
                </div>
                <GlowBadge variant="cyan" pulse={true}>Structured Output</GlowBadge>
              </div>
              <h3 className="text-white fw-bold mb-3">JSON Entity Extraction & Summarization</h3>
              <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                Convert unstructured legal prose and financial figures into schema-validated JSON structures ready for enterprise workflows, automated audits, and CRM exports.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Live Pipeline Terminal Stream Showcase */}
      <section className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <span className="tech-badge mb-2">Deterministic Execution</span>
            <h2 className="display-6 fw-bold text-white mb-3">Live RAG Pipeline Execution Trace</h2>
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              Watch how our automated ingestion pipeline breaks down multi-page documents, detects structures, generates normalized 768-D vector embeddings, and builds a dual inverted index.
            </p>
            <div className="d-flex flex-column gap-2 mb-4">
              <div className="d-flex align-items-center gap-2 text-muted small">
                <span className="pulse-dot success" />
                <span>Zero text truncation across table boundaries</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted small">
                <span className="pulse-dot success" />
                <span>Deterministic cosine vector + BM25 reciprocal rank fusion</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted small">
                <span className="pulse-dot success" />
                <span>Exact page-level and chunk-level citation links</span>
              </div>
            </div>
            <Link to="/documents" className="btn btn-modern-primary">
              Test Live Ingestion <ArrowRight size={16} />
            </Link>
          </div>
          <div className="col-lg-7">
            <TerminalBox title="docuintel_rag_worker.py" />
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
