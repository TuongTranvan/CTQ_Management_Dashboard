# app/api/upload.py
from fastapi import APIRouter
from app.services.upload_rate_chart_service import UploadRateService

router = APIRouter()

# router card
@router.get("/card")
def get_overview_cards(
    period_type: str, # month | week
    period_value: str # month | week
):
    return UploadRateService.get_overview_cards(
        period_type=period_type,
        period_value=period_value
    )

# router upload rate chart
@router.get("/rate/chart")
def get_chart(
    process: str,          # reflow | deflux
    period_type: str,      # month | week
    period_value: str,     # 2026-10 | w43
    scope: str = "All"     # All | SMT1 | SMT2 | SMT3 | Deflux1 | Deflux2 | Deflux3
):
    return UploadRateService.get_chart(
        process=process,
        period_type=period_type,
        period_value=period_value,
        scope=scope
    )

