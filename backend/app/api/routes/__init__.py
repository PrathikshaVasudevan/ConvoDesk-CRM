from .auth import router as auth_router
from .contacts import router as contacts_router
from .conversations import router as conversations_router
from .followups import router as followups_router
from .analytics import router as analytics_router
from .ai import router as ai_router

__all__ = [
    "auth_router",
    "contacts_router",
    "conversations_router",
    "followups_router",
    "analytics_router",
    "ai_router",
]