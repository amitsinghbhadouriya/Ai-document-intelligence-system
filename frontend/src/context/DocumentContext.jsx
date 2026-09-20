import React, { createContext, useContext, useState } from 'react';
import { INITIAL_DOCUMENTS, INITIAL_CONVERSATIONS } from '../services/mockData';

const DocumentContext = createContext(null);

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('doc_list');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('doc_convs');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [activeConvId, setActiveConvId] = useState('conv-001');
  const [selectedDocId, setSelectedDocId] = useState(null);

  // Sync to localStorage
  const saveDocs = (newDocs) => {
    setDocuments(newDocs);
    localStorage.setItem('doc_list', JSON.stringify(newDocs));
  };

  const saveConvs = (newConvs) => {
    setConversations(newConvs);
    localStorage.setItem('doc_convs', JSON.stringify(newConvs));
  };

  const uploadDocument = async (file) => {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const isScanned = file.name.toLowerCase().includes('scan') || file.name.toLowerCase().includes('ocr');
    const pageCount = Math.floor(Math.random() * 12) + 3;
    const ocrCount = isScanned ? pageCount : (Math.random() > 0.7 ? 1 : 0);

    const newDoc = {
      id: 'doc-' + Date.now(),
      filename: file.name,
      original_filename: file.name,
      file_type: file.type || (ext === '.pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
      file_size_bytes: file.size,
      status: 'PROCESSING',
      total_pages: pageCount,
      ocr_pages_count: ocrCount,
      created_at: new Date().toISOString(),
      doc_metadata: {
        title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        authors: ['User Document Ingestion'],
        domain: ext === '.pdf' ? 'PDF Document' : 'Office Document',
        chunk_count: pageCount * 3,
      },
      chunks: [
        {
          id: 'chk-' + Date.now() + '-1',
          chunk_index: 0,
          page_number: 1,
          section_title: 'Executive Summary & Ingested Content',
          content: `Content extracted from ${file.name}. Validated format: ${ext}. Structure-aware chunking generated ${pageCount * 3} semantic units indexed in vector space.`,
          token_count: 140,
        },
      ],
    };

    const updated = [newDoc, ...documents];
    saveDocs(updated);

    // Simulate processing completion after 1.8s
    setTimeout(() => {
      setDocuments((currentDocs) => {
        const finished = currentDocs.map((d) => (d.id === newDoc.id ? { ...d, status: 'PROCESSED' } : d));
        localStorage.setItem('doc_list', JSON.stringify(finished));
        return finished;
      });
    }, 1800);

    return newDoc;
  };

  const deleteDocument = (id) => {
    const updated = documents.filter((d) => d.id !== id);
    saveDocs(updated);
  };

  const sendMessage = (convId, userText) => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: userText,
      created_at: new Date().toISOString(),
    };

    // Find a relevant document chunk to ground the answer
    const activeDoc = documents.find((d) => conv.selected_doc_ids.includes(d.id)) || documents[0];
    const chunk = activeDoc?.chunks[0] || {
      page_number: 1,
      section_title: 'Document Analysis',
      content: 'Information extracted from the indexed document repository.',
    };

    const assistantMsg = {
      id: 'msg-' + (Date.now() + 1),
      role: 'assistant',
      content: `Based on analysis of ${activeDoc?.filename || 'the selected documents'}, ${userText.toLowerCase().includes('dataset') ? 'the authors evaluate performance on standard multi-domain benchmarks' : userText.toLowerCase().includes('result') ? 'the proposed approach demonstrates superior accuracy and computational efficiency compared to legacy baselines' : 'the document outlines deterministic methodologies with empirical validation'} [1]. All findings are corroborated by retrieved vector chunks.`,
      grounding_score: 'HIGH',
      confidence_score: 0.94,
      created_at: new Date(Date.now() + 1000).toISOString(),
      citations: [
        {
          citation_index: 1,
          document_name: activeDoc?.filename || 'Document.pdf',
          page_number: chunk.page_number || 1,
          section_title: chunk.section_title || 'Methodology',
          snippet: chunk.content,
          similarity_score: 0.92,
        },
      ],
    };

    const updatedConvs = conversations.map((c) => {
      if (c.id === convId) {
        return {
          ...c,
          updated_at: new Date().toISOString(),
          messages: [...c.messages, userMsg, assistantMsg],
        };
      }
      return c;
    });

    saveConvs(updatedConvs);
  };

  const createNewConversation = (title = 'New Research Chat', docIds = []) => {
    const newConv = {
      id: 'conv-' + Date.now(),
      title,
      selected_doc_ids: docIds.length > 0 ? docIds : [documents[0]?.id || 'doc-001'],
      updated_at: new Date().toISOString(),
      messages: [
        {
          id: 'msg-welcome-' + Date.now(),
          role: 'assistant',
          content: 'Hello! I am your Document Intelligence Assistant. I am ready to answer questions, analyze methodology, extract findings, and cite exact page sources from your selected documents.',
          created_at: new Date().toISOString(),
          citations: [],
        },
      ],
    };

    const updated = [newConv, ...conversations];
    saveConvs(updated);
    setActiveConvId(newConv.id);
    return newConv;
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        conversations,
        activeConvId,
        setActiveConvId,
        selectedDocId,
        setSelectedDocId,
        uploadDocument,
        deleteDocument,
        sendMessage,
        createNewConversation,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocs() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error('useDocs must be used within a DocumentProvider');
  return ctx;
}
