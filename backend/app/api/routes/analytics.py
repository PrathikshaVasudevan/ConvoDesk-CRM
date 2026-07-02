from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.dashboard import DashboardMetricsResponse
from app.services.analytics_service import get_dashboard_metrics

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard", response_model=DashboardMetricsResponse)
def dashboard_metrics(db: Session = Depends(get_db)):
    return get_dashboard_metrics(db)