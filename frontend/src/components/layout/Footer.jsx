import React from 'react';
import { Cpu, ShieldCheck, Database, Layers, GitBranch, Terminal } from 'lucide-react';
import { ShinyText, GlowBadge } from '../reactbits';

export default function Footer() {
  return (
    <footer className="mt-auto py-5 border-top position-relative" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(7, 10, 18, 0.95)' }}>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row g-4 justify-content-between">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="feature-icon-wrapper mb-0" style={{ width: 36, height: 36, borderRadius: 10 }}>
                <Cpu size={18} className="text-white" />
              </div>
              <span className="fw-bold fs-5 text-white">
                Docu<span className="text-gradient">Intel</span>
              </span>
              <GlowBadge variant="cyan" pulse={false} className="ms-2">
                v1.0-PRO
              </GlowBadge>
            </div>
            <p className="text-muted small mb-3" style={{ maxWidth: 360, lineHeight: 1.6 }}>
              Enterprise-grade document intelligence platform featuring structure-aware chunking, pgvector semantic indexing, hybrid BM25 retrieval, and grounded RAG with exact page citations.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="tech-badge"><Database size={12} /> pgvector</span>
              <span className="tech-badge"><Layers size={12} /> BM25 Hybrid</span>
              <span className="tech-badge"><ShieldCheck size={12} /> Grounded Citations</span>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="text-white fw-bold mb-3">Core Modules</h6>
            <ul className="list-unstyled small text-muted d-flex flex-column gap-2">
              <li>Document Ingestion & OCR</li>
              <li>Semantic & Hybrid Search</li>
              <li>Multi-Doc Comparison</li>
              <li>Structured JSON Extraction</li>
              <li>Empirical RAG Benchmarks</li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="text-white fw-bold mb-3">Engineering & Architecture</h6>
            <p className="text-muted small mb-2">
              Bachelor of Computer Applications (BCA) Project. Built with GSAP & React Bits component architecture.
            </p>
            <div className="d-flex align-items-center gap-2 small text-muted mt-2">
              <GitBranch size={14} className="text-primary" />
              <a
                href="https://github.com/amitsinghbhadouriya/Ai-document-intelligence-system.git"
                target="_blank"
                rel="noreferrer"
                className="text-info text-decoration-none"
              >
                amitsinghbhadouriya/Ai-document-intelligence-system
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-muted">
          <span>&copy; {new Date().getFullYear()} DocuIntel AI. All rights reserved.</span>
          <span className="text-dim">
            Powered by <ShinyText text="FastAPI, React 18, GSAP & pgvector" speed={3} />
          </span>
        </div>
      </div>
    </footer>
  );
}
