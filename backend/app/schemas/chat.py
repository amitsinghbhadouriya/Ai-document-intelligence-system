
<!-- update 20 -->
# Chat Schemas
from pydantic import BaseModel
class ChatMessage(BaseModel):
    message: str
