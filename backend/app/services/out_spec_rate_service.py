# app/services/out_spec_rate_service.py

import calendar
from datetime import date, datetime, timedelta

from app.config.reflow_deflux_line_machine_config import (
    DEFLUX_LINES,
    REFLOW_LINES,
)
from app.repository.out_spec_rate_repository import OutSpecRateRepository


class OutSpecRateService:

    @staticmethod
    def get_table(process: str) -> str:
        return "reflow_ctq" if process.lower() == "reflow" else "deflux_ctq"

    @staticmethod
    def get_fail_table(process: str) -> str:
        return (
            "reflow_ctq_fail"
            if process.lower() == "reflow"
            else "deflux_ctq_fail"
        )

    @staticmethod
    def normalize_scope(process: str, scope: str) -> str:
        if not scope or scope.strip().lower() == "all":
            return "All"

        clean_input = scope.replace(" ", "").lower()
        lines_config = (
            REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES
        )

        for line_name in lines_config.keys():
            if line_name.replace(" ", "").lower() == clean_input:
                return line_name

        return scope

    @staticmethod
    def get_target_machines(process: str, scope: str) -> list[str]:
        lines_config = (
            REFLOW_LINES if process.lower() == "reflow" else DEFLUX_LINES
        )
        norm_scope = OutSpecRateService.normalize_scope(process, scope)

        if norm_scope == "All":
            machines = []
            for machine_list in lines_config.values():
                for machine in machine_list:
                    if machine not in machines:
                        machines.append(machine)
            return machines

        return lines_config.get(norm_scope, [])

    @staticmethod
    def build_where_clause(
        process: str, period_type: str, period_value: str, scope: str
    ) -> str:
        conditions = ["eff_time IS NOT NULL"]
        norm_scope = OutSpecRateService.normalize_scope(process, scope)
        p_val = period_value.strip()

        if period_type.lower() == "month":
            conditions.append(f"strftime(eff_time, '%Y-%m') = '{p_val}'")

        elif period_type.lower() == "week":
            if "-W" in p_val.upper():
                conditions.append(
                    f"strftime(eff_time, '%G-W%V') = '{p_val.upper()}'"
                )
            else:
                curr_year = datetime.now().year
                week_num = p_val.upper().replace("W", "").zfill(2)
                conditions.append(
                    f"strftime(eff_time, '%G-W%V') = '{curr_year}-W{week_num}'"
                )

        if norm_scope != "All":
            conditions.append(f"LOWER(line) = LOWER('{norm_scope}')")

        return "WHERE " + " AND ".join(conditions)

    @staticmethod
    def generate_expected_periods(
        period_type: str, period_value: str
    ) -> list[str]:
        p_val = period_value.strip()

        if period_type.lower() == "month":
            year, month = map(int, p_val.split("-"))
            _, num_days = calendar.monthrange(year, month)
            weeks = []

            for day in range(1, num_days + 1):
                d = date(year, month, day)
                week_label = f"W{d.isocalendar()[1]:02d}"
                if week_label not in weeks:
                    weeks.append(week_label)

            return weeks

        elif period_type.lower() == "week":
            year_str, week_str = p_val.upper().split("-W")
            monday = date.fromisocalendar(int(year_str), int(week_str), 1)
            return [
                (monday + timedelta(days=i)).strftime("%Y-%m-%d")
                for i in range(7)
            ]

        return []

    @staticmethod
    def get_chart(
        process: str,
        period_type: str,
        period_value: str,
        scope: str = "All",
    ) -> dict:
        normal_table = OutSpecRateService.get_table(process)
        fail_table = OutSpecRateService.get_fail_table(process)
        norm_scope = OutSpecRateService.normalize_scope(process, scope)
        where_clause = OutSpecRateService.build_where_clause(
            process, period_type, period_value, norm_scope
        )

        x_field = (
            "'W' || strftime(eff_time, '%V')"
            if period_type.lower() == "month"
            else "strftime(eff_time, '%Y-%m-%d')"
        )

        total_strip = OutSpecRateRepository.get_total_strip(
            normal_table, where_clause
        )
        fail_df = OutSpecRateRepository.get_fail_rows(
            fail_table, where_clause, x_field
        )
        result_columns = OutSpecRateRepository.get_result_columns(fail_table)

        if fail_df.empty:
            return {
                "process": process,
                "summary": {
                    "fail_strip": 0,
                    "total_strip": total_strip,
                    "rate": 0,
                },
                "chart": [],
            }

        # Chỉ dùng *_result, không dùng Result
        fail_df["is_fail"] = fail_df[result_columns].eq("FAIL").any(axis=1)

        # Chỉ giữ các strip có ít nhất 1 parameter FAIL
        fail_df = fail_df[fail_df["is_fail"]]

        # 1 strip chỉ được tính 1 lần trong cùng period + line + machine
        fail_df = fail_df.drop_duplicates(
            subset=["Panel_SN", "period", "line", "machine_name"]
        )

        fail_strip = fail_df["Panel_SN"].nunique()

        period_line_totals = (
            OutSpecRateRepository.get_period_line_total_strip(
                normal_table, where_clause, x_field
            )
        )
        period_machine_totals = (
            OutSpecRateRepository.get_period_machine_total_strip(
                normal_table, where_clause, x_field
            )
        )

        line_total_map = {
            (period, line): total
            for period, line, total in period_line_totals
        }
        machine_total_map = {
            (period, machine): total
            for period, machine, total in period_machine_totals
        }

        summary_rate = (
            round(fail_strip / total_strip * 100, 2) if total_strip else 0
        )

        grouped = {}
        for _, row in fail_df.iterrows():
            period = row["period"]
            line = row["line"]
            machine = row["machine_name"]

            if period not in grouped:
                grouped[period] = {"lines": {}, "machines": {}}

            # Line
            if line not in grouped[period]["lines"]:
                grouped[period]["lines"][line] = {"fail": 0}
            grouped[period]["lines"][line]["fail"] += 1

            # Machine
            if machine not in grouped[period]["machines"]:
                grouped[period]["machines"][machine] = {"fail": 0}
            grouped[period]["machines"][machine]["fail"] += 1

        periods = OutSpecRateService.generate_expected_periods(
            period_type, period_value
        )

        target_lines = (
            list(REFLOW_LINES.keys())
            if process.lower() == "reflow"
            else list(DEFLUX_LINES.keys())
        )
        if norm_scope != "All":
            target_lines = [norm_scope]

        target_machines = OutSpecRateService.get_target_machines(
            process, norm_scope
        )

        chart = []
        for period in periods:
            bucket = grouped.get(period, {"lines": {}, "machines": {}})

            lines_breakdown = []
            for line in target_lines:
                fail_count = bucket["lines"].get(line, {"fail": 0})["fail"]
                total_count = line_total_map.get((period, line), 0)
                lines_breakdown.append(
                    {
                        "line": line,
                        "fail": fail_count,
                        "total": total_count,
                        "rate": (
                            round((fail_count / total_count) * 100, 2)
                            if total_count
                            else 0
                        ),
                    }
                )

            machines_breakdown = []
            for machine in target_machines:
                fail_count = bucket["machines"].get(machine, {"fail": 0})[
                    "fail"
                ]
                total_count = machine_total_map.get((period, machine), 0)
                machines_breakdown.append(
                    {
                        "machine": machine,
                        "fail": fail_count,
                        "total": total_count,
                        "rate": (
                            round((fail_count / total_count) * 100, 2)
                            if total_count
                            else 0
                        ),
                    }
                )

            chart.append(
                {
                    "period": period,
                    "lines": lines_breakdown,
                    "machines": machines_breakdown,
                }
            )

        return {
            "process": process,
            "period_type": period_type,
            "period_value": period_value,
            "scope": norm_scope,
            "view_mode": "by_line" if norm_scope == "All" else "by_machine",
            "summary": {
                "fail": fail_strip,
                "total": total_strip,
                "rate": summary_rate,
            },
            "chart": chart,
        }
