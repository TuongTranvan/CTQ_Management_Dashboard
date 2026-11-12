# app/services/upload_rate_chart_service.py
from app.repository.upload_rate_chart_repository import UploadRateChartRepository
from app.config.reflow_deflux_line_machine_config import (
    REFLOW_LINES,
    DEFLUX_LINES,
    MACHINE_MAPPING
)


class UploadRateService:

    @staticmethod
    def get_table(process: str) -> str:
        return "reflow_ctq" if process.lower() == "reflow" else "deflux_ctq"

    @staticmethod
    def get_target_machines(process: str, scope: str) -> list:
        """Lấy danh sách máy chuẩn theo process và scope từ Config"""
        lines_config = REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES

        if not scope or scope.lower() == "all":
            machines = []
            for m_list in lines_config.values():
                for m in m_list:
                    if m not in machines:
                        machines.append(m)
            return machines

        for line_name, m_list in lines_config.items():
            if line_name.lower() == scope.strip().lower():
                return m_list
        return []

    @staticmethod
    def get_station_from_config(machine_name: str, scope: str) -> str:
        """Tra cứu mã station (961, 964...) từ MACHINE_MAPPING"""
        info = MACHINE_MAPPING.get(machine_name, {})
        if "station" in info:
            return info["station"]
        if "stations" in info:
            for st_code, st_line in info["stations"].items():
                if st_line.lower() == scope.strip().lower():
                    return st_code
            return "/".join(info["stations"].keys())
        return "Unknown"

    @staticmethod
    def build_where_clause(period_type: str, period_value: str, scope: str) -> str:
        conditions = ["eff_time IS NOT NULL"]
        p_val = period_value.strip()

        if period_type.lower() == "month":
            conditions.append(f"strftime(eff_time, '%Y-%m') = '{p_val}'")
        elif period_type.lower() == "week":
            # Hỗ trợ cả "2026-W43" lẫn "w43" / "W43"
            if "-W" in p_val.upper():
                conditions.append(f"strftime(eff_time, '%G-W%V') = '{p_val.upper()}'")
            else:
                week_num = p_val.upper().replace("W", "").zfill(2)
                conditions.append(f"strftime(eff_time, '%V') = '{week_num}'")

        if scope and scope.lower() != "all":
            conditions.append(f"LOWER(line) = LOWER('{scope.strip()}')")

        return "WHERE " + " AND ".join(conditions)

    @staticmethod
    def get_summary(process: str, period_type: str, period_value: str, scope: str = "All"):
        table = UploadRateService.get_table(process)
        where_clause = UploadRateService.build_where_clause(period_type, period_value, scope)

        total, uploaded = UploadRateChartRepository.get_summary(table, where_clause)
        total = int(total or 0)
        uploaded = int(uploaded or 0)

        return {
            "uploaded": uploaded,
            "total": total,
            "rate": round((uploaded / total * 100), 2) if total else 0
        }

    @staticmethod
    def get_chart(process: str, period_type: str, period_value: str, scope: str = "All"):
        table = UploadRateService.get_table(process)
        where_clause = UploadRateService.build_where_clause(period_type, period_value, scope)
        x_field = "strftime(eff_time, '%Y-%m-%d')"

        summary = UploadRateService.get_summary(
            process=process,
            period_type=period_type,
            period_value=period_value,
            scope=scope
        )
        raw_data = UploadRateChartRepository.get_chart_data(table, where_clause, x_field)
        target_machines = UploadRateService.get_target_machines(process, scope)

        # Gom dữ liệu thực tế theo từng ngày (period) và từng máy
        grouped_by_period = {}
        for period, line, station, machine_name, total, uploaded in raw_data:
            if period not in grouped_by_period:
                grouped_by_period[period] = {}
            if machine_name not in grouped_by_period[period]:
                grouped_by_period[period][machine_name] = {"total": 0, "uploaded": 0}

            grouped_by_period[period][machine_name]["total"] += int(total or 0)
            grouped_by_period[period][machine_name]["uploaded"] += int(uploaded or 0)

        # Bù đắp đầy đủ danh sách máy từ Config cho mỗi mốc thời gian
        chart_items = []
        for period in sorted(grouped_by_period.keys()):
            machines_breakdown = []
            for m_name in target_machines:
                stats = grouped_by_period[period].get(m_name, {"total": 0, "uploaded": 0})
                m_total = stats["total"]
                m_uploaded = stats["uploaded"]
                machines_breakdown.append({
                    "machine": m_name,
                    "station": UploadRateService.get_station_from_config(m_name, scope),
                    "uploaded": m_uploaded,
                    "total": m_total,
                    "rate": round((m_uploaded / m_total * 100), 2) if m_total else 0
                })

            chart_items.append({
                "period": period,
                "machines": machines_breakdown
            })

        return {
            "process": process,
            "period_type": period_type,
            "period_value": period_value,
            "scope": scope,
            "summary": summary,
            "chart": chart_items
        }





# from app.repository.upload_rate_chart_repository import (
#     UploadRateChartRepository
# )

# from app.config.reflow_deflux_line_machine_config import (
#     REFLOW_LINES,
#     DEFLUX_LINES
# )

# class UploadRateService:

#     @staticmethod
#     def get_table(process):

#         return (
#             "reflow_ctq"
#             if process == "reflow"
#             else "deflux_ctq"
#         )

#     @staticmethod
#     def build_time_filter(
#         process,
#         period_type,
#         period_value
#     ):

#         time_col = (
#             "StartTime"
#             if process == "reflow"
#             else "START_TIME"
#         )

#         if period_type == "month":

#             return f"""
#             WHERE
#             strftime(
#                 {time_col},
#                 '%Y-%m'
#             )
#             =
#             '{period_value}'
#             """

#         if period_type == "week":

#             return f"""
#             WHERE
#             strftime(
#                 {time_col},
#                 '%Y-W%V'
#             )
#             =
#             '{period_value}'
#             """
#     @staticmethod
#     def get_summary(
#         process,
#         period_type,
#         period_value
#     ):

#         table = (
#             UploadRateService
#             .get_table(process)
#         )

#         where_clause = (
#             UploadRateService
#             .build_time_filter(
#                 process,
#                 period_type,
#                 period_value
#             )
#         )

#         total, uploaded = (
#             UploadRateChartRepository
#             .get_summary(
#                 table,
#                 where_clause
#             )
#         )

#         return {

#             "uploaded":
#             int(uploaded or 0),

#             "total":
#             int(total or 0),

#             "rate":
#             round(
#                 (
#                     uploaded /
#                     total *
#                     100
#                 ),
#                 2
#             )
#             if total
#             else 0
#         }
    
#     @staticmethod
#     def get_chart(
#         process,
#         period_type,
#         period_value,
#         scope
#     ):

#         summary = UploadRateService.get_summary(
#             process=process,
#             period_type=period_type,
#             period_value=period_value
#         )

#         return {
#             "process": process,
#             "period_type": period_type,
#             "period_value": period_value,
#             "scope": scope,
#             "summary": summary
#         }