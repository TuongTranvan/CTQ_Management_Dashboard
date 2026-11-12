# data_ctq/ctq_watcher.py

import sys
import time
import traceback

from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parent.parent

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from data_ctq.ctq_parquet import (
    build_panel_history
)

SCAN_INTERVAL = 300  # 5 phút


def log(msg):
    print(
        f"[{datetime.now():%Y-%m-%d %H:%M:%S}] {msg}",
        flush=True
    )


print("=" * 60)
print("CTQ WATCHER STARTED")
print("=" * 60)

while True:

    try:

        log("START BUILD")

        build_panel_history()

        log("BUILD COMPLETED")

    except Exception:

        log("WATCHER ERROR")

        traceback.print_exc()

    log(f"SLEEP {SCAN_INTERVAL}s")

    time.sleep(SCAN_INTERVAL)
