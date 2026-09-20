# REST API Specification

All API endpoints are prefixed with `/api` by default.

## 1. Health & Diagnostics
### `GET /api/health`
Checks backend connectivity, database status, configured AI models, and storage paths.

**Response `200 OK`**:
```json
{
  "status": "healthy",
  "app_name": "AI-Powered Document Intelligence and Knowledge Extraction System",
  "environment": "development",
  "database": {
    "status": "connected",
    "type": "sqlite"
  },
  "ai_engine": {
    "llm_provider": "gemini",
    "llm_model": "gemini-1.5-flash",
    "embedding_provider": "local",
    "embedding_model": "all-MiniLM-L6-v2"
  },
  "storage": {
    "upload_dir": "C:\\...\\uploads",
    "upload_dir_exists": true,
    "max_file_size_mb": 25
  },
  "timestamp": "2026-09-20T17:35:00.000000+00:00"
}
```

## 2. Authentication
- `POST /api/auth/register`: Register user with email, password, full_name
- `POST /api/auth/login`: Login user and receive Bearer JWT token
- `GET /api/auth/me`: Get current user info (Protected)

## 3. Documents
- `POST /api/documents/upload`: Multipart upload (PDF, DOCX, TXT)
- `GET /api/documents`: Paginated list of documents belonging to user
- `GET /api/documents/{id}`: Detailed metadata, page list, and processing status
- `DELETE /api/documents/{id}`: Delete document, vector chunks, and physical file

## 4. Search & Retrieval
- `POST /api/search/semantic`: Vector cosine search with Top-K and score threshold
- `POST /api/search/hybrid`: Hybrid BM25 keyword + dense vector search

## 5. Conversational RAG
- `POST /api/chat`: Send message, retrieve context, stream or return grounded answer with citations
- `GET /api/conversations`: List user conversation threads
- `GET /api/conversations/{id}`: View messages and citations for conversation

## 6. Intelligence & Extraction
- `POST /api/documents/{id}/summarize`: Generate short, detailed, or bullet summary
- `POST /api/documents/{id}/extract`: Extract structured JSON entities
- `POST /api/comparison`: Side-by-side comparison matrix across multiple documents
