# app/services/upload_rate_chart_service.py
from app.repository.upload_rate_chart_repository import UploadRateChartRepository
from app.config.reflow_deflux_line_machine_config import (
    REFLOW_LINES,
    DEFLUX_LINES,
    MACHINE_MAPPING
)
import calendar
from datetime import date, datetime, timedelta


class UploadRateService:
# card
    @staticmethod
    def get_overview_cards(period_type: str, period_value: str):
        where_clause = UploadRateService.build_where_clause(
            process="reflow", # Khi scope="All" thì không lọc theo line nên truyền process nào cũng ra đúng điều kiện thời gian
            period_type=period_type,
            period_value=period_value,
            scope="All"
        )
        overall_stats, process_stats, machine_rows = UploadRateChartRepository.get_overview_cards(where_clause)

        # 1. Tổng Strip và Upload sau khi gộp cả 2 process rồi mới lọc trùng Panel_SN
        total_strip = overall_stats.get("total", 0)
        uploaded_strip = overall_stats.get("uploaded", 0)
        total_rate = round((uploaded_strip / total_strip * 100), 2) if total_strip else 0

        # 2. Số liệu tách bạch theo từng process (lọc trùng riêng từng bên)
        reflow_total = process_stats.get("Reflow", {}).get("total", 0)
        reflow_uploaded = process_stats.get("Reflow", {}).get("uploaded", 0)
        reflow_rate = round((reflow_uploaded / reflow_total * 100), 2) if reflow_total else 0

        deflux_total = process_stats.get("Deflux", {}).get("total", 0)
        deflux_uploaded = process_stats.get("Deflux", {}).get("uploaded", 0)
        deflux_rate = round((deflux_uploaded / deflux_total * 100), 2) if deflux_total else 0

        # 3. Thống kê từng máy và danh sách máy Active
        machine_stats_map = {}
        active_machine_set = set()

        for m_name, process, m_total, m_uploaded in machine_rows:
            if m_total > 0:
                active_machine_set.add(m_name)
            if m_name not in machine_stats_map:
                machine_stats_map[m_name] = {"total": 0, "uploaded": 0}
            machine_stats_map[m_name]["total"] += m_total
            machine_stats_map[m_name]["uploaded"] += m_uploaded

        active_machine_names = sorted(list(active_machine_set))
        active_machines = len(active_machine_names)
        total_machines = len(MACHINE_MAPPING)

        machine_strips = []
        for m_name, info in MACHINE_MAPPING.items():
            stats = machine_stats_map.get(m_name, {"total": 0, "uploaded": 0})
            m_total = stats["total"]
            m_uploaded = stats["uploaded"]
            machine_strips.append({
                "machine_name": m_name,
                "type": info.get("type", "Unknown"),
                "line": info.get("line", "Deflux"),
                "is_active": m_total > 0,
                "total_strip": m_total,
                "upload_strip": m_uploaded,
                "rate": round((m_uploaded / m_total * 100), 2) if m_total else 0
            })

        return {
            "period_type": period_type,
            "period_value": period_value,
            "cards": {
                "total_strip": total_strip,
                "upload_strip": uploaded_strip,
                "total_rate": total_rate,
                "reflow": {
                    "total_strip": reflow_total,
                    "upload_strip": reflow_uploaded,
                    "rate": reflow_rate
                },
                "deflux": {
                    "total_strip": deflux_total,
                    "upload_strip": deflux_uploaded,
                    "rate": deflux_rate
                },
                "active_machines": active_machines,
                "total_machines": total_machines,
                "active_machine_names": active_machine_names,
                "machine_strips": machine_strips
            }
        }


