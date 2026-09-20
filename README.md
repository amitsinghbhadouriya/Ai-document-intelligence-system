# AI-Powered Document Intelligence and Knowledge Extraction System

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20pgvector-336791.svg?style=flat&logo=postgresql)](https://github.com/pgvector/pgvector)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB.svg?style=flat&logo=python)](https://www.python.org/)
[![Bootstrap](https://img.shields.io/badge/Styling-Bootstrap%205%20Custom%20SaaS-7952B3.svg?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade document intelligence, semantic knowledge extraction, and grounded Retrieval-Augmented Generation (RAG) platform. Built as a **Bachelor of Computer Applications (BCA) Minor Project**, engineered with production-style full-stack architecture, modular AI provider integration, hybrid search, and citation grounding.

---

## 1. Problem Statement
Organizations, researchers, and students struggle with information overload across dense multi-page PDFs, technical papers, contracts, and reports. Traditional keyword search (Ctrl+F) fails to grasp conceptual context, cannot synthesize answers across disparate sections, and frequently misses scanned text. Conversely, generic conversational LLM wrappers hallucinate unsupported facts, lack verifiable citations, and compromise document data privacy.

---

## 2. Proposed Solution
This platform implements an end-to-end, deterministic document intelligence pipeline:
- **Intelligent Ingestion**: Native text extraction with PyMuPDF, structured DOCX parsing, and automated Tesseract OCR fallback for scanned pages.
- **Structure-Aware Chunking**: Preserves section hierarchies, page boundaries, and token limits with sliding character overlaps.
- **High-Dimensional Vector Indexing**: Embeds chunks using sentence transformers or cloud models and indexes them in PostgreSQL with pgvector.
- **Hybrid Retrieval**: Merges dense vector cosine similarity with BM25 full-text keyword ranking via Reciprocal Rank Fusion (RRF).
- **Grounded Conversational RAG**: Strict context-bounded generation with exact clickable source page citations (`[1] Paper.pdf - Page 7`) and hallucination suppression.
- **Analytical Intelligence**: Generates executive summaries, extracts structured JSON entities (objectives, datasets, algorithms, metrics), and performs multi-document comparative analysis.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Bootstrap 5, Axios, React Router v6, Lucide Icons, Recharts |
| **Backend API** | Python 3.11+, FastAPI, Pydantic v2, Pydantic-Settings |
| **Database & Vectors** | PostgreSQL 16 + pgvector (with dual-mode SQLite development compatibility) |
| **Document Processing** | PyMuPDF (fitz), python-docx, Pillow, pytesseract OCR |
| **AI & Retrieval** | sentence-transformers (`all-MiniLM-L6-v2`), Google Gemini API / OpenAI API / Ollama |
| **Security** | OAuth2 Password Bearer, JWT tokens (HS256), passlib bcrypt hashing |
| **Testing** | pytest, pytest-asyncio, httpx, TestClient |

---

## 4. Key Features

- **Document Knowledge Hub**: Drag-and-drop file upload (PDF, DOCX, TXT), real-time progress indicators, status badges (`PROCESSED`, `PROCESSING`), and an interactive chunk inspector modal.
- **Grounded Conversational RAG**: Multi-turn dialogue with single or multi-document context. Every factual claim is backed by clickable source citations that reveal the exact page number, section, and quoted excerpt.
- **Anti-Hallucination Guardrails**: Real-time grounding confidence indicators (`HIGH`, `MEDIUM`, `LOW`). If context is insufficient, the system explicitly declines to guess.
- **Global Semantic & Hybrid Search**: Search across your entire repository using Hybrid (Dense + BM25), Semantic Only, or Keyword Only modes with real-time similarity meters.
- **Multi-Document Comparison**: Side-by-side analytical matrix comparing objectives, algorithms, datasets, benchmark metrics, and limitations across papers, with CSV and JSON exports.
- **Document Analysis & Entity Extraction**: Automated executive summaries, detailed summaries, key bullet points, and structured JSON entity parsing with one-click clipboard copy.
- **Empirical RAG Benchmarks**: Interactive charts measuring retrieval relevance, citation precision, grounding rate, and latency.

---

## 5. System Architecture

```
User Browser (React 18 + Bootstrap 5 SaaS Theme)
       │
       ▼ (Port 5173 / REST / JWT / Axios)
FastAPI Gateway (Port 8000 / /api)
       ├── Auth & Security (JWT, bcrypt, Protected Routes)
       ├── Document Ingestion (PyMuPDF, python-docx, OCR fallback)
       ├── Chunking Engine (Structure-aware, page boundaries)
       ├── Embedding Service (Local / Gemini / OpenAI)
       ├── Hybrid Retrieval (Vector Cosine + BM25 RRF)
       ├── Grounded RAG & Citations Engine
       └── Multi-Document Comparison Matrix
       │
       ▼
PostgreSQL 16 + pgvector Database
       ├── users
       ├── documents & document_pages
       ├── document_chunks (embeddings)
       └── conversations & message_citations
```

---

## 6. Project Directory Structure

```text
├── backend/
│   ├── app/
│   │   ├── api/          # Route handlers (auth, documents, search, chat, analysis, comparison, evaluation)
│   │   ├── core/         # Security, JWT, logging
│   │   ├── db/           # SQLAlchemy session, engine, declarative base
│   │   ├── models/       # Relational & vector schema models
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   ├── services/     # Ingestion, OCR, chunking, RAG, extraction
│   │   ├── utils/        # Text cleaning, file validators
│   │   ├── config.py     # Pydantic settings configuration
│   │   └── main.py       # FastAPI application entrypoint
│   ├── tests/            # Automated test suite
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── components/   # Modular UI & layout components (Navbar, Footer, DocumentModal)
│   │   ├── context/      # AuthContext and DocumentContext state providers
│   │   ├── pages/        # Dashboard, Documents, Search, Chat, Compare, Analysis, Evaluation
│   │   ├── services/     # Centralized Axios API client & sample datasets
│   │   ├── styles/       # Modern design system & custom CSS tokens
│   │   ├── App.jsx       # Root router and providers
│   │   └── main.jsx      # React mounting
│   ├── index.html        # HTML5 entry with typography
│   ├── vite.config.js    # Vite proxy configuration
│   └── package.json
├── docs/                 # Architecture, API, database, and testing documentation
├── scripts/              # Automated commit runners and development utilities
├── uploads/              # Document storage
├── run_all.bat           # Master one-click Windows launcher
├── run_backend.bat       # Windows backend launcher
├── run_frontend.bat      # Windows frontend launcher
├── docker-compose.yml    # Multi-container Docker deployment
├── .gitignore
└── README.md
```

---

## 7. Installation & Quickstart

### One-Click Windows Quickstart (Recommended)
Simply double-click or run from your terminal:
```powershell
.\run_all.bat
```
This automatically launches both the FastAPI backend and Vite frontend in separate terminal windows!

---

### Manual Setup

#### Prerequisites
- Python 3.11+
- Node.js v18+ and npm
- Git

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Launch FastAPI server
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- API Base: `http://127.0.0.1:8000`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Open your browser at `http://localhost:5173`

---

## 8. API Specification Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Real-time diagnostic and database connection status |
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT Bearer token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/documents/upload` | Multipart file upload (PDF, DOCX, TXT) |
| `GET` | `/api/documents` | List all indexed documents with page metadata |
| `GET` | `/api/documents/{id}` | Fetch document metadata, pages, and chunks |
| `DELETE` | `/api/documents/{id}` | Cascade delete document and vector chunks |
| `POST` | `/api/search` | Semantic and hybrid Reciprocal Rank Fusion search |
| `POST` | `/api/chat` | Conversational RAG with source page citations |
| `POST` | `/api/analysis/summarize`| Generate executive, detailed, or bullet summary |
| `POST` | `/api/analysis/extract` | Structured JSON entity extraction |
| `POST` | `/api/comparison` | Cross-document analytical comparison matrix |
| `GET` | `/api/evaluation/metrics`| Retrieve RAG relevance, citation, and latency metrics |
| `POST` | `/api/evaluation/run-test`| Trigger automated RAG benchmark evaluation suite |

---

## 9. Running Automated Tests
Run the pytest test suite:
```bash
cd backend
.\venv\Scripts\pytest tests/ -v
```

---

## 10. Future Scope
- Multilingual document ingestion and cross-lingual question answering.
- Advanced layout analysis (parsing nested tables and figures using Vision LLMs).
- Knowledge graph generation linking entities across multiple document collections.
- Team workspace collaboration with granular role-based access control (RBAC).

---

## 11. License
This project is licensed under the MIT License - see the LICENSE file for details.
