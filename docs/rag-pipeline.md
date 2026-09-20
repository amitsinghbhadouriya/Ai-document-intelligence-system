# Grounded RAG Pipeline Specification

## 1. Pipeline Overview
The Retrieval-Augmented Generation (RAG) subsystem is engineered to completely prevent generative hallucinations while providing auditable, clickable page references.

```
                  +-----------------------------------+
                  |         User Natural Query        |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |   Query Preprocessing & Intent    |
                  +-----------------+-----------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
          v                                                   v
+-----------------------------+             +-----------------------------+
|    Dense Vector Search      |             |     BM25 Keyword Search     |
| - Query embedding vector    |             | - PostgreSQL tsvector /     |
| - pgvector cosine similarity|             |   SQLite keyword matching   |
+--------------+--------------+             +--------------+--------------+
               |                                           |
               +--------------------+----------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |  Reciprocal Rank Fusion (RRF)     |
                  |  - Fuses rankings into top-K      |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  | Grounded System Prompt Assembly   |
                  | - Strict context boundary rules   |
                  | - Mandatory citation tags [1]     |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  | LLM (Gemini / OpenAI / Ollama)    |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  | Response Verification & Grounding |
                  | - Verify token support in context |
                  | - Extract [n] Page citations      |
                  +-----------------------------------+
```

## 2. Citation Protocol
Each response citation maps directly to a chunk record containing:
- `document_name`: Exact original filename (e.g. `AttentionIsAllYouNeed.pdf`).
- `page_number`: 1-indexed document page number.
- `section_title`: Section or heading context.
- `snippet`: Verbatim chunk excerpt supporting the claim.

## 3. Hallucination Control Standard
If the semantic score of retrieved chunks is below threshold, or the context is insufficient, the model must output:
> *"I could not find sufficient information in the uploaded documents to answer this confidently."*
The system explicitly rejects generating unsupported facts.