# reflow, deflux upload rate chart

    @staticmethod
    def get_table(process: str) -> str:
        return "reflow_ctq" if process.lower() == "reflow" else "deflux_ctq"

    @staticmethod
    def normalize_scope(process: str, scope: str) -> str:
        """
        Chuẩn hóa tham số scope (VD: 'SMT 1' -> 'SMT1', 'deflux 2' -> 'Deflux2')
        để khớp chính xác với key trong Config và View DuckDB.
        """
        if not scope or scope.strip().lower() == "all":
            return "All"

        clean_input = scope.replace(" ", "").lower()
        lines_config = REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES

        for line_name in lines_config.keys():
            if line_name.replace(" ", "").lower() == clean_input:
                return line_name
        return scope.strip()

    @staticmethod
    def get_target_machines(process: str, scope: str) -> list:
        """Lấy danh sách máy chuẩn theo process và scope đã chuẩn hóa"""
        lines_config = REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES
        norm_scope = UploadRateService.normalize_scope(process, scope)

        if norm_scope == "All":
            machines = []
            for m_list in lines_config.values():
                for m in m_list:
                    if m not in machines:
                        machines.append(m)
            return machines

        return lines_config.get(norm_scope, [])

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
    def generate_expected_periods(period_type: str, period_value: str) -> list:
        """
        Tự động sinh danh sách đầy đủ các mốc trên trục X:
        - Nếu period_type == 'month': trả về các tuần của tháng đó (VD: ['W31', 'W32', 'W33', 'W34', 'W35'])
        - Nếu period_type == 'week': trả về đủ 7 ngày trong tuần (VD: ['2026-10-19', ..., '2026-10-25'])
        """
        p_val = period_value.strip()

        if period_type.lower() == "month":
            try:
                year, month = map(int, p_val.split("-"))
                _, num_days = calendar.monthrange(year, month)
                weeks = []
                for day in range(1, num_days + 1):
                    d = date(year, month, day)
                    w_label = f"W{d.isocalendar()[1]:02d}"
                    if w_label not in weeks:
                        weeks.append(w_label)
                return weeks
            except Exception:
                return []

        elif period_type.lower() == "week":
            try:
                upper_val = p_val.upper()
                if "-W" in upper_val:
                    year_str, week_str = upper_val.split("-W")
                    year, week = int(year_str), int(week_str)
                else:
                    year = datetime.now().year
                    week = int(upper_val.replace("W", ""))

                monday = date.fromisocalendar(year, week, 1)
                return [(monday + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(7)]
            except Exception:
                return []

        return []

    @staticmethod
    def build_where_clause(process: str, period_type: str, period_value: str, scope: str) -> str:
        conditions = ["eff_time IS NOT NULL"]
        p_val = period_value.strip()
        norm_scope = UploadRateService.normalize_scope(process, scope)

        if period_type.lower() == "month":
            conditions.append(f"strftime(eff_time, '%Y-%m') = '{p_val}'")
        elif period_type.lower() == "week":
            if "-W" in p_val.upper():
                conditions.append(f"strftime(eff_time, '%G-W%V') = '{p_val.upper()}'")
            else:
                curr_year = datetime.now().year
                week_num = p_val.upper().replace("W", "").zfill(2)
                conditions.append(f"strftime(eff_time, '%G-W%V') = '{curr_year}-W{week_num}'")

        if norm_scope != "All":
            conditions.append(f"LOWER(line) = LOWER('{norm_scope}')")

        return "WHERE " + " AND ".join(conditions)

    @staticmethod
    def get_summary(process: str, period_type: str, period_value: str, scope: str = "All"):
        table = UploadRateService.get_table(process)
        where_clause = UploadRateService.build_where_clause(process, period_type, period_value, scope)

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
        norm_scope = UploadRateService.normalize_scope(process, scope)
        table = UploadRateService.get_table(process)
        where_clause = UploadRateService.build_where_clause(process, period_type, period_value, norm_scope)

        # Trục X: Month -> chia theo Tuần (W31, W32...); Week -> chia theo Ngày (YYYY-MM-DD)
        if period_type.lower() == "month":
            x_field = "'W' || strftime(eff_time, '%V')"
        else:
            x_field = "strftime(eff_time, '%Y-%m-%d')"

        summary = UploadRateService.get_summary(
            process=process,
            period_type=period_type,
            period_value=period_value,
            scope=norm_scope
        )
        raw_data = UploadRateChartRepository.get_chart_data(table, where_clause, x_field)

        lines_config = REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES
        target_machines = UploadRateService.get_target_machines(process, norm_scope)

        # Gom dữ liệu thực tế từ DuckDB theo từng mốc thời gian
        grouped_by_period = {}
        for period, line, station, machine_name, total, uploaded in raw_data:
            if period not in grouped_by_period:
                grouped_by_period[period] = {"machines": {}, "lines": {}}

            # Cộng dồn theo từng máy
            if machine_name not in grouped_by_period[period]["machines"]:
                grouped_by_period[period]["machines"][machine_name] = {"total": 0, "uploaded": 0}
            grouped_by_period[period]["machines"][machine_name]["total"] += int(total or 0)
            grouped_by_period[period]["machines"][machine_name]["uploaded"] += int(uploaded or 0)

            # Cộng dồn theo từng Line
            if line not in grouped_by_period[period]["lines"]:
                grouped_by_period[period]["lines"][line] = {"total": 0, "uploaded": 0}
            grouped_by_period[period]["lines"][line]["total"] += int(total or 0)
            grouped_by_period[period]["lines"][line]["uploaded"] += int(uploaded or 0)

        # Hợp nhất các mốc thời gian chuẩn (đủ tuần của tháng hoặc đủ 7 ngày của tuần) với dữ liệu thực tế
        expected_periods = UploadRateService.generate_expected_periods(period_type, period_value)
        all_periods = expected_periods if expected_periods else sorted(grouped_by_period.keys())

        target_lines = (
            list(lines_config.keys())
            if norm_scope == "All"
            else [norm_scope]
        )

        chart_items = []
        for period in all_periods:
            period_bucket = grouped_by_period.get(period, {"machines": {}, "lines": {}})

            # Dữ liệu theo từng Line (dùng khi scope == "All")
            lines_breakdown = []
            for l_name in target_lines:
                l_stats = period_bucket["lines"].get(l_name, {"total": 0, "uploaded": 0})
                l_total = l_stats["total"]
                l_uploaded = l_stats["uploaded"]
                lines_breakdown.append({
                    "line": l_name,
                    "uploaded": l_uploaded,
                    "total": l_total,
                    "rate": round((l_uploaded / l_total * 100), 2) if l_total else 0
                })

            # Dữ liệu chi tiết theo từng Máy của Line đang chọn (dùng khi scope == "SMT1", "SMT2",...)
            machines_breakdown = []
            for m_name in target_machines:
                m_stats = period_bucket["machines"].get(m_name, {"total": 0, "uploaded": 0})
                m_total = m_stats["total"]
                m_uploaded = m_stats["uploaded"]
                machines_breakdown.append({
                    "machine": m_name,
                    "station": UploadRateService.get_station_from_config(m_name, norm_scope),
                    "uploaded": m_uploaded,
                    "total": m_total,
                    "rate": round((m_uploaded / m_total * 100), 2) if m_total else 0
                })

            chart_items.append({
                "period": period,
                "lines": lines_breakdown,
                "machines": machines_breakdown
            })

        return {
            "process": process,
            "period_type": period_type,
            "period_value": period_value,
            "scope": norm_scope,
            "view_mode": "by_line" if norm_scope == "All" else "by_machine",
            "summary": summary,
            "chart": chart_items
        }




