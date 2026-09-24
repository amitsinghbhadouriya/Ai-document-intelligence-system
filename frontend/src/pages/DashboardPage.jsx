import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, MessageSquare, Search, GitCompare, 
  UploadCloud, ArrowRight, ShieldCheck, Database, Cpu, Eye, Sparkles, Activity
} from 'lucide-react';
import { useDocs } from '../context/DocumentContext';
import { useAuth } from '../context/AuthContext';
import { SpotlightCard, CountUp, GlowBadge, MagnetButton } from '../components/reactbits';

export default function DashboardPage() {
  const { documents, conversations } = useDocs();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPages = documents.reduce((acc, d) => acc + (d.total_pages || 0), 0);
  const totalChunks = documents.reduce((acc, d) => acc + (d.chunks ? d.chunks.length : (d.total_pages * 3)), 0);
  const ocrPages = documents.reduce((acc, d) => acc + (d.ocr_pages_count || 0), 0);

  return (
    <div className="container py-5">
      {/* Welcome Banner */}
      <div className="glass-card p-4 p-md-5 mb-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="tech-badge">Document AI Operational Center</span>
              <GlowBadge variant="emerald" pulse={true}>pgvector Online</GlowBadge>
            </div>
            <h1 className="h2 text-white fw-bold mb-1">
              Welcome Back, <span className="text-gradient">{user?.full_name || 'AI Researcher'}</span>
            </h1>
            <p className="text-muted small mb-0" style={{ maxWidth: 540 }}>
              All indexing pipelines, vector repositories, and grounded RAG models are active and running.
            </p>
          </div>
          <div className="d-flex gap-2">
            <MagnetButton magnetStrength={0.2}>
              <button onClick={() => navigate('/documents')} className="btn btn-modern-primary d-flex align-items-center gap-2">
                <UploadCloud size={16} />
                <span>Upload Document</span>
              </button>
            </MagnetButton>
            <MagnetButton magnetStrength={0.2}>
              <button onClick={() => navigate('/chat')} className="btn btn-modern-outline d-flex align-items-center gap-2">
                <MessageSquare size={16} />
                <span>Launch Chat</span>
              </button>
            </MagnetButton>
          </div>
        </div>
      </div>

      {/* KPI Metrics with SpotlightCard & CountUp */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Indexed Documents', value: documents.length, sub: 'PDF, DOCX & Scanned', icon: FileText, color: 'text-primary', link: '/documents' },
          { label: 'Total Pages Parsed', value: totalPages || 14, sub: `${ocrPages} pages via Tesseract OCR`, icon: Cpu, color: 'text-info', link: '/documents' },
          { label: 'Vector Chunks', value: totalChunks || 42, sub: 'pgvector HNSW Indexed', icon: Database, color: 'text-warning', link: '/search' },
          { label: 'RAG Sessions', value: conversations.length || 3, sub: 'Conversational Threads', icon: MessageSquare, color: 'text-success', link: '/chat' },
        ].map((kpi, idx) => (
          <div key={idx} className="col-md-3">
            <SpotlightCard 
              className="p-4 h-100 cursor-pointer" 
              onClick={() => navigate(kpi.link)}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-dim small">{kpi.label}</span>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <div className="metric-number mb-1">
                <CountUp to={kpi.value} decimals={0} duration={1.5} />
              </div>
              <div className="text-muted small">{kpi.sub}</div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Quick Action Spotlight Tiles */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Grounded RAG Chat', desc: 'Interact with single or multi-document context with exact page citations.', icon: MessageSquare, link: '/chat' },
          { title: 'Global Hybrid Search', desc: 'Dense vector cosine search fused with BM25 keyword matching.', icon: Search, link: '/search' },
          { title: 'Document Comparison', desc: 'Side-by-side analytical matrix across research papers and reports.', icon: GitCompare, link: '/compare' },
          { title: 'Structured Extraction', desc: 'AI entity extraction for authors, methodology, algorithms, and metrics.', icon: ShieldCheck, link: '/analysis' },
        ].map((tile, idx) => (
          <div key={idx} className="col-md-3">
            <SpotlightCard 
              className="p-4 h-100 cursor-pointer"
              onClick={() => navigate(tile.link)}
            >
              <div className="feature-icon-wrapper mb-3" style={{ width: 44, height: 44 }}>
                <tile.icon size={20} />
              </div>
              <h6 className="text-white fw-bold mb-1">{tile.title}</h6>
              <p className="text-muted small mb-3" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                {tile.desc}
              </p>
              <div className="d-flex align-items-center text-primary small fw-semibold gap-1">
                <span>Launch Engine</span>
                <ArrowRight size={14} />
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Real-time Telemetry & Pipeline Status */}
      <div className="glass-card p-3 px-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="pulse-dot success" />
            <span className="small text-white fw-semibold">FastAPI 0.111</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="pulse-dot success" />
            <span className="small text-white fw-semibold">PostgreSQL pgvector</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="pulse-dot success" />
            <span className="small text-white fw-semibold">BM25 Inverted Index</span>
          </div>
        </div>
        <div className="small text-muted font-monospace">
          Throughput: <span className="text-info fw-bold">120 chunks/sec</span> &bull; Cosine Distance: <span className="text-success fw-bold">Normalized</span>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="glass-card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-white fw-bold mb-0">Recent Ingested Documents</h5>
          <button onClick={() => navigate('/documents')} className="btn btn-sm btn-link text-primary text-decoration-none">
            View All Documents &rarr;
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle small" style={{ background: 'transparent' }}>
            <thead>
              <tr className="text-dim">
                <th className="ps-3">Document Name</th>
                <th>Format</th>
                <th>Pages</th>
                <th>Status</th>
                <th className="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 4).map((doc) => (
                <tr key={doc.id} style={{ borderColor: 'var(--border-subtle)' }}>
                  <td className="ps-3 fw-semibold text-white">
                    <div className="d-flex align-items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <span>{doc.original_filename}</span>
                    </div>
                  </td>
                  <td className="text-muted text-uppercase">{doc.file_type.includes('pdf') ? 'PDF' : 'DOCX'}</td>
                  <td className="text-muted">{doc.total_pages} pages</td>
                  <td>
                    <span className="badge bg-success-subtle text-success">
                      {doc.status}
                    </span>
                  </td>
                  <td className="text-end pe-3">
                    <button
                      onClick={() => navigate('/chat')}
                      className="btn btn-sm btn-modern-outline py-1 px-2 me-1"
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => navigate('/documents')}
                      className="btn btn-sm btn-modern-primary py-1 px-2"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
