from fastapi import APIRouter

from app.services.out_spec_rate_service import (
    OutSpecRateService
)

router = APIRouter()


@router.get("/chart")
def get_out_spec_chart(
    process: str,          # reflow | deflux
    period_type: str,      # month | week
    period_value: str,     # 2026-11 | 2026-W45
    scope: str = "All"     # All | SMT1 | SMT2 | SMT3 | Deflux1 | Deflux2 | Deflux3
):
    return OutSpecRateService.get_chart(
        process=process,
        period_type=period_type,
        period_value=period_value,
        scope=scope
    )