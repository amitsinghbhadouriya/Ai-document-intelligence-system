
<!-- update 19 -->
# Search Schemas
from pydantic import BaseModel
class SearchQuery(BaseModel):
    query: str
