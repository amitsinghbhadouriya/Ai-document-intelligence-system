import React, { useState, useEffect } from 'react';

const DEFAULT_LOGS = [
  { time: '10:00:01', type: 'info', text: 'Document ingested: "Annual_Financial_Report_2024.pdf" [72 pages]' },
  { time: '10:00:02', type: 'info', text: 'PyMuPDF parsed 72 pages, extracted 24 tables & OCR visual blocks' },
  { time: '10:00:03', type: 'success', text: 'Structure-aware chunker generated 184 chunks (mean tokens: 462)' },
  { time: '10:00:04', type: 'info', text: 'Embedding pipeline active: text-embedding-004 (768 dimensions)' },
  { time: '10:00:05', type: 'success', text: 'Vector index updated in PostgreSQL pgvector HNSW index' },
  { time: '10:00:06', type: 'cyan', text: 'BM25 inverted index updated with token frequencies (RRF k=60)' },
  { time: '10:00:07', type: 'success', text: 'Ready for hybrid retrieval: Top-K=5, similarity_threshold=0.72' },
];

export default function TerminalBox({
  title = 'rag_pipeline_stream.sh',
  logs = DEFAULT_LOGS,
  className = '',
  autoScroll = true,
}) {
  const [currentLogs, setCurrentLogs] = useState(logs.slice(0, 3));

  useEffect(() => {
    let index = 3;
    const timer = setInterval(() => {
      if (index < logs.length) {
        setCurrentLogs((prev) => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [logs]);

  return (
    <div className={`terminal-box ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <div className="small text-muted font-monospace">{title}</div>
        <div className="small text-success font-monospace" style={{ fontSize: '0.72rem' }}>
          LIVE
        </div>
      </div>
      <div className="terminal-body">
        {currentLogs.map((log, i) => (
          <div key={i} className="mb-1 d-flex gap-2">
            <span className="text-dim">[{log.time}]</span>
            <span
              className={
                log.type === 'success'
                  ? 'text-success'
                  : log.type === 'cyan'
                  ? 'text-info'
                  : log.type === 'warn'
                  ? 'text-warning'
                  : 'text-light'
              }
            >
              {log.type === 'success' ? '✓ ' : log.type === 'cyan' ? '⚡ ' : '• '}
              {log.text}
            </span>
          </div>
        ))}
        <div className="text-secondary font-monospace mt-2">
          <span className="text-primary">$</span> <span className="shiny-text">awaiting queries...</span>
        </div>
      </div>
    </div>
  );
}
