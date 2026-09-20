# Testing & Quality Assurance Strategy

## 1. Automated Test Levels

### Unit Tests
- Text extraction fidelity from PDF, DOCX, and TXT files.
- Structure-aware chunking boundaries and overlap integrity.
- Text cleaning and whitespace normalization.
- Metadata preservation.

### Integration & API Tests
- Authentication workflows: Registration, login, token refresh, and unauthorized access rejection.
- Document upload validation: MIME-type enforcement, oversized file rejection, storage persistence.
- Database relational integrity and cascade deletes.
- Diagnostic and health check endpoint stability.

### RAG Evaluation Benchmark
- Retrieval relevance (Precision@K, Recall@K).
- Grounding accuracy (percentage of generated tokens directly supported by context).
- Citation correctness (verifying that cited chunk genuinely contains the supporting fact).
- Latency benchmarks across pipeline stages.

## 2. Test Execution
Execute all tests using pytest:
```bash
cd backend
.\venv\Scripts\pytest tests/ -v --cov=app
```
