from pydantic import BaseModel


class AIConversationRequest(BaseModel):
    conversation_id: str


class AISummaryResponse(BaseModel):
    summary: str


class AILeadClassificationResponse(BaseModel):
    intent: str
    priority: str
    suggested_stage: str


class AIReplySuggestionResponse(BaseModel):
    reply: str