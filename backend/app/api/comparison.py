from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/comparison", tags=["Document Comparison"])


class CompareRequest(BaseModel):
    document_ids: List[str]


@router.post("")
def compare_documents(payload: CompareRequest):
    """Generate multi-document comparison matrix across key dimensions."""
    return {
        "compared_documents": payload.document_ids,
        "features": [
            {
                "dimension": "Objective",
                "values": {
                    "doc-001": "Replace RNNs with multi-head self-attention.",
                    "doc-002": "Automated thoracic disease classification from chest X-rays.",
                },
            },
            {
                "dimension": "Algorithms",
                "values": {
                    "doc-001": "Transformer Encoder-Decoder (8 heads).",
                    "doc-002": "DenseNet-121 CNN ensemble.",
                },
            },
        ],
    }
