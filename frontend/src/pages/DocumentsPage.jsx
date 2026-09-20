import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, FileText, Search, Trash2, MessageSquare, Eye, 
  CheckCircle2, Clock, AlertTriangle, Filter, Sparkles, Plus
} from 'lucide-react';
import { useDocs } from '../context/DocumentContext';
import DocumentModal from '../components/documents/DocumentModal';

export default function DocumentsPage() {
  const { documents, uploadDocument, deleteDocument } = useDocs();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeModalDoc, setActiveModalDoc] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    try {
      await uploadDocument(file);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 600);
    } catch (err) {
      setIsUploading(false);
      alert('Upload failed: ' + err.message);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.doc_metadata?.title && doc.doc_metadata.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterType === 'PDF') return matchesSearch && doc.file_type.includes('pdf');
    if (filterType === 'DOCX') return matchesSearch && !doc.file_type.includes('pdf');
    if (filterType === 'OCR') return matchesSearch && doc.ocr_pages_count > 0;
    return matchesSearch;
  });

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="h2 text-white fw-bold mb-0">Document Knowledge Hub</h1>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{documents.length} Indexed</span>
          </div>
          <p className="text-muted small mb-0">
            Upload, parse, chunk, and inspect documents stored with high-dimensional vector embeddings.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-modern-primary d-inline-flex align-items-center gap-2"
          disabled={isUploading}
        >
          <Plus size={18} />
          <span>Upload Document</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
          className="d-none"
        />
      </div>

      {/* Upload Zone & Progress */}
      {isUploading && (
        <div className="glass-card p-4 mb-4" style={{ borderColor: 'var(--accent-primary)' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="pulse-dot success"></span>
              <span className="fw-semibold text-white small">Extracting Text, Running OCR & Chunking Vector Space...</span>
            </div>
            <span className="small text-muted font-monospace">{uploadProgress}%</span>
          </div>
          <div className="progress" style={{ height: 6, background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
              style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
            ></div>
          </div>
        </div>
      )}

      {/* Drag & Drop Card */}
      <div
        className="glass-card p-4 p-md-5 text-center mb-4 cursor-pointer"
        style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: 'rgba(99, 102, 241, 0.35)', cursor: 'pointer' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="feature-icon-wrapper mx-auto mb-3">
          <UploadCloud size={28} />
        </div>
        <h5 className="text-white fw-bold mb-1">Click to Upload or Drag & Drop Documents</h5>
        <p className="text-muted small mb-2">Supports PDF, DOCX, and TXT files (up to 25 MB)</p>
        <div className="d-flex justify-content-center gap-2">
          <span className="tech-badge">PyMuPDF Engine</span>
          <span className="tech-badge">Tesseract OCR</span>
          <span className="tech-badge">pgvector HNSW</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 text-muted ps-2">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control bg-transparent text-white border-0"
                placeholder="Filter indexed documents by name or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end gap-2">
            {['ALL', 'PDF', 'DOCX', 'OCR'].map((type) => (
              <button
                key={type}
                className={`btn btn-sm ${filterType === type ? 'btn-modern-primary' : 'btn-modern-outline'}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="glass-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover table-dark mb-0 align-middle" style={{ background: 'transparent' }}>
            <thead>
              <tr className="text-dim small text-uppercase" style={{ borderColor: 'var(--border-subtle)' }}>
                <th className="ps-4">Document</th>
                <th>Pages & OCR</th>
                <th>File Size</th>
                <th>Status</th>
                <th>Uploaded</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No documents found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} style={{ borderColor: 'var(--border-subtle)' }}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="feature-icon-wrapper mb-0" style={{ width: 36, height: 36 }}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className="fw-semibold text-white mb-0" style={{ maxWidth: 280, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {doc.original_filename}
                          </div>
                          <div className="small text-muted" style={{ fontSize: '0.75rem' }}>
                            {doc.doc_metadata?.title || 'Processed Document'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-white fw-semibold">{doc.total_pages} pgs</span>
                        {doc.ocr_pages_count > 0 && (
                          <span className="badge bg-warning-subtle text-warning" style={{ fontSize: '0.7rem' }}>
                            {doc.ocr_pages_count} OCR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-muted small">
                      {(doc.file_size_bytes / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td>
                      <span className={`badge ${doc.status === 'PROCESSED' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} d-inline-flex align-items-center gap-1`}>
                        <span className={`pulse-dot ${doc.status === 'PROCESSED' ? 'success' : 'warning'}`} style={{ width: 6, height: 6 }}></span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          className="btn btn-sm btn-modern-outline p-1 px-2"
                          title="Inspect Metadata and Chunks"
                          onClick={() => setActiveModalDoc(doc)}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="btn btn-sm btn-modern-primary p-1 px-2"
                          title="Chat with Document"
                          onClick={() => navigate('/chat')}
                        >
                          <MessageSquare size={15} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger p-1 px-2"
                          title="Delete Document"
                          onClick={() => {
                            if (window.confirm(`Delete ${doc.original_filename}?`)) {
                              deleteDocument(doc.id);
                            }
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Document Modal */}
      {activeModalDoc && (
        <DocumentModal doc={activeModalDoc} onClose={() => setActiveModalDoc(null)} />
      )}
    </div>
  );
}
