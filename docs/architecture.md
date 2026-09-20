# System Architecture & Technical Design

## 1. High-Level Architecture Overview
The **AI-Powered Document Intelligence and Knowledge Extraction System** utilizes a modern decoupled client-server architecture:

```
+-------------------------------------------------------------+
|                      React 18 Frontend                      |
|  - Bootstrap 5 + Custom Design Tokens                       |
|  - Responsive Glassmorphic Dashboard & Navigation           |
|  - Axios API Client with JWT Authorization Interceptors     |
+------------------------------+------------------------------+
                               | HTTPS / JSON
                               v
+-------------------------------------------------------------+
|                    FastAPI Backend Gateway                  |
|  - CORS & Rate Limiting                                     |
|  - Pydantic v2 Request/Response Validation                  |
|  - Dependency-injected Database Sessions                    |
+------------------------------+------------------------------+
                               |
       +-----------------------+-----------------------+
       |                                               |
       v                                               v
+-----------------------------+        +------------------------------+
|   Document & RAG Pipeline   |        | PostgreSQL 16 Database       |
| - PyMuPDF Text Extraction   |        | - Users & Auth               |
| - python-docx Parsing       |        | - Documents & Page Text      |
| - Tesseract OCR Fallback    |        | - Document Chunks            |
| - Semantic Chunking Engine  |        | - pgvector HNSW Vector Index |
| - sentence-transformers /   |        | - Conversations & History    |
|   Gemini / OpenAI Embeds    |        | - Message Citations          |
| - Grounded RAG Generation   |        +------------------------------+
+-----------------------------+
```

## 2. Document Processing Pipeline Flow
1. **Upload & Pre-flight Validation**:
   - File format whitelist (`.pdf`, `.docx`, `.txt`).
   - Size limit verification (default 25 MB).
   - SHA-256 content hashing to prevent redundant duplicate re-processing.
2. **Deterministic Text Extraction**:
   - For PDFs: PyMuPDF (`fitz`) extracts raw page stream text.
   - For DOCX: `python-docx` parses paragraphs, headers, and tables.
   - For TXT: UTF-8 safe decoding.
3. **Automated OCR Fallback**:
   - If a PDF page yields fewer than 30 characters (scanned image or flattened document), Tesseract OCR is triggered on that specific page only, conserving compute.
4. **Intelligent Chunking**:
   - Splits content into 600-character segments with 100-character overlap.
   - Preserves section headings, document ID, and page numbers for source lineage.
5. **Dense Vector Generation & Storage**:
   - Embedding vectors generated and indexed permanently in PostgreSQL via `pgvector` HNSW index for sub-10ms nearest-neighbor retrieval.

## 3. RAG Strategy & Anti-Hallucination Guardrails
- **Prompt Isolation**: Retrieved context chunks are injected into system prompts with strict grounding instructions.
- **Citation Tags**: LLM produces bracketed citations matching retrieved chunk IDs.
- **Grounding Confidence**: Compares LLM output entities against context tokens to assign HIGH / MEDIUM / LOW grounding confidence.
