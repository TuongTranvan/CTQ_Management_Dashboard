# app/repository/out_spec_rate_repository.py

from app.database.connection import conn


class OutSpecRateRepository:

    @staticmethod
    def get_total_strip(table_name: str, where_clause: str) -> int:
        """Tổng strip của process. Mẫu số dùng để tính %."""
        query = f"""
            SELECT COUNT(DISTINCT Panel_SN) AS total_strip
            FROM {table_name}
            {where_clause}
        """
        row = conn.execute(query).fetchone()
        return int(row[0] or 0)

    @staticmethod
    def get_fail_rows(fail_table: str, where_clause: str, x_field: str):
        """Dữ liệu fail chi tiết. Để service tự xác định strip fail dựa trên các cột *_result."""
        query = f"""
            SELECT Panel_SN, machine_name, line, station, {x_field} AS period, *
            FROM {fail_table}
            {where_clause}
        """
        return conn.execute(query).df()

    @staticmethod
    def get_result_columns(fail_table: str) -> list[str]:
        """Lấy tất cả cột *_result ngoại trừ Result."""
        rel = conn.execute(f"SELECT * FROM {fail_table} LIMIT 1")
        cols = [col[0] for col in rel.description]
        return [col for col in cols if col.lower() != "result" and col.lower().endswith("_result")]

    @staticmethod
    def get_period_line_total_strip(table_name: str, where_clause: str, x_field: str):
        """Tổng strip theo period + line."""
        query = f"""
            SELECT {x_field} AS period, line, COUNT(DISTINCT Panel_SN) AS total_strip
            FROM {table_name}
            {where_clause}
            GROUP BY period, line
        """
        return conn.execute(query).fetchall()

    @staticmethod
    def get_period_machine_total_strip(table_name: str, where_clause: str, x_field: str):
        """Tổng strip theo period + machine."""
        query = f"""
            SELECT {x_field} AS period, machine_name, COUNT(DISTINCT Panel_SN) AS total_strip
            FROM {table_name}
            {where_clause}
            GROUP BY period, machine_name
        """
        return conn.execute(query).fetchall()
