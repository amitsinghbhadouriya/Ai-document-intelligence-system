import React from 'react';
import { Search, Clock } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">Semantic & Hybrid Search</h1>
          <p className="text-muted">Retrieve relevant passages across your entire document knowledge base.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 6 Component</span>
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="input-group">
          <span className="input-group-text bg-transparent border-0 text-muted ps-3">
            <Search size={20} />
          </span>
          <input
            type="text"
            className="form-control bg-transparent text-white border-0 py-3"
            placeholder="Search across all documents by semantic meaning or exact terms..."
            disabled
          />
          <button className="btn btn-modern-primary px-4" disabled>Search</button>
        </div>
      </div>
    </div>
  );
}
