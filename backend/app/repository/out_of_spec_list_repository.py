from datetime import datetime, timedelta
from functools import lru_cache

from app.config.cov_config import COV_DEFLUX, COV_REFLOW
from app.database.connection import conn


class OutOfSpecListRepository:
    @staticmethod
    def get_table(process: str) -> str:
        return (
            "reflow_ctq_analysis"
            if process.lower() == "reflow"
            else "deflux_ctq_analysis"
        )

    @staticmethod
    @lru_cache(maxsize=4)
    def get_columns(table_name: str) -> list[str]:
        """Cache danh sách cột để tránh query lại schema mỗi request."""
        rel = conn.execute(f"SELECT * FROM {table_name} LIMIT 0")
        return [col[0] for col in rel.description]

    @staticmethod
    @lru_cache(maxsize=4)
    def get_parameter_definitions(table_name: str) -> list[dict]:
        """Cache metadata parameter động."""
        columns = OutOfSpecListRepository.get_columns(table_name)
        parameters = []

        for col in columns:
            if not col.lower().endswith("_result") or col.lower() == "result":
                continue

            parameter = col[:-7]
            parameters.append(
                {
                    "parameter": parameter,
                    "value_col": parameter,
                    "result_col": col,
                    "upper_col": f"{parameter}_upperlimit",
                    "lower_col": f"{parameter}_lowerlimit",
                }
            )

        return parameters

    @staticmethod
    def _build_time_bounds(
        period_type: str, period_value: str
    ) -> tuple[str, str]:
        """Chuyển đổi Month/Week sang khoảng [start_dt, end_dt)."""
        p_val = period_value.strip().upper()
        p_type = period_type.lower()

        if p_type == "month":
            year, month = map(int, p_val.split("-"))
            start_dt = datetime(year, month, 1)
            if month == 12:
                end_dt = datetime(year + 1, 1, 1)
            else:
                end_dt = datetime(year, month + 1, 1)
            return (
                start_dt.strftime("%Y-%m-%d %H:%M:%S"),
                end_dt.strftime("%Y-%m-%d %H:%M:%S"),
            )

        if p_type == "week":
            if "-W" in p_val:
                year_str, week_str = p_val.split("-W")
                year, week = int(year_str), int(week_str)
            else:
                year = datetime.now().year
                week = int(p_val.replace("W", ""))

            start_dt = datetime.fromisocalendar(year, week, 1)
            end_dt = start_dt + timedelta(days=7)
            return (
                start_dt.strftime("%Y-%m-%d %H:%M:%S"),
                end_dt.strftime("%Y-%m-%d %H:%M:%S"),
            )

        raise ValueError(f"Unsupported period_type: {period_type}")

    @staticmethod
    def get_filtered_data(
        process: str,
        period_type: str,
        period_value: str,
        scope: str = "All",
    ):
        """Chỉ SELECT đúng các cột cần thiết và lọc theo khoảng thời gian chuẩn."""
        table_name = OutOfSpecListRepository.get_table(process)
        all_cols = set(OutOfSpecListRepository.get_columns(table_name))
        param_defs = OutOfSpecListRepository.get_parameter_definitions(
            table_name
        )
        cov_params = (
            COV_REFLOW if process.lower() == "reflow" else COV_DEFLUX
        )

        needed_cols = {"Panel_SN", "line", "machine_name", "eff_time"}

        for p_info in param_defs:
            for key in ("value_col", "result_col", "upper_col", "lower_col"):
                col_name = p_info[key]
                if col_name in all_cols:
                    needed_cols.add(col_name)

        for cov_p in cov_params:
            if cov_p in all_cols:
                needed_cols.add(cov_p)

        select_clause = ", ".join(f'"{c}"' for c in needed_cols)

        start_str, end_str = OutOfSpecListRepository._build_time_bounds(
            period_type, period_value
        )

        conditions = [
            "eff_time IS NOT NULL",
            f"eff_time >= TIMESTAMP '{start_str}'",
            f"eff_time < TIMESTAMP '{end_str}'",
        ]

        if scope and scope.strip().lower() != "all":
            safe_scope = scope.strip().replace("'", "''")
            conditions.append(f"LOWER(line) = LOWER('{safe_scope}')")

        where_clause = "WHERE " + " AND ".join(conditions)

        query = f"""
        SELECT {select_clause}
        FROM {table_name}
        {where_clause}
        """

        return conn.sql(query).to_arrow_table().to_pandas()

