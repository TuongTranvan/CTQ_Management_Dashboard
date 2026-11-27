import numpy as np
import pandas as pd

from app.config.cov_config import COV_DEFLUX, COV_REFLOW
from app.repository.out_of_spec_list_repository import OutOfSpecListRepository


class OutOfSpecListService:
    @staticmethod
    def get_cov_limit(parameter: str):
        p = parameter.upper()

        if "E_ZONE11" in p and "SENSOR" in p:
            return 6

        if (p.startswith("B_") or p.startswith("E_")) and "SENSOR" in p:
            return 5

        if "FAN_SPEED" in p:
            return 5

        if "CHAIN_SPEED" in p:
            return 5

        if "REFLOW_TIME" in p:
            return 5

        if "PRESSURE" in p:
            return 8

        if "TEMP" in p:
            return 5

        return None

    @staticmethod
    def is_cov_fail_vectorized(
        parameter: str, cov_series: pd.Series
    ) -> pd.Series:
        """Kiểm tra điều kiện COV fail trên toàn bộ mảng (Vectorized)."""
        p = parameter.upper()
        zero_fail_keywords = (
            "OXYGEN",
            "REFLOW_TIME",
            "FAN_SPEED",
            "CHAIN_SPEED",
            "PRESSURE",
            "TEMP",
            "CONCENTRATION",
            "DI_WATER",
        )
        is_zero_fail = any(kw in p for kw in zero_fail_keywords)

        fail_mask = pd.Series(False, index=cov_series.index)

        if is_zero_fail:
            fail_mask |= cov_series == 0

        limit = OutOfSpecListService.get_cov_limit(parameter)
        if limit is not None:
            fail_mask |= cov_series > limit

        return fail_mask

    @staticmethod
    def build_out_spec_rows(
        df: pd.DataFrame, parameter_defs: list[dict]
    ) -> list[dict]:
        rows = []
        if df.empty:
            return rows

        for parameter_info in parameter_defs:
            parameter = parameter_info["parameter"]
            value_col = parameter_info["value_col"]
            result_col = parameter_info["result_col"]
            upper_col = parameter_info["upper_col"]
            lower_col = parameter_info["lower_col"]

            if result_col not in df.columns:
                continue

            fail_mask = df[result_col].astype(str).str.upper().eq("FAIL")
            if not fail_mask.any():
                continue

            fail_df = df.loc[fail_mask].copy()

            has_val = value_col in fail_df.columns
            has_usl = upper_col in fail_df.columns
            has_lsl = lower_col in fail_df.columns

            if has_val:
                fail_df[value_col] = pd.to_numeric(
                    fail_df[value_col], errors="coerce"
                )
            if has_usl:
                fail_df[upper_col] = pd.to_numeric(
                    fail_df[upper_col], errors="coerce"
                )
            if has_lsl:
                fail_df[lower_col] = pd.to_numeric(
                    fail_df[lower_col], errors="coerce"
                )

            machine_counts = (
                fail_df.groupby(["line", "machine_name"], sort=False)[
                    "Panel_SN"
                ]
                .nunique()
                .reset_index(name="cnt")
                .sort_values(["line", "cnt"], ascending=[True, False])
            )
            top3_map = (
                machine_counts.groupby("line", sort=False)["machine_name"]
                .apply(lambda s: ", ".join(s.head(3)))
                .to_dict()
            )

            agg_dict = {"number_of_strip": ("Panel_SN", "nunique")}
            if has_val:
                agg_dict["value"] = (value_col, "mean")
            if has_usl:
                agg_dict["usl"] = (upper_col, "mean")
            if has_lsl:
                agg_dict["lsl"] = (lower_col, "mean")

            summary_df = fail_df.groupby("line", sort=False).agg(**agg_dict)

            for line, row in summary_df.iterrows():
                val = (
                    round(float(row["value"]), 4)
                    if has_val and pd.notna(row["value"])
                    else None
                )
                usl = (
                    round(float(row["usl"]), 4)
                    if has_usl and pd.notna(row["usl"])
                    else None
                )
                lsl = (
                    round(float(row["lsl"]), 4)
                    if has_lsl and pd.notna(row["lsl"])
                    else None
                )

                rows.append(
                    {
                        "line": line,
                        "parameter": parameter,
                        "top3_machine": top3_map.get(line, ""),
                        "value": val,
                        "usl": usl,
                        "lsl": lsl,
                        "number_of_strip": int(row["number_of_strip"]),
                        "status": "Out Spec",
                    }
                )

        return rows

    @staticmethod
    def build_out_cov_rows(df: pd.DataFrame, process: str) -> list[dict]:
        if df.empty:
            return []

        cov_parameters = (
            COV_REFLOW if process.lower() == "reflow" else COV_DEFLUX
        )
        valid_params = [p for p in cov_parameters if p in df.columns]
        if not valid_params:
            return []

        dedup_df = (
            df.sort_values("eff_time")
            .drop_duplicates(
                subset=["line", "machine_name", "Panel_SN"], keep="first"
            )
            .reset_index(drop=True)
        )

        group_counts = dedup_df.groupby(["line", "machine_name"])[
            "Panel_SN"
        ].transform("count")
        eligible_df = dedup_df[group_counts >= 50].copy()

        if eligible_df.empty:
            return []

        for p in valid_params:
            eligible_df[p] = pd.to_numeric(eligible_df[p], errors="coerce")

        rows = []
        grouped = eligible_df.groupby(["line", "machine_name"], sort=False)

        for parameter in valid_params:
            roll = grouped[parameter].rolling(window=50, min_periods=2)
            roll_mean = roll.mean().reset_index(level=[0, 1], drop=True)
            roll_std = roll.std(ddof=1).reset_index(level=[0, 1], drop=True)

            pos_in_group = grouped.cumcount()
            valid_window_mask = pos_in_group >= 49

            valid_mask = (
                valid_window_mask & roll_mean.notna() & roll_std.notna()
            )
            if not valid_mask.any():
                continue

            sub_mean = roll_mean[valid_mask]
            sub_std = roll_std[valid_mask]

            cov_series = np.where(
                sub_mean == 0, 0.0, (sub_std / sub_mean) * 100.0
            )
            cov_series = pd.Series(cov_series, index=sub_mean.index)

            fail_mask = OutOfSpecListService.is_cov_fail_vectorized(
                parameter, cov_series
            )
            if not fail_mask.any():
                continue

            failed_cov = cov_series[fail_mask]
            failed_meta = eligible_df.loc[
                failed_cov.index, ["line", "machine_name"]
            ].copy()
            failed_meta["cov"] = failed_cov.values

            machine_rank = (
                failed_meta.groupby(["line", "machine_name"], sort=False)
                .size()
                .reset_index(name="cnt")
                .sort_values(["line", "cnt"], ascending=[True, False])
            )
            top3_map = (
                machine_rank.groupby("line", sort=False)["machine_name"]
                .apply(lambda s: ", ".join(s.head(3)))
                .to_dict()
            )

            line_summary = failed_meta.groupby("line", sort=False).agg(
                avg_cov=("cov", "mean"),
                strip_count=("cov", "count"),
            )

            limit_val = OutOfSpecListService.get_cov_limit(parameter)

            for line, row in line_summary.iterrows():
                rows.append(
                    {
                        "line": line,
                        "parameter": parameter,
                        "top3_machine": top3_map.get(line, ""),
                        "value": round(float(row["avg_cov"]), 4),
                        "usl": limit_val,
                        "lsl": 0,
                        "number_of_strip": int(row["strip_count"]),
                        "status": "Out COV",
                    }
                )

        return rows

    @staticmethod
    def get_list(
        process: str,
        period_type: str,
        period_value: str,
        scope: str = "All",
    ):
        table_name = OutOfSpecListRepository.get_table(process)

        df = OutOfSpecListRepository.get_filtered_data(
            process=process,
            period_type=period_type,
            period_value=period_value,
            scope=scope,
        )

        parameter_defs = OutOfSpecListRepository.get_parameter_definitions(
            table_name
        )

        spec_rows = OutOfSpecListService.build_out_spec_rows(
            df, parameter_defs
        )
        cov_rows = OutOfSpecListService.build_out_cov_rows(df, process)

        all_rows = spec_rows + cov_rows
        all_rows.sort(key=lambda x: x["number_of_strip"], reverse=True)

        return {
            "process": process,
            "period_type": period_type,
            "period_value": period_value,
            "scope": scope,
            "total": len(all_rows),
            "items": all_rows,
        }
