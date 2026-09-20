import React from 'react';
import { GitCompare, Clock } from 'lucide-react';

export default function ComparePage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">Multi-Document Comparison</h1>
          <p className="text-muted">Generate cross-document comparison matrices and structured diffs.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 8 Component</span>
      </div>

      <div className="glass-card p-5 text-center">
        <div className="feature-icon-wrapper mx-auto mb-3">
          <GitCompare size={28} />
        </div>
        <h4 className="text-white fw-bold mb-2">Comparative Analytics Matrix</h4>
        <p className="text-muted small mx-auto mb-3" style={{ maxWidth: 450 }}>
          Compare multiple research papers, agreements, or reports side-by-side across key dimensions.
        </p>
      </div>
    </div>
  );
}
