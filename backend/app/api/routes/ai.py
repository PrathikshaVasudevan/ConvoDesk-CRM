from fastapi import APIRouter
from app.schemas.ai import (
    AIConversationRequest,
    AISummaryResponse,
    AILeadClassificationResponse,
    AIReplySuggestionResponse,
)
from app.services.ai_service import summarize_conversation, classify_lead, suggest_reply

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/summarize-conversation", response_model=AISummaryResponse)
def summarize(payload: AIConversationRequest):
    return summarize_conversation(payload.conversation_id)


@router.post("/classify-lead", response_model=AILeadClassificationResponse)
def classify(payload: AIConversationRequest):
    return classify_lead(payload.conversation_id)


@router.post("/suggest-reply", response_model=AIReplySuggestionResponse)
def reply(payload: AIConversationRequest):
    return suggest_reply(payload.conversation_id)