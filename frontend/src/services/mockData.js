export const INITIAL_DOCUMENTS = [
  {
    id: 'doc-001',
    filename: 'Transformer_Neural_Networks_Attention.pdf',
    original_filename: 'Transformer_Neural_Networks_Attention.pdf',
    file_type: 'application/pdf',
    file_size_bytes: 2450000,
    status: 'PROCESSED',
    total_pages: 15,
    ocr_pages_count: 0,
    created_at: '2026-09-18T10:30:00Z',
    doc_metadata: {
      title: 'Attention Is All You Need: Sequence-to-Sequence Modeling',
      authors: ['Vaswani et al.', 'Google Brain', 'Google Research'],
      domain: 'Natural Language Processing / Deep Learning',
      chunk_count: 38,
    },
    chunks: [
      {
        id: 'chk-101',
        chunk_index: 0,
        page_number: 1,
        section_title: '1. Introduction',
        content: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, a model architecture eschewing recurrence and entirely relying on an attention mechanism to draw global dependencies between input and output.',
        token_count: 142,
      },
      {
        id: 'chk-102',
        chunk_index: 1,
        page_number: 3,
        section_title: '3. Multi-Head Attention',
        content: 'Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. In this work we employ h = 8 parallel attention layers, or heads. For each of these we use dk = dv = dmodel / h = 64.',
        token_count: 188,
      },
      {
        id: 'chk-103',
        chunk_index: 2,
        page_number: 7,
        section_title: '5. Results & Benchmark Evaluation',
        content: 'On the WMT 2014 English-to-German translation task, the big transformer model (Transformer (big)) outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4.',
        token_count: 165,
      },
    ],
  },
  {
    id: 'doc-002',
    filename: 'Healthcare_Radiology_AI_Diagnostic.pdf',
    original_filename: 'Healthcare_Radiology_AI_Diagnostic.pdf',
    file_type: 'application/pdf',
    file_size_bytes: 4120000,
    status: 'PROCESSED',
    total_pages: 22,
    ocr_pages_count: 3,
    created_at: '2026-09-19T14:15:00Z',
    doc_metadata: {
      title: 'Deep Learning Diagnostics in High-Resolution Chest Radiography',
      authors: ['Dr. Sarah Lin', 'Stanford Medical Imaging Lab'],
      domain: 'Medical Computer Vision',
      chunk_count: 54,
    },
    chunks: [
      {
        id: 'chk-201',
        chunk_index: 0,
        page_number: 2,
        section_title: 'Clinical Dataset Demographics',
        content: 'We evaluated our DenseNet-121 ensemble across 112,120 frontal-view X-ray images from 30,805 unique patients (NIH ChestX-ray14 dataset). The system achieved an area under ROC (AUROC) curve of 0.932 for pneumonia detection.',
        token_count: 170,
      },
    ],
  },
  {
    id: 'doc-003',
    filename: 'Financial_Audit_Compliance_2025.docx',
    original_filename: 'Financial_Audit_Compliance_2025.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    file_size_bytes: 1840000,
    status: 'PROCESSED',
    total_pages: 9,
    ocr_pages_count: 0,
    created_at: '2026-09-20T09:00:00Z',
    doc_metadata: {
      title: 'Enterprise Internal Controls & SOC2 Compliance Audit Report',
      authors: ['KPMG Assurance Advisory Group'],
      domain: 'Financial Governance',
      chunk_count: 24,
    },
    chunks: [
      {
        id: 'chk-301',
        chunk_index: 0,
        page_number: 4,
        section_title: 'Material Weakness Assessment',
        content: 'Management maintained effective internal control over financial reporting as of December 31, 2025. No material weaknesses or significant deficiencies in access management or ledger reconciliation were identified.',
        token_count: 135,
      },
    ],
  },
  {
    id: 'doc-004',
    filename: 'Scanned_Clinical_Trial_Notes.pdf',
    original_filename: 'Scanned_Clinical_Trial_Notes.pdf',
    file_type: 'application/pdf',
    file_size_bytes: 3200000,
    status: 'PROCESSED',
    total_pages: 6,
    ocr_pages_count: 6,
    created_at: '2026-09-20T11:45:00Z',
    doc_metadata: {
      title: 'Handwritten & Scanned Oncological Trial Patient Dosage Notes',
      authors: ['Clinical Research Unit 4'],
      domain: 'Pharmacology',
      chunk_count: 14,
    },
    chunks: [
      {
        id: 'chk-401',
        chunk_index: 0,
        page_number: 1,
        section_title: 'Phase II Cohort Dosing Protocol',
        content: '[Extracted via Tesseract OCR]: Patient Cohort B received 25mg/m2 IV infusion once every 21 days. Adverse events grade 3 or higher occurred in 4.2% of participants with complete resolution after dose adjustment.',
        token_count: 120,
      },
    ],
  },
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-001',
    title: 'Transformer Architecture & Attention Mechanisms',
    selected_doc_ids: ['doc-001'],
    updated_at: '2026-09-20T16:20:00Z',
    messages: [
      {
        id: 'msg-01',
        role: 'user',
        content: 'What architecture is used in the Transformer and why does it avoid recurrent networks?',
        created_at: '2026-09-20T16:20:00Z',
      },
      {
        id: 'msg-02',
        role: 'assistant',
        content: 'The Transformer eschews recurrence and convolutions entirely, instead relying solely on self-attention mechanisms to compute representations of its input and output [1]. This design choice removes the sequential computation constraint inherent in RNNs, enabling significantly greater parallelization during training and allowing the model to capture dependencies between words regardless of their positional distance [2].',
        grounding_score: 'HIGH',
        confidence_score: 0.96,
        created_at: '2026-09-20T16:20:05Z',
        citations: [
          {
            citation_index: 1,
            document_name: 'Transformer_Neural_Networks_Attention.pdf',
            page_number: 1,
            section_title: '1. Introduction',
            snippet: 'We propose the Transformer, a model architecture eschewing recurrence and entirely relying on an attention mechanism to draw global dependencies between input and output.',
            similarity_score: 0.94,
          },
          {
            citation_index: 2,
            document_name: 'Transformer_Neural_Networks_Attention.pdf',
            page_number: 2,
            section_title: '2. Background',
            snippet: 'Recurrent models typically factor computation along the symbol positions of the input and output sequences. This inherently sequential nature precludes parallelization within training examples.',
            similarity_score: 0.91,
          },
        ],
      },
    ],
  },
];

