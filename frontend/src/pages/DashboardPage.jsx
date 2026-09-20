import React from 'react';
import { LayoutDashboard, Clock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">Overview Dashboard</h1>
          <p className="text-muted">Repository statistics, document metrics, and recent activity.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 9 Component</span>
      </div>

      <div className="row g-4 mb-4">
        {[
          { label: 'Total Documents', value: '0', sub: 'Ready for upload' },
          { label: 'Document Pages', value: '0', sub: 'OCR & text parsed' },
          { label: 'Vector Chunks', value: '0', sub: 'pgvector indexed' },
          { label: 'Active Sessions', value: '0', sub: 'Conversations' },
        ].map((kpi, idx) => (
          <div key={idx} className="col-md-3">
            <div className="glass-card p-4">
              <div className="text-dim small mb-1">{kpi.label}</div>
              <div className="metric-number mb-1">{kpi.value}</div>
              <div className="text-muted small">{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5 text-center">
        <div className="feature-icon-wrapper mx-auto mb-3">
          <LayoutDashboard size={28} />
        </div>
        <h4 className="text-white fw-bold mb-2">Dashboard Analytics Ready for Ingestion</h4>
        <p className="text-muted small mx-auto mb-4" style={{ maxWidth: 450 }}>
          Once documents are uploaded and processed through the RAG pipeline in subsequent phases, live activity feeds and charts will appear here.
        </p>
      </div>
    </div>
  );
}
