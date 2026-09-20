import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 text-white fw-bold">Grounded RAG Studio</h1>
          <p className="text-muted">Chat with single or multi-document context with verifiable page citations.</p>
        </div>
        <span className="tech-badge"><Clock size={14} /> Phase 7 Component</span>
      </div>

      <div className="glass-card p-5 text-center">
        <div className="feature-icon-wrapper mx-auto mb-3">
          <MessageSquare size={28} />
        </div>
        <h4 className="text-white fw-bold mb-2">Conversational AI Engine Ready</h4>
        <p className="text-muted small mx-auto mb-3" style={{ maxWidth: 450 }}>
          The chat studio integrates dense vector retrieval with LLM synthesis, offering interactive source citations and hallucination control.
        </p>
      </div>
    </div>
  );
}
