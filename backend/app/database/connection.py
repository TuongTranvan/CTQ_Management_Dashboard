import duckdb
import os

# Tạo thư mục chứa database và file tạm (nên đặt ở ổ SSD)
os.makedirs("data/duckdb_temp", exist_ok=True)

conn = duckdb.connect(
    database="data/production_data.duckdb",  # Lưu ra file ổ cứng thay vì RAM
    config={
        "memory_limit": "2GB",               # Giới hạn tối đa chỉ ăn 2GB RAM (tùy máy bạn)
        "threads": 4,                        # Giới hạn số luồng CPU tránh 100% CPU gây đơ máy
        "temp_directory": "data/duckdb_temp" # Nơi xả dữ liệu tạm khi gần đầy RAM
    }
)
