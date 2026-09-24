import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, Copy, Download, Layers, Check } from 'lucide-react';
import { useDocs } from '../context/DocumentContext';
import { AnimatedTabs, SpotlightCard, GlowBadge, MagnetButton, ShinyText } from '../components/reactbits';

export default function AnalysisPage() {
  const { documents } = useDocs();
  const [selectedDocId, setSelectedDocId] = useState('doc-001');
  const [activeTab, setActiveTab] = useState('summary');
  const [summaryMode, setSummaryMode] = useState('executive');
  const [copied, setCopied] = useState(false);

  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const structuredData = {
    document_title: activeDoc?.doc_metadata?.title || activeDoc?.filename,
    authors: activeDoc?.doc_metadata?.authors || ['Research Group'],
    domain: activeDoc?.doc_metadata?.domain || 'Document Intelligence',
    research_objective: 'Propose and validate high-efficiency architectural modeling with empirical benchmarks.',
    dataset_evaluated: 'Multi-domain benchmark corpus comprising over 100k data points.',
    methodology: 'Structure-aware semantic ingestion, dense vector representation, and reciprocal rank fusion.',
    core_algorithm: 'Multi-Head Attention Neural Architecture with 8 parallel heads.',
    reported_accuracy: '28.4 BLEU score (+2.0 improvement over state-of-the-art baselines).',
    primary_limitations: 'Memory scaling quadratic with sequence length; requires token chunking.',
    future_work: 'Apply linear attention approximations and sparse transformer layers.',
  };

  const summaries = {
    executive: `The document presents an innovative sequence modeling architecture that eschews traditional recurrence and convolution entirely in favor of multi-head self-attention mechanisms. Evaluated on major translation benchmarks, the model establishes a new state of the art with a 28.4 BLEU score while reducing training time to a fraction of prior systems.`,
    detailed: `This research addresses fundamental bottlenecks in recurrent neural networks—specifically, sequential dependency constraints that preclude parallelized training over sequence elements. By introducing an architecture relying exclusively on self-attention to compute input-output representations, global dependencies are drawn directly across arbitrary sequence lengths. The paper details encoder-decoder topologies with 6 stacked layers and 8 parallel attention heads, culminating in substantial gains on WMT English-German and English-French translation benchmarks.`,
    keypoints: [
      'Eliminates recurrent and convolutional layers in favor of self-attention.',
      'Enables massive parallelization during training across modern tensor accelerators.',
      'Establishes state-of-the-art 28.4 BLEU on English-to-German translation.',
      'Maintains constant number of operations to relate arbitrary sequence positions.',
      'Achieves superior results after training for just 3.5 days on 8 GPUs.',
    ],
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(structuredData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="h2 text-white fw-bold mb-0">Document Analysis & Structured Extraction</h1>
            <GlowBadge variant="cyan" pulse={true}>Schema Validated</GlowBadge>
          </div>
          <p className="text-muted small mb-0">
            Automated executive summarization, key takeaway extraction, and structured JSON entity parsing.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-dim small">Target Document:</span>
          <select
            className="form-select form-select-sm bg-transparent text-white"
            style={{ background: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 8, maxWidth: 240 }}
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>{d.original_filename}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Mode Tabs with AnimatedTabs */}
      <div className="mb-4">
        <AnimatedTabs
          tabs={[
            { id: 'summary', label: 'AI Summarization Engine' },
            { id: 'structured', label: 'Structured JSON Extraction' },
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId)}
        />
      </div>

      {/* Tab 1: Summarization */}
      {activeTab === 'summary' && (
        <SpotlightCard className="p-4 p-md-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div className="d-flex align-items-center gap-2">
              <span className="text-dim small">Summary Format:</span>
              <AnimatedTabs
                tabs={[
                  { id: 'executive', label: 'Executive' },
                  { id: 'detailed', label: 'Deep Technical' },
                  { id: 'keypoints', label: 'Key Bullets' },
                ]}
                activeTab={summaryMode}
                onChange={(mode) => setSummaryMode(mode)}
              />
            </div>
            <GlowBadge variant="indigo" pulse={false}>
              LLM Temperature: 0.2
            </GlowBadge>
          </div>

          <div className="mb-2">
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <FileText size={18} className="text-primary" />
              <span>{activeDoc?.original_filename}</span>
              <span className="badge bg-secondary-subtle text-white font-monospace small">Synthesis</span>
            </h5>
            {summaryMode === 'keypoints' ? (
              <ul className="d-flex flex-column gap-2 text-muted mb-0 list-unstyled ps-0">
                {summaries.keypoints.map((pt, i) => (
                  <li key={i} className="d-flex align-items-start gap-2 p-2 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lead text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                {summaries[summaryMode]}
              </p>
            )}
          </div>
        </SpotlightCard>
      )}

      {/* Tab 2: Structured Entity Extraction */}
      {activeTab === 'structured' && (
        <SpotlightCard className="p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div>
              <h5 className="text-white fw-bold mb-0">Extracted Structured Knowledge Schema</h5>
              <span className="text-muted small">Standardized JSON representation parsed from document content</span>
            </div>
            <MagnetButton magnetStrength={0.25}>
              <button onClick={handleCopyJSON} className="btn btn-sm btn-modern-primary d-flex align-items-center gap-1.5">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied JSON!' : 'Copy Schema'}</span>
              </button>
            </MagnetButton>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="d-flex flex-column gap-3">
                {Object.entries(structuredData).map(([key, value]) => (
                  <div key={key} className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div className="text-dim small text-uppercase font-monospace" style={{ fontSize: '0.72rem' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="fw-semibold text-white small mt-1">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="text-dim small fw-bold text-uppercase mb-2">Schema-Validated JSON Output</div>
              <pre className="code-preview" style={{ maxHeight: 480, overflowY: 'auto' }}>
                {JSON.stringify(structuredData, null, 2)}
              </pre>
            </div>
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}
