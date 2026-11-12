Bước 1: Đọc được Parquet
↓
Bước 2: Tạo Repository
↓
Bước 3: Tạo Service
↓
Bước 4: Trả API JSON
↓
Bước 5: Test bằng Swagger
↓
Bước 6: Test bằng React
↓
Bước 7: Dashboard

main.py
    ↓
API
    ↓
Service => format json
    ↓
Repository => sql only
    ↓
DuckDB
    ↓
Parquetl


folder data lưu trữ parquet
folder database dùng DBduck connect đến parquet
folder repository: lấy và lưu dữ liệu
folder services: xây dụng nghiệp vụ để trả data theo yêu cầu người dùng
folder utils dùng để phân giải các phần tử trong tên file để giúp đọc đúng

lệch back: uvicorn main:app --reload



upload rate sucess:
{
    "process": "reflow",

    "summary": {
        "backup_count": 1000,
        "total_count": 3000,
        "rate": 33.33
    },

    "chart": {
        "level": "line",

        "legends": [
            "SMT1",
            "SMT2",
            "SMT3"
        ],

        "data": [
            {
                "period": "W40",
                "SMT1": 95,
                "SMT2": 96,
                "SMT3": 99
            }
        ]
    }
}



