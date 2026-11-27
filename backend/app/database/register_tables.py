# app/database/register_tables.py
from app.config.reflow_deflux_line_machine_config import MACHINE_MAPPING
from app.database.connection import conn


def _build_mapping_sql(process_type: str) -> tuple[str, str, str]:
    """Sinh câu lệnh CASE WHEN riêng cho từng process để giảm độ dài SQL."""
    name_cases = []
    line_cases = []
    station_cases = []

    for m_name, info in MACHINE_MAPPING.items():
        if info["type"].lower() != process_type.lower():
            continue

        serial = info["machine_id"]
        cond = (
            f"(Machine_ID = '{m_name}' OR Machine_ID = '{serial}' "
            f"OR get_file_serial(Source_File) = '{serial}')"
        )
        name_cases.append(f"WHEN {cond} THEN '{m_name}'")

        if info["type"] == "Reflow":
            line_cases.append(f"WHEN {cond} THEN '{info['line']}'")
            station_cases.append(f"WHEN {cond} THEN '{info['station']}'")
        else:
            for st_code, st_line in info["stations"].items():
                deflux_cond = (
                    f"{cond} AND LOWER(get_deflux_tag(Source_File)) = "
                    f"LOWER('{st_line}')"
                )
                line_cases.append(f"WHEN {deflux_cond} THEN '{st_line}'")
                station_cases.append(f"WHEN {deflux_cond} THEN '{st_code}'")

    name_sql = (
        f"CASE {' '.join(name_cases)} ELSE COALESCE(Machine_ID, 'Unknown') END"
        if name_cases
        else "COALESCE(Machine_ID, 'Unknown')"
    )
    line_sql = (
        f"CASE {' '.join(line_cases)} ELSE get_deflux_tag(Source_File) END"
        if line_cases
        else "get_deflux_tag(Source_File)"
    )
    station_sql = (
        f"CASE {' '.join(station_cases)} ELSE 'Unknown' END"
        if station_cases
        else "'Unknown'"
    )

    return name_sql, line_sql, station_sql


def init_duckdb_views():
    # Cấu hình tối ưu bộ nhớ & chống tràn RAM (Out of Memory)
    conn.execute("SET preserve_insertion_order = false;")
    conn.execute("SET temp_directory = 'data/duckdb_temp';")
    conn.execute("SET memory_limit = '4GB';")

    # 1. Macro bóc tách thời gian 14 số (YYYYMMDDHHMMSS) từ Source_File
    conn.execute(
        """
        CREATE OR REPLACE MACRO get_effective_time(fname, fallback_time) AS
            COALESCE(
                try_strptime(
                    regexp_extract(
                        CAST(fname AS VARCHAR),
                        '(?:^|_)(\\d{14})(?:_|\\.|$)',
                        1
                    ),
                    '%Y%m%d%H%M%S'
                ),
                try_cast(fallback_time AS TIMESTAMP)
            );
        """
    )

    # 2. Macro bóc tách Serial (VD: 2025-1100019) từ Source_File
    conn.execute(
        """
        CREATE OR REPLACE MACRO get_file_serial(fname) AS
            regexp_extract(
                CAST(fname AS VARCHAR),
                '(?:^|_)(\\d{4}-\\d{5,10})(?:_|\\.|$)',
                1
            );
        """
    )

    # 3. Macro bóc tách tag Deflux1/2/3 từ Source_File
    conn.execute(
        """
        CREATE OR REPLACE MACRO get_deflux_tag(fname) AS
            COALESCE(
                NULLIF(
                    regexp_extract(
                        CAST(fname AS VARCHAR),
                        '(?:^|_)(Deflux\\d+)(?:_|\\.|$)',
                        1
                    ),
                    ''
                ),
                'Unknown'
            );
        """
    )

    # 4. Sinh CASE WHEN tách biệt cho Reflow và Deflux
    reflow_name, reflow_line, reflow_station = _build_mapping_sql("Reflow")
    deflux_name, deflux_line, deflux_station = _build_mapping_sql("Deflux")

    # ======================
    # UPLOAD RATE and cards
    # ======================

    # 5. View Reflow cho card và upload rate
    conn.execute(
        f"""
        CREATE OR REPLACE VIEW reflow_ctq AS
        SELECT
            Panel_SN,
            {reflow_name} AS machine_name,
            {reflow_line} AS line,
            {reflow_station} AS station,
            get_effective_time(Source_File, StartTime) AS eff_time,
            Source_Folder
        FROM read_parquet('data/reflow_ctq.parquet');
        """
    )

    # 6. View Deflux cho card và upload rate
    conn.execute(
        f"""
        CREATE OR REPLACE VIEW deflux_ctq AS
        SELECT
            Panel_SN,
            {deflux_name} AS machine_name,
            {deflux_line} AS line,
            {deflux_station} AS station,
            get_effective_time(Source_File, START_TIME) AS eff_time,
            Source_Folder
        FROM read_parquet('data/deflux_ctq.parquet');
        """
    )

    # ======================
    # Spec rate upload success full
    # ======================

    # 7. View reflow cho phần out spec rate
    conn.execute(
        f"""
        CREATE OR REPLACE VIEW reflow_ctq_fail AS
        SELECT
            *,
            {reflow_name} AS machine_name,
            {reflow_line} AS line,
            {reflow_station} AS station,
            get_effective_time(Source_File, StartTime) AS eff_time
        FROM read_parquet('data/reflow_ctq.parquet')
        WHERE
            Source_Folder LIKE '%CTQ_FAIL_SPEC%'
            OR Source_Folder LIKE '%CTQ_FAIL_COV_AND_SPEC%';
        """
    )

    # 8. View deflux cho phần out spec rate
    conn.execute(
        """
        CREATE OR REPLACE VIEW deflux_ctq_fail AS
        SELECT *
        FROM read_parquet('data/deflux_ctq.parquet')
        WHERE
            Source_Folder LIKE '%CTQ_FAIL_SPEC%'
            OR Source_Folder LIKE '%CTQ_FAIL_COV_AND_SPEC%';
        """
    )

    # ======================
    # Out of spec list (Materialized Table + Sorted by eff_time)
    # ======================

    # 9. Bảng vật liệu hóa cho Reflow Out Spec List (tính sẵn Regex & Index)
    # conn.execute("DROP VIEW IF EXISTS reflow_ctq_analysis;")
    conn.execute(
        f"""
        CREATE OR REPLACE TABLE reflow_ctq_analysis AS
        SELECT
            *,
            {reflow_name} AS machine_name,
            {reflow_line} AS line,
            {reflow_station} AS station,
            get_effective_time(Source_File, StartTime) AS eff_time
        FROM read_parquet('data/reflow_ctq.parquet')
        WHERE
            Source_Folder LIKE '%CTQ_FAIL_SPEC%'
            OR Source_Folder LIKE '%CTQ_FAIL_COV%';
        """
    )

    # 10. Bảng vật liệu hóa cho Deflux Out Spec List
    # conn.execute("DROP VIEW IF EXISTS deflux_ctq_analysis;")
    conn.execute(
        f"""
        CREATE OR REPLACE TABLE deflux_ctq_analysis AS
        SELECT
            *,
            {deflux_name} AS machine_name,
            {deflux_line} AS line,
            {deflux_station} AS station,
            get_effective_time(Source_File, START_TIME) AS eff_time
        FROM read_parquet('data/deflux_ctq.parquet')
        WHERE
            Source_Folder LIKE '%CTQ_FAIL_SPEC%'
            OR Source_Folder LIKE '%CTQ_FAIL_COV%';
        """
    )



# Tự động chạy khi module được import
init_duckdb_views()
