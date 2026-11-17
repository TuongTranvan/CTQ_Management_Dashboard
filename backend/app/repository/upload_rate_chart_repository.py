# app/repository/upload_rate_chart_repository.py
from app.database.connection import conn


class UploadRateChartRepository:

    # Phần overview cards
    @staticmethod
    def get_overview_cards(where_clause: str):
        """
        Quét dữ liệu từ reflow_ctq và deflux_ctq trong 1 lần thực thi:
        - overall_level: Gộp cả 2 process lại rồi mới lọc trùng Panel_SN.
        - process_level: Lọc trùng Panel_SN riêng theo từng process (Reflow / Deflux).
        - machine_level: Lọc trùng Panel_SN riêng theo từng máy.
        """
        query = f"""
        WITH combined_data AS (
            SELECT 'Reflow' AS process, machine_name, Panel_SN, Source_Folder
            FROM reflow_ctq {where_clause}
            UNION ALL
            SELECT 'Deflux' AS process, machine_name, Panel_SN, Source_Folder
            FROM deflux_ctq {where_clause}
        ),
        overall_summary AS (
            -- Gộp cả 2 process lại trước rồi mới lọc trùng Panel_SN
            SELECT
                'overall_level' AS level_type,
                'All' AS process,
                NULL AS machine_name,
                COUNT(DISTINCT Panel_SN) AS total_strip,
                COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded_strip
            FROM combined_data
        ),
        process_summary AS (
            -- Lọc trùng Panel_SN độc lập theo từng process
            SELECT
                'process_level' AS level_type,
                process,
                NULL AS machine_name,
                COUNT(DISTINCT Panel_SN) AS total_strip,
                COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded_strip
            FROM combined_data
            GROUP BY process
        ),
        machine_summary AS (
            -- Lọc trùng Panel_SN độc lập theo từng máy
            SELECT
                'machine_level' AS level_type,
                process,
                machine_name,
                COUNT(DISTINCT Panel_SN) AS total_strip,
                COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded_strip
            FROM combined_data
            WHERE machine_name IS NOT NULL AND machine_name != 'Unknown'
            GROUP BY process, machine_name
        )
        SELECT level_type, process, machine_name, total_strip, uploaded_strip
        FROM overall_summary
        UNION ALL
        SELECT level_type, process, machine_name, total_strip, uploaded_strip
        FROM process_summary
        UNION ALL
        SELECT level_type, process, machine_name, total_strip, uploaded_strip
        FROM machine_summary
        ORDER BY level_type ASC, machine_name ASC
        """
        rows = conn.cursor().execute(query).fetchall()

        overall_stats = {"total": 0, "uploaded": 0}
        process_stats = {}
        machine_rows = []

        for level_type, process, machine_name, total_strip, uploaded_strip in rows:
            if level_type == "overall_level":
                overall_stats = {
                    "total": int(total_strip or 0),
                    "uploaded": int(uploaded_strip or 0),
                }
            elif level_type == "process_level":
                process_stats[process] = {
                    "total": int(total_strip or 0),
                    "uploaded": int(uploaded_strip or 0),
                }
            else:
                machine_rows.append((
                    machine_name,
                    process,
                    int(total_strip or 0),
                    int(uploaded_strip or 0),
                ))

        return overall_stats, process_stats, machine_rows


    # Phần chart upload rate (tính độc lập theo từng table_name / process)
    @staticmethod
    def get_summary(table_name: str, where_clause: str):
        query = f"""
        SELECT
            COUNT(DISTINCT Panel_SN) AS total,
            COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded
        FROM {table_name}
        {where_clause}
        """
        row = conn.cursor().execute(query).fetchone()
        return row if row else (0, 0)

    @staticmethod
    def get_chart_data(table_name: str, where_clause: str, x_field: str):
        query = f"""
        WITH prepared_data AS (
            SELECT
                {x_field} AS period,
                line,
                station,
                machine_name,
                Panel_SN,
                Source_Folder
            FROM {table_name}
            {where_clause}
        )
        SELECT
            period,
            line,
            station,
            machine_name,
            COUNT(DISTINCT Panel_SN) AS total,
            COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded
        FROM prepared_data
        GROUP BY
            period,
            line,
            station,
            machine_name
        ORDER BY
            period ASC
        """
        return conn.cursor().execute(query).fetchall()
