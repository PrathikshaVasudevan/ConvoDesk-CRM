from .contact import ContactCreate, ContactUpdate, ContactResponse
from .conversation import (
    MessageCreate,
    MessageResponse,
    ConversationResponse,
    ConversationDetailResponse,
)
from .followup import FollowUpCreate, FollowUpUpdate, FollowUpResponse
from .dashboard import DashboardMetricsResponse
from .ai import (
    AIConversationRequest,
    AISummaryResponse,
    AILeadClassificationResponse,
    AIReplySuggestionResponse,
)

__all__ = [
    "ContactCreate",
    "ContactUpdate",
    "ContactResponse",
    "MessageCreate",
    "MessageResponse",
    "ConversationResponse",
    "ConversationDetailResponse",
    "FollowUpCreate",
    "FollowUpUpdate",
    "FollowUpResponse",
    "DashboardMetricsResponse",
    "AIConversationRequest",
    "AISummaryResponse",
    "AILeadClassificationResponse",
    "AIReplySuggestionResponse",
]