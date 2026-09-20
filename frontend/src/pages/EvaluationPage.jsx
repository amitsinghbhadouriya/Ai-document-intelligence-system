import React from 'react';
import { Activity, Clock } from 'lucide-react';

export default function EvaluationPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">RAG Evaluation & Benchmarks</h1>
          <p className="text-muted">Empirical metrics for retrieval relevance, citation accuracy, and groundedness.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 10 Component</span>
      </div>

      <div className="glass-card p-5 text-center">
        <div className="feature-icon-wrapper mx-auto mb-3">
          <Activity size={28} />
        </div>
        <h4 className="text-white fw-bold mb-2">Empirical RAG Benchmark Suite</h4>
        <p className="text-muted small mx-auto mb-3" style={{ maxWidth: 450 }}>
          Measures real retrieval recall, hallucination mitigation score, and answer latency.
        </p>
      </div>
    </div>
  );
}
