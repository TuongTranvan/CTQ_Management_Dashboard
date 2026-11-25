# main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import conn
from app.database.register_tables import init_duckdb_views
from app.api.upload import router as upload_router
from app.api.out_spec import router as out_spec_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Registering DuckDB Macros & Views...")
    init_duckdb_views()
    print("DuckDB Views Ready!")

    yield

    print("Closing DuckDB connection & Shutting down API...")
    conn.close()


app = FastAPI(
    title="CTQ Monitoring API",
    version="1.0.0",
    lifespan=lifespan
)

# Cấu hình CORS để Frontend (React/Vue/Next.js) gọi được API không bị chặn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "CTQ Monitoring API",
        "status": "running"
    }


# Upload APIs
app.include_router(
    upload_router,
    prefix="/api/upload",
    tags=["Upload"]
)

app.include_router(
    out_spec_router,
    prefix="/api/out-spec",
    tags=["Out Spec"]
)