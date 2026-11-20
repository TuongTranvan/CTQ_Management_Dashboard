# station_master.py

MACHINES = [
    {
        "machine_id": "S1RF-A01",
        "asset_no": "2023-1100022",
        "line": "SMT1-1"
    },
    {
        "machine_id": "S1RF-A02",
        "asset_no": "2024-1100104",
        "line": "SMT1-2"
    },
    {
        "machine_id": "S1RF-A03",
        "asset_no": "2024-1100380",
        "line": "SMT1-3"
    },
    {
        "machine_id": "S1RF-A04",
        "asset_no": "2025-1100068",
        "line": "SMT1-4"
    },
    {
        "machine_id": "S1RF-A05",
        "asset_no": "2026-1100124",
        "line": "SMT1-5"
    },
    {
        "machine_id": "S2RF-A01",
        "asset_no": "2023-1100116",
        "line": "SMT2-1"
    },
    {
        "machine_id": "S2RF-A03",
        "asset_no": "2024-1100396",
        "line": "SMT2-3"
    },
    {
        "machine_id": "S2RF-A04",
        "asset_no": "2025-1100091",
        "line": "SMT2-4"
    },
    {
        "machine_id": "S2RF-A05",
        "asset_no": "2026-1100147",
        "line": "SMT2-5"
    },
    {
        "machine_id": "S3RF-A01",
        "asset_no": "2023-1100115",
        "line": "SMT3-1"
    },
    {
        "machine_id": "S3RF-A02",
        "asset_no": "2025-1100019",
        "line": "SMT3-2"
    },
    {
        "machine_id": "S3RF-A03",
        "asset_no": "2025-1100512",
        "line": "SMT3-3"
    },
    {
        "machine_id": "FFC-A01",
        "asset_no": "2023-1100121",
        "line": "Deflux 1"
    },
    {
        "machine_id": "FFC-A02",
        "asset_no": "2025-1100094",
        "line": "Deflux 2"
    }
]


def get_all_machines():
    return MACHINES


def get_asset_mapping():
    return {
        machine["asset_no"]: {
            "machine_id": machine["machine_id"],
            "line": machine["line"]
        }
        for machine in MACHINES
    }
