# app/repository/upload_rate_chart_repository.py
from app.database.connection import conn


class UploadRateChartRepository:

    @staticmethod
    def get_summary(table_name: str, where_clause: str):
        query = f"""
        SELECT
            COUNT(DISTINCT Panel_SN) AS total,
            COUNT(DISTINCT CASE WHEN Source_Folder = '/CSV/BACKUP' THEN Panel_SN END) AS uploaded
        FROM {table_name}
        {where_clause}
        """
        row = conn.execute(query).fetchone()
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
        return conn.execute(query).fetchall()
