import os
import sys
import pickle
import pandas as pd

from pathlib import Path
from io import StringIO
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parent.parent

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from services.ftp_reader_raw import (
    get_folder_files,
    get_ftp,
    read_file
)

from services.station_master import (
    get_asset_mapping
)

# ==================================================
# CONFIG
# ==================================================

TARGET_FOLDERS = [
    "/CSV/BACKUP",
    "/CSV",
    "/CSV/ERROR",
    "/CTQ_Fail",
    "/CTQ_FAIL_COV",
    "/CTQ_FAIL_COV_AND_SPEC",
    "/CTQ_FAIL_OUTTIME_NULL",
    "/CTQ_FAIL_SPEC",
]

START_DATE = datetime(
    2026,
    8,
    1
).date()

SAVE_EVERY = 100

DATA_DIR = ROOT_DIR / "backend/app/database"
DATA_DIR.mkdir(
    parents=True,
    exist_ok=True
)

REFLOW_PARQUET = DATA_DIR / "reflow_ctq.parquet"
DEFLUX_PARQUET = DATA_DIR / "deflux_ctq.parquet"

REFLOW_SCANNED = DATA_DIR / "reflow_ctq_scanned.pkl"
DEFLUX_SCANNED = DATA_DIR / "deflux_ctq_scanned.pkl"

REFLOW_ERROR = DATA_DIR / "reflow_ctq_error.pkl"
DEFLUX_ERROR = DATA_DIR / "deflux_ctq_error.pkl"

# ==================================================
# UTIL
# ==================================================

def load_set(path):

    if os.path.exists(path):

        with open(path, "rb") as f:
            return pickle.load(f)

    return set()


def save_set(path, data):

    with open(path, "wb") as f:
        pickle.dump(data, f)


def load_parquet(path):

    if os.path.exists(path):
        return pd.read_parquet(path)

    return pd.DataFrame()


def fix_parquet_types(df):

    df = df.copy()

    for col in df.columns:

        if df[col].dtype == object:

            df[col] = df[col].astype(str)

    return df


# ==================================================
# FILE PARSER
# ==================================================

def parse_filename(filename):

    try:

        parts = filename.split("_")

        if len(parts) < 6:
            return None

        process = parts[2]

        if not (
            process.startswith("Reflow")
            or
            process.startswith("Deflux")
        ):
            return None
        

        # fail file

        if (
            len(parts) >= 7
            and
            parts[4].upper() == "FAIL"
        ):

            return {
                "process": process,
                "timestamp": parts[5],
                "asset_no": (
                    parts[6]
                    .replace(".csv", "")
                )
            }

        return {
            "process": process,
            "timestamp": parts[4],
            "asset_no": (
                parts[5]
                .replace(".csv", "")
            )
        }

    except Exception:

        return None


# ==================================================
# PANEL BUILD
# ==================================================

def build_panel_level_df(df):

    if df.empty:
        return pd.DataFrame()

    if "MLB_SN" in df.columns:

        df = df.drop(
            columns=["MLB_SN"]
        )

    panel_col = None

    for col in df.columns:

        if (
            str(col)
            .strip()
            .upper()
            == "PANEL_SN"
        ):

            panel_col = col
            break

    if panel_col is None:

        return pd.DataFrame()

    df[panel_col] = (
        df[panel_col]
        .astype(str)
        .str.strip()
    )

    df = df[
        df[panel_col] != ""
    ]

    if df.empty:

        return pd.DataFrame()

    # IMPORTANT:
    # Panel_SN không unique toàn hệ thống

    if "Asset_No" in df.columns:

        df = df.drop_duplicates(
            subset=[
                panel_col,
                "Asset_No"
            ],
            keep="first"
        )

    else:

        df = df.drop_duplicates(
            subset=[panel_col],
            keep="first"
        )

    return df.copy()


# ==================================================
# SAVE
# ==================================================

def save_checkpoint(
    parquet_path,
    scanned_path,
    old_df,
    batch_list,
    scanned_set
):

    if batch_list:

        batch_df = pd.concat(
            batch_list,
            ignore_index=True,
            sort=False
        )

        save_df = pd.concat(
            [
                old_df,
                batch_df
            ],
            ignore_index=True,
            sort=False
        )

        save_df.drop_duplicates(
            subset=[
                "Panel_SN",
                "Asset_No",
                "Source_File"
            ],
            keep="first",
            inplace=True
        )

        save_df = fix_parquet_types(
            save_df
        )

        save_df.to_parquet(
            parquet_path,
            index=False
        )

    save_set(
        scanned_path,
        scanned_set
    )


# ==================================================
# MAIN
# ==================================================

