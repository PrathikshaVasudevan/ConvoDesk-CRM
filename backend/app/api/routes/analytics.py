from fastapi import APIRouter

router = APIRouter()

MOCK_STATS = {
  "totalLeads": 124,
  "activeChats": 18,
  "pendingFollowups": 4,
  "conversionRate": 24.5,
  "pipelineValue": "$148,200",
  "chatsByDay": [
    { "name": "Mon", "count": 45 },
    { "name": "Tue", "count": 58 },
    { "name": "Wed", "count": 62 },
    { "name": "Thu", "count": 70 },
    { "name": "Fri", "count": 48 },
    { "name": "Sat", "count": 24 },
    { "name": "Sun", "count": 18 }
  ],
  "leadsByStatus": [
    { "name": "New", "value": 32, "fill": "var(--color-chart-1)" },
    { "name": "Contacted", "value": 45, "fill": "var(--color-chart-2)" },
    { "name": "Qualified", "value": 24, "fill": "var(--color-chart-3)" },
    { "name": "Proposal", "value": 15, "fill": "var(--color-chart-4)" },
    { "name": "Negotiation", "value": 8, "fill": "var(--color-chart-5)" }
  ]
}

@router.get("/stats")
async def get_stats():
  return MOCK_STATS
