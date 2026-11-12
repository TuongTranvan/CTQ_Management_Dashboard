from app.database.connection import conn

class UploadRepository:
    @staticmethod
    def get_reflow_data():
        return conn.sql("""SELECT * FROM reflow_ctq""").df()

    @staticmethod
    def get_deflux_data():
        return conn.sql("""SELECT * FROM deflux_ctq""").df()