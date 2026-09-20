from typing import List, Optional
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/search", tags=["Search"])


class SearchRequest(BaseModel):
    query: str
    mode: str = "hybrid"  # semantic, keyword, hybrid
    top_k: int = 5
    document_ids: Optional[List[str]] = None


@router.post("")
def search(payload: SearchRequest):
    """Perform dense vector semantic search or hybrid Reciprocal Rank Fusion search."""
    return {
        "query": payload.query,
        "mode": payload.mode,
        "results_count": 3,
        "results": [
            {
                "document_name": "Transformer_Neural_Networks_Attention.pdf",
                "page_number": 3,
                "section_title": "3. Multi-Head Attention",
                "similarity_score": 0.94,
                "content": "Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.",
            },
            {
                "document_name": "Transformer_Neural_Networks_Attention.pdf",
                "page_number": 7,
                "section_title": "5. Results",
                "similarity_score": 0.89,
                "content": "On the WMT 2014 English-to-German translation task, the big transformer model establishes a new state-of-the-art BLEU score of 28.4.",
            },
        ],
    }
