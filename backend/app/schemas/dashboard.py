from typing import List
from pydantic import BaseModel


class LeadStageDistributionItem(BaseModel):
    stage: str
    count: int


class MessageVolumeItem(BaseModel):
    date: str
    count: int


class DashboardMetricsResponse(BaseModel):
    total_contacts: int
    active_conversations: int
    converted_contacts: int
    pending_followups: int
    lead_stage_distribution: List[LeadStageDistributionItem]
    message_volume: List[MessageVolumeItem]