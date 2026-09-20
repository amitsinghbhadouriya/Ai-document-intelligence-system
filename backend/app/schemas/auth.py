
<!-- update 22 -->
# Auth Schemas
from pydantic import BaseModel
class Token(BaseModel):
    token: str
