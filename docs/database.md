# Database Design & Schema Specification

## 1. Overview
The system employs **PostgreSQL 16** with the **`pgvector`** extension for dense vector storage and similarity searches. For development environments where PostgreSQL is not yet running, a dual-mode fallback to SQLite with JSON-based vector structures is supported.

## 2. Entity Relational Architecture

### Table: `users`
- `id` (VARCHAR(36), PK): UUID
- `email` (VARCHAR(255), UNIQUE, INDEX): Account email
- `hashed_password` (VARCHAR(255)): Bcrypt password hash
- `full_name` (VARCHAR(255)): User's name
- `role` (VARCHAR(50)): User role (`admin`, `user`)
- `is_active` (BOOLEAN): Account status
- `created_at` (TIMESTAMP): Creation time
- `updated_at` (TIMESTAMP): Last update

### Table: `documents`
- `id` (VARCHAR(36), PK): UUID
- `user_id` (VARCHAR(36), FK -> users.id): Document owner
- `filename` (VARCHAR(255)): Internal storage filename
- `original_filename` (VARCHAR(255)): User uploaded name
- `file_type` (VARCHAR(50)): MIME type or extension
- `file_size_bytes` (INTEGER): File size
- `file_hash` (VARCHAR(64), INDEX): SHA-256 checksum
- `storage_path` (VARCHAR(512)): Physical disk location
- `status` (VARCHAR(50), INDEX): `UPLOADED`, `PROCESSING`, `PROCESSED`, `FAILED`
- `status_message` (VARCHAR(500)): Processing logs or error notes
- `total_pages` (INTEGER): Page count
- `ocr_pages_count` (INTEGER): Pages processed via OCR
- `doc_metadata` (JSON): Metadata dictionary
- `created_at` (TIMESTAMP)
- `processed_at` (TIMESTAMP)

### Table: `document_pages`
- `id` (VARCHAR(36), PK): UUID
- `document_id` (VARCHAR(36), FK -> documents.id): Parent doc
- `page_number` (INTEGER): 1-indexed page
- `raw_text` (TEXT): Extracted raw stream
- `cleaned_text` (TEXT): Normalized text
- `required_ocr` (BOOLEAN): Whether OCR was used
- `char_count` (INTEGER): Character length

### Table: `document_chunks`
- `id` (VARCHAR(36), PK): UUID
- `document_id` (VARCHAR(36), FK -> documents.id): Parent doc
- `chunk_index` (INTEGER): Sequential order
- `page_number` (INTEGER, INDEX): Page lineage
- `section_title` (VARCHAR(255)): Extracted heading
- `content` (TEXT): Text content
- `token_count` (INTEGER): Token count
- `char_count` (INTEGER): Character count
- `embedding` (VECTOR(1536) / JSON): Dense vector embedding
- `chunk_metadata` (JSON): Contextual metadata

### Table: `conversations`
- `id` (VARCHAR(36), PK): UUID
- `user_id` (VARCHAR(36), FK -> users.id): Initiator
- `title` (VARCHAR(255)): Chat session title
- `selected_doc_ids` (JSON): List of targeted document IDs

### Table: `messages`
- `id` (VARCHAR(36), PK): UUID
- `conversation_id` (VARCHAR(36), FK -> conversations.id): Session
- `role` (VARCHAR(50)): `user`, `assistant`, `system`
- `content` (TEXT): Message text
- `grounding_score` (VARCHAR(20)): `HIGH`, `MEDIUM`, `LOW`
- `confidence_score` (FLOAT): Verification confidence

### Table: `message_citations`
- `id` (VARCHAR(36), PK): UUID
- `message_id` (VARCHAR(36), FK -> messages.id): Assistant response
- `chunk_id` (VARCHAR(36), FK -> document_chunks.id): Chunk reference
- `citation_index` (INTEGER): Order in message [1], [2]
- `document_name` (VARCHAR(255)): Referenced file
- `page_number` (INTEGER): Page number cited
- `snippet` (TEXT): Quoted passage
- `similarity_score` (FLOAT): Cosine similarity
