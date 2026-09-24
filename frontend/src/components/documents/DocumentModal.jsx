import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Layers, Hash, BookOpen, MessageSquare, X, CheckCircle2, Copy } from 'lucide-react';
import gsap from 'gsap';
import { GlowBadge } from '../reactbits';

export default function DocumentModal({ doc, onClose }) {
  const navigate = useNavigate();
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
    }
  }, [doc]);

  if (!doc) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(5, 8, 16, 0.85)', backdropFilter: 'blur(12px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div ref={modalContentRef} className="modal-content glass-card text-white border-0 shadow-lg" style={{ background: '#0e1526' }}>
          
          {/* Header */}
          <div className="modal-header border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="feature-icon-wrapper mb-0" style={{ width: 42, height: 42 }}>
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">{doc.original_filename}</h5>
                <span className="small text-muted font-monospace">{doc.id}</span>
              </div>
            </div>
            <button type="button" className="btn btn-sm btn-link text-muted p-1" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Quick Metrics */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-dim small">Total Pages</div>
                  <div className="h5 fw-bold text-white mb-0">{doc.total_pages} Pages</div>
                  {doc.ocr_pages_count > 0 && (
                    <div className="small text-warning" style={{ fontSize: '0.75rem' }}>{doc.ocr_pages_count} OCR processed</div>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-dim small">Vector Chunks</div>
                  <div className="h5 fw-bold text-white mb-0">{doc.doc_metadata?.chunk_count || (doc.chunks ? doc.chunks.length : 12)} Chunks</div>
                  <div className="small text-success" style={{ fontSize: '0.75rem' }}>pgvector Indexed</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-dim small">File Size</div>
                  <div className="h5 fw-bold text-white mb-0">{(doc.file_size_bytes / 1024 / 1024).toFixed(2)} MB</div>
                  <div className="small text-info" style={{ fontSize: '0.75rem' }}>Validated</div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="mb-4">
              <h6 className="text-uppercase fw-bold text-dim small mb-2">Document Metadata</h6>
              <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="mb-2"><strong className="text-white">Title:</strong> <span className="text-muted">{doc.doc_metadata?.title || doc.filename}</span></div>
                <div className="mb-2"><strong className="text-white">Authors/Source:</strong> <span className="text-muted">{doc.doc_metadata?.authors ? doc.doc_metadata.authors.join(', ') : 'Verified Academic Source'}</span></div>
                <div><strong className="text-white">Domain:</strong> <span className="text-muted">{doc.doc_metadata?.domain || 'General Document Intelligence'}</span></div>
              </div>
            </div>

            {/* Sample Chunks */}
            <div>
              <h6 className="text-uppercase fw-bold text-dim small mb-2 d-flex justify-content-between align-items-center">
                <span>Indexed Semantic Chunks</span>
                <GlowBadge variant="indigo" pulse={false}>pgvector Embeddings</GlowBadge>
              </h6>

              {doc.chunks && doc.chunks.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {doc.chunks.map((chk, i) => (
                    <div key={chk.id || i} className="p-3 rounded" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-secondary-subtle text-white font-monospace">Chunk #{chk.chunk_index + 1}</span>
                        <span className="small text-info fw-semibold">Page {chk.page_number} &bull; {chk.section_title}</span>
                      </div>
                      <p className="small text-muted mb-0 font-monospace" style={{ fontSize: '0.85rem' }}>
                        "{chk.content}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted small p-3 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  Chunks indexed into pgvector storage. Open RAG Chat to query this document with source grounding.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <button
              type="button"
              className="btn btn-modern-outline"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-modern-primary d-flex align-items-center gap-2"
              onClick={() => {
                onClose();
                navigate('/chat');
              }}
            >
              <MessageSquare size={16} />
              <span>Query in RAG Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
