import React from 'react';
import { FileText, UploadCloud, Clock } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">Document Hub</h1>
          <p className="text-muted">Manage, parse, and monitor document ingestion pipelines.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 3 Component</span>
      </div>

      <div className="glass-card p-5 text-center mb-4" style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: 'rgba(99, 102, 241, 0.4)' }}>
        <div className="feature-icon-wrapper mx-auto mb-3">
          <UploadCloud size={28} />
        </div>
        <h4 className="text-white fw-bold mb-2">Upload Documents</h4>
        <p className="text-muted small mx-auto mb-3" style={{ maxWidth: 450 }}>
          Support for PDF, DOCX, and TXT files. Automatic OCR trigger for scanned documents.
        </p>
        <button className="btn btn-modern-primary" disabled>
          Upload Document (Phase 3)
        </button>
      </div>
    </div>
  );
}
