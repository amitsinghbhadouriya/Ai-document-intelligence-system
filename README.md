# AI-Powered Document Intelligence and Knowledge Extraction System

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20pgvector-336791.svg?style=flat&logo=postgresql)](https://github.com/pgvector/pgvector)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB.svg?style=flat&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade document intelligence, semantic knowledge extraction, and grounded Retrieval-Augmented Generation (RAG) platform. Built as a **Bachelor of Computer Applications (BCA) Minor Project**, engineered with production-style full-stack architecture, modular AI provider integration, hybrid search, and citation grounding.

---

## 1. Problem Statement
Organizations, researchers, and students struggle with information overload across dense multi-page PDFs, technical papers, contracts, and reports. Traditional keyword search (Ctrl+F) fails to grasp conceptual context, cannot synthesize answers across disparate sections, and frequently misses scanned text. Conversely, generic conversational LLM wrappers hallucinate unsupported facts, lack verifiable citations, and compromise document data privacy.

## 2. Proposed Solution
This platform implements an end-to-end, deterministic document intelligence pipeline:
- **Intelligent Ingestion**: Native text extraction with PyMuPDF, structured DOCX parsing, and automated Tesseract OCR fallback for scanned pages.
- **Structure-Aware Chunking**: Preserves section hierarchies, page boundaries, and token limits with sliding character overlaps.
- **High-Dimensional Vector Indexing**: Embeds chunks using sentence transformers/cloud models and indexes them in PostgreSQL with pgvector.
- **Hybrid Retrieval**: Merges dense vector cosine similarity with BM25 full-text keyword ranking via Reciprocal Rank Fusion (RRF).
- **Grounded Conversational RAG**: Strict context-bounded generation with exact clickable source page citations (`[1] Paper.pdf - Page 7`) and hallucination suppression.
- **Analytical Intelligence**: Generates executive summaries, extracts structured JSON entities (objectives, datasets, algorithms, metrics), and performs multi-document comparative analysis.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, GSAP (GreenSock), React Bits Components, Bootstrap 5, Recharts, Lucide Icons |
| **Backend API** | Python 3.11+, FastAPI, Pydantic v2, Pydantic-Settings |
| **Database & Vectors** | PostgreSQL 16 + pgvector (with dual-mode SQLite development compatibility) |
| **Document Processing** | PyMuPDF (fitz), python-docx, Pillow, pytesseract OCR |
| **AI & Retrieval** | sentence-transformers (`all-MiniLM-L6-v2`), Google Gemini API / OpenAI API / Ollama |
| **Security** | OAuth2 Password Bearer, JWT tokens (HS256), passlib bcrypt hashing |
| **Testing** | pytest, pytest-asyncio, httpx, TestClient |

---

## 4. System Architecture

```
User Browser (React 18 + GSAP + React Bits Design System)
       │
       ▼ (REST / JWT)
FastAPI Gateway (/api)
       ├── Auth & Security (JWT, bcrypt)
       ├── Document Ingestion (PyMuPDF, python-docx, OCR fallback)
       ├── Chunking Engine (Structure-aware, page boundaries)
       ├── Embedding Service (Local / Gemini / OpenAI)
       ├── Hybrid Retrieval (Vector Cosine + BM25)
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

## 5. UI & Component Architecture (GSAP & React Bits)

The frontend features an enterprise-grade dark SaaS interface powered by **GSAP** micro-interactions and the **React Bits** component ecosystem:
- **Spotlight Cards**: Mouse-following radial gradient borders and surface illumination.
- **Tilted Cards**: 3D parallax perspective tilt with dynamic specular glare.
- **Particles & Aurora Backdrops**: Ambient interactive canvas network and fluid aurora meshes.
- **Typography Animations**: `SplitText`, `BlurText`, `ShinyText`, and `DecryptedText` (AI status scramble).
- **Navigation Dock & Tabs**: Floating macOS-style application dock and sliding pill tabs (`AnimatedTabs`).
- **Telemetry & Simulator**: Real-time terminal log viewer (`TerminalBox`) and animated counters (`CountUp`).

---

## 6. Project Directory Structure

```text
├── backend/
│   ├── app/
│   │   ├── api/          # Route handlers (auth, docs, search, chat, analysis)
│   │   ├── core/         # Security, JWT, logging
│   │   ├── db/           # SQLAlchemy session, engine, migrations
│   │   ├── models/       # Relational & vector schema models
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   ├── services/     # Ingestion, OCR, chunking, RAG, extraction
│   │   ├── utils/        # Text cleaning, file validators
│   │   ├── config.py     # Pydantic settings
│   │   └── main.py       # FastAPI entrypoint
│   ├── tests/            # Automated test suite
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar & Footer
│   │   │   ├── documents/    # DocumentModal preview
│   │   │   └── reactbits/    # Spotlight, TiltedCard, Dock, Aurora, Particles, Bento
│   │   ├── pages/            # Dashboard, Hub, Search, Chat, Compare, Eval, Auth
│   │   ├── services/         # Centralized Axios API client
│   │   ├── styles/           # custom.css, reactbits.css, components.css
│   │   ├── App.jsx           # Root router with Dock, NoiseOverlay & ClickSpark
│   │   └── main.jsx          # React mounting & stylesheet imports
│   ├── index.html            # HTML5 entry with Plus Jakarta Sans & JetBrains Mono
│   ├── vite.config.js        # Vite proxy configuration
│   └── package.json
├── docs/                     # Architecture, API, and DB documentation
├── scripts/                  # Development and automated commit utilities
├── uploads/                  # Document storage
├── .gitignore
└── README.md
```

---

## 6. Installation & Local Setup

### Prerequisites
- Python 3.11+
- Node.js v18+ and npm
- Git

### Backend Setup
1. Open a terminal in the project directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your keys or leave defaults for local mode
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   API will be available at: `http://127.0.0.1:8000` (Interactive docs: `http://127.0.0.1:8000/docs`)

### Frontend Setup
1. Open a separate terminal:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

---

## 7. Running Automated Tests
Run the automated test suite with pytest:
```bash
cd backend
.\venv\Scripts\pytest tests/ -v
```