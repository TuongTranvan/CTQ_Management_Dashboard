import time
from typing import Literal

from fastapi import APIRouter, HTTPException, Query

from app.services.out_of_spec_list_service import OutOfSpecListService
from app.services.out_spec_rate_service import OutSpecRateService

router = APIRouter()

_API_CACHE: dict[tuple, tuple[float, dict]] = {}
CACHE_TTL_SECONDS = 60


def _get_cached_or_compute(cache_key: tuple, compute_fn):
    now = time.time()
    cached = _API_CACHE.get(cache_key)

    if cached and (now - cached[0] < CACHE_TTL_SECONDS):
        return cached[1]

    result = compute_fn()
    _API_CACHE[cache_key] = (now, result)
    return result


@router.get("/chart")
def get_out_spec_chart(
    process: str,          # reflow | deflux
    period_type: str,      # month | week
    period_value: str,     # 2026-11 | 2026-W45
    scope: str = "All",    # All | SMT1 | SMT2 | SMT3 | Deflux1 | Deflux2 | Deflux3
):
    return OutSpecRateService.get_chart(
        process=process,
        period_type=period_type,
        period_value=period_value,
        scope=scope,
    )


@router.get("/table/list")
def get_out_spec_list(
    process: Literal["reflow", "deflux"] = Query(
        ..., description="reflow | deflux"
    ),
    period_type: Literal["month", "week"] = Query(
        ..., description="month | week"
    ),
    period_value: str = Query(
        ..., description="Ví dụ: 2026-11 hoặc 2026-W45"
    ),
    scope: str = Query(
        default="All",
        description="All | SMT1 | SMT2 | SMT3 | Deflux1 | Deflux2 | Deflux3",
    ),
):
    try:
        cache_key = ("table_list", process, period_type, period_value, scope)
        return _get_cached_or_compute(
            cache_key,
            lambda: OutOfSpecListService.get_list(
                process=process,
                period_type=period_type,
                period_value=period_value,
                scope=scope,
            ),
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
