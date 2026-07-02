from fastapi import APIRouter
from app.api.routes import (
    auth_router,
    contacts_router,
    conversations_router,
    followups_router,
    analytics_router,
    ai_router,
)

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth_router)
api_router.include_router(contacts_router)
api_router.include_router(conversations_router)
api_router.include_router(followups_router)
api_router.include_router(analytics_router)
api_router.include_router(ai_router)