import React, { useState } from 'react';
import { GitCompare, Download, CheckCircle2, Sparkles, FileText } from 'lucide-react';
import { COMPARISON_DATA } from '../services/mockData';
import { useDocs } from '../context/DocumentContext';

export default function ComparePage() {
  const { documents } = useDocs();
  const [selectedDocIds, setSelectedDocIds] = useState(['doc-001', 'doc-002', 'doc-003']);
  const [isComparing, setIsComparing] = useState(false);

  const toggleDoc = (id) => {
    if (selectedDocIds.includes(id)) {
      if (selectedDocIds.length > 2) setSelectedDocIds(selectedDocIds.filter((d) => d !== id));
    } else {
      if (selectedDocIds.length < 3) setSelectedDocIds([...selectedDocIds, id]);
    }
  };

  const handleExportCSV = () => {
    let csv = COMPARISON_DATA.columns.join(',') + '\n';
    COMPARISON_DATA.rows.forEach((r) => {
      csv += `"${r.feature}","${r.docA}","${r.docB}","${r.docC}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document_comparison_matrix.csv';
    a.click();
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(COMPARISON_DATA, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document_comparison_matrix.json';
    a.click();
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 text-white fw-bold mb-1">Multi-Document Comparison Studio</h1>
          <p className="text-muted small mb-0">
            Compare research methodologies, benchmarks, datasets, algorithms, and limitations across documents.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={handleExportCSV} className="btn btn-sm btn-modern-outline d-flex align-items-center gap-1">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button onClick={handleExportJSON} className="btn btn-sm btn-modern-primary d-flex align-items-center gap-1">
            <Download size={14} />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Document Selector Pills */}
      <div className="glass-card p-4 mb-4">
        <div className="text-dim small fw-bold text-uppercase mb-3">
          Select 2 or 3 Documents to Compare Side-by-Side:
        </div>
        <div className="d-flex flex-wrap gap-2">
          {documents.map((doc) => {
            const isSelected = selectedDocIds.includes(doc.id);
            return (
              <button
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`btn btn-sm d-flex align-items-center gap-2 ${isSelected ? 'btn-modern-primary' : 'btn-modern-outline'}`}
              >
                <FileText size={14} />
                <span>{doc.original_filename}</span>
                {isSelected && <CheckCircle2 size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-bordered table-dark mb-0 align-middle" style={{ borderColor: 'var(--border-subtle)', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                {COMPARISON_DATA.columns.map((col, idx) => (
                  <th key={idx} className={`p-3 fw-bold ${idx === 0 ? 'text-dim text-uppercase small' : 'text-white'}`} style={{ minWidth: idx === 0 ? 180 : 260 }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.rows.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderColor: 'var(--border-subtle)' }}>
                  <td className="p-3 fw-bold text-white bg-dark-subtle" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {row.feature}
                  </td>
                  <td className="p-3 text-muted small" style={{ lineHeight: 1.6 }}>
                    {row.docA}
                  </td>
                  <td className="p-3 text-muted small" style={{ lineHeight: 1.6 }}>
                    {row.docB}
                  </td>
                  <td className="p-3 text-muted small" style={{ lineHeight: 1.6 }}>
                    {row.docC}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
