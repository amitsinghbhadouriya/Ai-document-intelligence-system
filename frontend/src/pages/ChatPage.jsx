import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Sparkles, ShieldCheck, FileText, 
  Plus, Layers, ExternalLink, X, Check, Bot, User as UserIcon, Zap
} from 'lucide-react';
import gsap from 'gsap';
import { useDocs } from '../context/DocumentContext';
import { GlowBadge, MagnetButton, ShinyText, SpotlightCard } from '../components/reactbits';

export default function ChatPage() {
  const { documents, conversations, activeConvId, setActiveConvId, sendMessage, createNewConversation } = useDocs();
  const [inputText, setInputText] = useState('');
  const [activeCitation, setActiveCitation] = useState(null);
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt) => {
    sendMessage(activeConv.id, prompt);
  };

  return (
    <div className="container-fluid py-4 px-md-5" style={{ minHeight: '88vh' }}>
      <div className="row g-4" style={{ minHeight: '82vh' }}>
        
        {/* Left Sidebar: Conversations & Target Documents */}
        <div className="col-lg-3 d-flex flex-column gap-3">
          {/* New Chat Button */}
          <MagnetButton magnetStrength={0.2} className="w-100">
            <button
              onClick={() => createNewConversation('Research Chat ' + (conversations.length + 1))}
              className="btn btn-modern-primary w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <Plus size={18} />
              <span>New RAG Session</span>
            </button>
          </MagnetButton>

          {/* Conversations List */}
          <div className="glass-card p-3 flex-grow-1 overflow-auto" style={{ maxHeight: '38vh' }}>
            <div className="text-dim small fw-bold text-uppercase mb-2 ps-1">Recent Conversations</div>
            <div className="d-flex flex-column gap-1">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConvId(c.id)}
                  className={`btn text-start p-2 rounded text-truncate w-100 small d-flex align-items-center gap-2 ${activeConvId === c.id ? 'btn-modern-primary' : 'btn-modern-outline'}`}
                >
                  <MessageSquare size={14} className="flex-shrink-0" />
                  <span className="text-truncate">{c.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Document Context Filter */}
          <div className="glass-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-dim small fw-bold text-uppercase">Knowledge Sources</span>
              <GlowBadge variant="emerald" pulse={true}>
                {documents.length} Indexed
              </GlowBadge>
            </div>
            <div className="d-flex flex-column gap-2" style={{ maxHeight: '22vh', overflowY: 'auto' }}>
              {documents.map((doc) => (
                <div key={doc.id} className="d-flex align-items-center gap-2 p-2 rounded" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                  <FileText size={14} className="text-primary flex-shrink-0" />
                  <span className="small text-white text-truncate flex-grow-1" style={{ fontSize: '0.8rem' }}>
                    {doc.original_filename}
                  </span>
                  <Check size={14} className="text-success flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Chat Interface */}
        <div className={`col-lg-${activeCitation ? '6' : '9'} d-flex flex-column`}>
          <div className="glass-card d-flex flex-column flex-grow-1 p-3 p-md-4 position-relative" style={{ minHeight: '75vh' }}>
            
            {/* Chat Header */}
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div className="d-flex align-items-center gap-2">
                <Bot size={22} className="text-primary" />
                <div>
                  <h6 className="text-white fw-bold mb-0">{activeConv?.title || 'Document Q&A'}</h6>
                  <span className="small text-muted" style={{ fontSize: '0.75rem' }}>
                    Grounded Retrieval with <ShinyText text="pgvector & Gemini RAG" speed={3} />
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <GlowBadge variant="emerald" pulse={true}>
                  <ShieldCheck size={12} /> Grounded (Anti-Hallucination)
                </GlowBadge>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 overflow-auto pe-2 d-flex flex-column gap-4 mb-3" style={{ maxHeight: '56vh' }}>
              {activeConv?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex gap-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="feature-icon-wrapper mb-0 flex-shrink-0" style={{ width: 36, height: 36 }}>
                      <Bot size={18} className="text-primary" />
                    </div>
                  )}

                  <div
                    className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}
                  >
                    <div className="small mb-1 text-muted d-flex justify-content-between gap-3">
                      <span className="fw-semibold text-white">{msg.role === 'user' ? 'You' : 'DocuIntel Assistant'}</span>
                      {msg.grounding_score && (
                        <span className="badge bg-success-subtle text-success" style={{ fontSize: '0.65rem' }}>
                          Grounding: {msg.grounding_score} ({(msg.confidence_score * 100).toFixed(0)}%)
                        </span>
                      )}
                    </div>

                    <p className="mb-2" style={{ lineHeight: 1.6, fontSize: '0.92rem' }}>
                      {msg.content}
                    </p>

                    {/* Interactive Citation Buttons */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-top d-flex flex-wrap gap-2 align-items-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                        <span className="text-dim small" style={{ fontSize: '0.75rem' }}>Grounded Citations:</span>
                        {msg.citations.map((cite, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveCitation(cite)}
                            className="citation-pill border-0"
                          >
                            <span>[{cite.citation_index}] {cite.document_name} &bull; Page {cite.page_number}</span>
                            <ExternalLink size={10} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="feature-icon-wrapper mb-0 flex-shrink-0" style={{ width: 36, height: 36, background: 'rgba(99, 102, 241, 0.3)' }}>
                      <UserIcon size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Starter Prompts */}
            <div className="d-flex gap-2 overflow-auto pb-2 mb-2">
              {[
                'What is the main architecture and methodology used?',
                'Which benchmark datasets and samples were evaluated?',
                'What are the primary performance metrics and limitations?',
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(p)}
                  className="btn btn-sm btn-modern-outline text-nowrap small text-muted"
                  style={{ fontSize: '0.75rem' }}
                >
                  <Sparkles size={12} className="text-warning me-1" />
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="d-flex gap-2">
              <input
                type="text"
                className="form-control bg-transparent text-white border-0 py-2 px-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 10 }}
                placeholder="Ask a question about the uploaded documents (e.g., 'What methodology was used?')..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="btn btn-modern-primary px-3" disabled={!inputText.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Drawer: Clickable Citation Inspector with SpotlightCard */}
        {activeCitation && (
          <div className="col-lg-3">
            <SpotlightCard className="p-4 h-100" style={{ background: '#0e1526', borderColor: 'rgba(6, 182, 212, 0.4)' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <ShieldCheck size={18} className="text-info" />
                  <h6 className="text-white fw-bold mb-0">Citation [{activeCitation.citation_index}]</h6>
                </div>
                <button
                  onClick={() => setActiveCitation(null)}
                  className="btn btn-sm btn-link text-muted p-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-3">
                <div className="text-dim small mb-1">Source Document</div>
                <div className="fw-semibold text-white small text-break">{activeCitation.document_name}</div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2.5 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-dim small" style={{ fontSize: '0.7rem' }}>Page Number</div>
                    <div className="fw-bold text-white">Page {activeCitation.page_number}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2.5 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-dim small" style={{ fontSize: '0.7rem' }}>Vector Similarity</div>
                    <div className="fw-bold text-info">{(activeCitation.similarity_score * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              {/* Relevance Gauge */}
              <div className="mb-3">
                <div className="d-flex justify-content-between small text-dim mb-1">
                  <span>Cosine Grounding Score</span>
                  <span className="text-info font-monospace">{(activeCitation.similarity_score * 100).toFixed(0)}/100</span>
                </div>
                <div className="score-meter">
                  <div
                    className="score-meter-fill"
                    style={{ width: `${Math.min(100, Math.max(30, activeCitation.similarity_score * 100))}%` }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="text-dim small mb-1">Section Context</div>
                <GlowBadge variant="indigo" pulse={false}>
                  {activeCitation.section_title || 'General Content'}
                </GlowBadge>
              </div>

              <div>
                <div className="text-dim small mb-1">Verbatim Retrieved Passage</div>
                <div className="p-3 rounded font-monospace small text-white-50" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', lineHeight: 1.5, fontSize: '0.8rem' }}>
                  "{activeCitation.snippet}"
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}
      </div>
    </div>
  );
}
