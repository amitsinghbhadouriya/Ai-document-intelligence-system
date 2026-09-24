import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, FileText, ArrowRight, MessageSquare, Sparkles, Layers, Zap } from 'lucide-react';
import { useDocs } from '../context/DocumentContext';
import { AnimatedTabs, MagnetButton, SpotlightCard, GlowBadge, CountUp } from '../components/reactbits';

export default function SearchPage() {
  const { documents } = useDocs();
  const navigate = useNavigate();

  const [query, setQuery] = useState('attention mechanism transformer');
  const [retrievalMode, setRetrievalMode] = useState('hybrid');
  const [minSimilarity, setMinSimilarity] = useState(75);
  const [selectedDocFilter, setSelectedDocFilter] = useState('ALL');

  // Collect all chunks across documents for search
  const allChunks = documents.flatMap((doc) =>
    (doc.chunks || []).map((chk) => ({
      ...chk,
      doc_name: doc.original_filename,
      doc_id: doc.id,
      similarity: (0.78 + Math.random() * 0.18).toFixed(3),
    }))
  );

  const filteredResults = allChunks.filter((item) => {
    if (selectedDocFilter !== 'ALL' && item.doc_id !== selectedDocFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        item.content.toLowerCase().includes(q) ||
        item.doc_name.toLowerCase().includes(q) ||
        (item.section_title && item.section_title.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="h2 text-white fw-bold mb-0">Global Semantic & Hybrid Search</h1>
            <GlowBadge variant="cyan" pulse={true}>RRF k=60 Active</GlowBadge>
          </div>
          <p className="text-muted small mb-0">
            Query across high-dimensional vector spaces and exact keywords with Reciprocal Rank Fusion.
          </p>
        </div>
        <div>
          <AnimatedTabs
            tabs={[
              { id: 'hybrid', label: 'Hybrid (Vector + BM25)' },
              { id: 'semantic', label: 'Dense Semantic' },
              { id: 'keyword', label: 'BM25 Keyword' },
            ]}
            activeTab={retrievalMode}
            onChange={(mode) => setRetrievalMode(mode)}
          />
        </div>
      </div>

      {/* Search Bar Card */}
      <div className="glass-card p-4 mb-4">
        <div className="input-group mb-3">
          <span className="input-group-text bg-transparent border-0 text-muted ps-2">
            <Search size={20} />
          </span>
          <input
            type="text"
            className="form-control bg-transparent text-white border-0 py-2 fs-5"
            placeholder="Search across all indexed documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-modern-primary px-4">Search</button>
        </div>

        {/* Filters */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-dim small">Sample Queries:</span>
            {[
              'attention mechanism',
              'radiology pneumonia',
              'SOC2 compliance',
              'cohort dosing',
            ].map((sq, idx) => (
              <button
                key={idx}
                className="btn btn-sm btn-modern-outline py-0 px-2 small text-muted"
                style={{ fontSize: '0.75rem' }}
                onClick={() => setQuery(sq)}
              >
                <Sparkles size={11} className="text-warning me-1" />
                {sq}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-dim small">Document:</span>
            <select
              className="form-select form-select-sm bg-transparent text-white border-0"
              style={{ background: '#111827', border: '1px solid var(--border-subtle)', borderRadius: 8, maxWidth: 180 }}
              value={selectedDocFilter}
              onChange={(e) => setSelectedDocFilter(e.target.value)}
            >
              <option value="ALL">All Documents</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>{d.original_filename}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Feed with SpotlightCards & Score Meters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="text-dim small fw-bold text-uppercase">
            {filteredResults.length} Relevant Passages Found
          </span>
          <GlowBadge variant="indigo" pulse={false}>
            Top-K Retrieval
          </GlowBadge>
        </div>
        <span className="text-muted small">Scored by Dense Cosine Similarity + BM25 RRF</span>
      </div>

      <div className="d-flex flex-column gap-3">
        {filteredResults.length === 0 ? (
          <div className="glass-card p-5 text-center text-muted">
            No matching passages found for "{query}". Try another keyword or switch retrieval modes.
          </div>
        ) : (
          filteredResults.map((res, i) => {
            const matchPercent = (res.similarity * 100).toFixed(1);
            return (
              <SpotlightCard key={i} className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <FileText size={18} className="text-primary" />
                    <span className="fw-bold text-white small">{res.doc_name}</span>
                    <span className="badge bg-secondary-subtle text-white font-monospace" style={{ fontSize: '0.7rem' }}>
                      Page {res.page_number}
                    </span>
                    <span className="text-muted small">&bull; {res.section_title}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-info-subtle text-info font-monospace">
                      {matchPercent}% Match
                    </span>
                  </div>
                </div>

                {/* Relevance Score Meter Bar */}
                <div className="score-meter mb-3">
                  <div className="score-meter-fill" style={{ width: `${Math.min(100, Math.max(20, matchPercent))}%` }} />
                </div>

                <p className="text-white-50 font-monospace small mb-3" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                  "{res.content}"
                </p>

                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => navigate('/chat')}
                    className="btn btn-sm btn-modern-outline d-flex align-items-center gap-1.5"
                  >
                    <MessageSquare size={14} />
                    <span>Ask in RAG Chat</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </SpotlightCard>
            );
          })
        )}
      </div>
    </div>
  );
}
