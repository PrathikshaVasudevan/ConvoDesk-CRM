from fastapi import APIRouter, HTTPException
import google.generativeai as genai
from app.core.config import settings
from app.schemas import AISummaryResponse, AIReplySuggestionResponse

router = APIRouter()

# Simple mock fallback contents
MOCK_SUMMARIES = {
  "conv1": "Sarah is evaluating ConvoDesk for customer support. She is testing the webhook performance and reviewing API pricing details.",
  "conv2": "David Chen is inquiring about timezone-based auto-routing rules and timezone availability constraints for active agents.",
  "conv3": "Elena Rostova approved the pilot program and contract draft. E-sign signature coordination scheduled for Monday."
}

MOCK_REPLIES = {
  "conv1": "Yes, Sarah, the Gemini AI summary and reply classification capabilities are included in our base enterprise subscription tier. You will not face separate add-on charges.",
  "conv2": "Hi David! Yes, timezone-based auto routing is fully supported. I can send you a detailed configuration guide for routing profiles. Would you like that?",
  "conv3": "Looking forward to Monday, Elena. I will send over the DocuSign link shortly so it is ready for your signature."
}

@router.get("/summary/{conversation_id}", response_model=AISummaryResponse)
async def generate_conversation_summary(conversation_id: str):
  # Check if Gemini API key is configured
  if settings.GEMINI_API_KEY:
    try:
      genai.configure(api_key=settings.GEMINI_API_KEY)
      model = genai.GenerativeModel('gemini-1.5-flash')
      
      # In production, we would fetch conversation logs from the database
      # For scaffold, we pass a mock context to Gemini
      prompt = f"Summarize the client interaction for conversation {conversation_id} in 2 concise sentences."
      response = model.generate_content(prompt)
      return {"summary": response.text.strip()}
    except Exception as e:
      # Fallback on Gemini API error
      pass

  # Fallback to mock data
  summary = MOCK_SUMMARIES.get(conversation_id, "New lead is actively inquiring about WhatsApp integration capabilities.")
  return {"summary": summary}

@router.get("/reply-suggestion/{conversation_id}", response_model=AIReplySuggestionResponse)
async def generate_reply_suggestion(conversation_id: str):
  # Check if Gemini API key is configured
  if settings.GEMINI_API_KEY:
    try:
      genai.configure(api_key=settings.GEMINI_API_KEY)
      model = genai.GenerativeModel('gemini-1.5-flash')
      
      # In production, we pass message history to Gemini
      prompt = f"Suggest a helpful, friendly 1-sentence WhatsApp reply for conversation {conversation_id}."
      response = model.generate_content(prompt)
      return {"suggestion": response.text.strip()}
    except Exception as e:
      # Fallback on Gemini API error
      pass

  # Fallback to mock data
  suggestion = MOCK_REPLIES.get(conversation_id, "Hi! Thank you for reaching out. Let me check that detail with our team and get back to you shortly.")
  return {"suggestion": suggestion}
