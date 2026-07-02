from fastapi import APIRouter
from app.api.routes import auth, contacts, conversations, followups, analytics, ai

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["conversations"])
api_router.include_router(followups.router, prefix="/followups", tags=["followups"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