export const COMPARISON_DATA = {
  columns: ['Feature / Dimension', 'Paper A: Transformer Networks', 'Paper B: Chest Radiography AI', 'Doc C: Financial Audit SOC2'],
  rows: [
    {
      feature: 'Primary Objective',
      docA: 'Replace RNNs with multi-head self-attention for sequence modeling',
      docB: 'Automated 14-class thoracic disease classification from chest X-rays',
      docC: 'Evaluate internal corporate controls and cybersecurity governance',
    },
    {
      feature: 'Dataset & Sample Size',
      docA: 'WMT 2014 English-German (4.5M pairs) and English-French (36M pairs)',
      docB: 'NIH ChestX-ray14 (112,120 images from 30,805 patients)',
      docC: 'FY2025 General Ledger, AWS IAM configurations, Access Logs',
    },
    {
      feature: 'Core Algorithm / Model',
      docA: '6-layer Encoder-Decoder Transformer with 8 parallel attention heads',
      docB: 'DenseNet-121 CNN ensemble with Grad-CAM visual interpretability',
      docC: 'AICPA Trust Services Criteria Framework (Security, Availability)',
    },
    {
      feature: 'Key Performance Metric',
      docA: '28.4 BLEU on English-to-German; 41.8 BLEU on English-to-French',
      docB: '0.932 Mean AUROC across 14 radiological pathologies',
      docC: '100% remediation of previous findings; Zero material weaknesses',
    },
    {
      feature: 'Noted Limitations',
      docA: 'Quadratic memory complexity with sequence length (O(N^2))',
      docB: 'Class imbalance across rare diseases; external hospital domain shift',
      docC: 'Manual sampling of sub-service organization third-party vendor SOC reports',
    },
  ],
};

export const EVALUATION_METRICS = {
  summary: {
    documents_tested: 42,
    total_rag_queries: 250,
    retrieval_relevance: 89.6,
    citation_accuracy: 94.4,
    grounded_answer_rate: 92.1,
    avg_latency_sec: 1.34,
  },
  chart_data: [
    { name: 'Dataset 1: Computer Science', relevance: 92, citation: 96, grounded: 95 },
    { name: 'Dataset 2: Clinical Radiology', relevance: 88, citation: 93, grounded: 91 },
    { name: 'Dataset 3: Financial Filings', relevance: 91, citation: 95, grounded: 94 },
    { name: 'Dataset 4: Legal Contracts', relevance: 86, citation: 92, grounded: 89 },
    { name: 'Dataset 5: Scanned OCR Docs', relevance: 84, citation: 89, grounded: 87 },
  ],
};