def build_panel_history():

    mapping = get_asset_mapping()

    reflow_old = load_parquet(
        REFLOW_PARQUET
    )

    deflux_old = load_parquet(
        DEFLUX_PARQUET
    )

    reflow_scanned = load_set(
        REFLOW_SCANNED
    )

    deflux_scanned = load_set(
        DEFLUX_SCANNED
    )

    reflow_error = load_set(
        REFLOW_ERROR
    )

    deflux_error = load_set(
        DEFLUX_ERROR
    )

    ftp = get_ftp()

    files_to_scan = []

    print("\nSCAN FTP")

    for folder in TARGET_FOLDERS:

        try:

            folder_files = get_folder_files(
                folder
            )

            for filename in folder_files:

                info = parse_filename(
                    filename
                )

                if not info:
                    continue

                process = info["process"]

                try:

                    file_date = datetime.strptime(
                        info["timestamp"][:8],
                        "%Y%m%d"
                    ).date()

                except Exception:

                    continue

                if file_date < START_DATE:
                    continue

                if process.startswith(
                    "Reflow"
                ):

                    if (
                        filename in reflow_scanned
                        or
                        filename in reflow_error
                    ):
                        continue

                elif process.startswith(
                    "Deflux"
                ):

                    if (
                        filename in deflux_scanned
                        or
                        filename in deflux_error
                    ):
                        continue

                else:

                    continue

                files_to_scan.append(
                    (
                        folder,
                        filename,
                        info
                    )
                )

        except Exception as e:

            print(folder, e)

    print(
        f"FILES TO SCAN : "
        f"{len(files_to_scan):,}"
    )

    reflow_batch = []
    deflux_batch = []

    for idx, (
        folder,
        filename,
        info
    ) in enumerate(
        files_to_scan,
        start=1
    ):

        try:

            process = info["process"]
            asset_no = info["asset_no"]

            print(
                f"[{idx}/{len(files_to_scan)}] "
                f"{filename}"
            )

            MAX_RETRY = 5

            for attempt in range(MAX_RETRY):

                try:
                    csv_text = read_file(
                        ftp,
                        folder,
                        filename
                    )

                    break

                except Exception as ex:

                    print(
                        f"FTP ERROR "
                        f"({attempt + 1}/{MAX_RETRY}) "
                        f"{filename}"
                    )

                    print(repr(ex))

                    try:
                        ftp.quit()
                    except:
                        pass

                    ftp = get_ftp()

            else:
                raise Exception(
                    f"FTP FAILED AFTER {MAX_RETRY} RETRIES"
                )

            df = pd.read_csv(
                StringIO(csv_text),
                low_memory=False
            )

            if df.empty:

                print(f"[EMPTY CSV] {filename}")

                if process.startswith("Reflow"):
                    reflow_error.add(filename)
                else:
                    deflux_error.add(filename)

                continue

            df = build_panel_level_df(df)

            if df.empty:

                print(
                    f"[INVALID] "
                    f"{filename}"
                )

                if process.startswith(
                    "Reflow"
                ):
                    reflow_error.add(
                        filename
                    )
                else:
                    deflux_error.add(
                        filename
                    )

                continue

            machine_id = None

            if asset_no in mapping:

                machine_id = (
                    mapping[asset_no]
                    .get("machine_id")
                )

            df = (
                df
                .assign(
                    Process=process,
                    Machine_ID=machine_id,
                    Asset_No=asset_no,
                    Source_File=filename,
                    Source_Folder=folder
                )
                .copy()
            )

            if process.startswith(
                "Reflow"
            ):

                reflow_batch.append(df)

                reflow_scanned.add(
                    filename
                )

            else:

                deflux_batch.append(df)

                deflux_scanned.add(
                    filename
                )

            if (
                idx % SAVE_EVERY
                == 0
            ):

                print(
                    f"SAVE CHECKPOINT "
                    f"{idx}"
                )

                save_checkpoint(
                    REFLOW_PARQUET,
                    REFLOW_SCANNED,
                    reflow_old,
                    reflow_batch,
                    reflow_scanned
                )

                save_checkpoint(
                    DEFLUX_PARQUET,
                    DEFLUX_SCANNED,
                    deflux_old,
                    deflux_batch,
                    deflux_scanned
                )

                reflow_old = load_parquet(
                    REFLOW_PARQUET
                )

                deflux_old = load_parquet(
                    DEFLUX_PARQUET
                )

                reflow_batch.clear()
                deflux_batch.clear()

        except Exception as e:

            print(
                f"ERROR : {filename}"
            )

            print(e)

            try:

                if process.startswith(
                    "Reflow"
                ):
                    reflow_error.add(
                        filename
                    )
                else:
                    deflux_error.add(
                        filename
                    )

            except:
                pass

    save_checkpoint(
        REFLOW_PARQUET,
        REFLOW_SCANNED,
        reflow_old,
        reflow_batch,
        reflow_scanned
    )

    save_checkpoint(
        DEFLUX_PARQUET,
        DEFLUX_SCANNED,
        deflux_old,
        deflux_batch,
        deflux_scanned
    )

    save_set(
        REFLOW_ERROR,
        reflow_error
    )

    save_set(
        DEFLUX_ERROR,
        deflux_error
    )

    ftp.quit()

    print("BUILD COMPLETED")


if __name__ == "__main__":
    build_panel_history()