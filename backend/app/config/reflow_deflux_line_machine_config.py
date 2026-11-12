# app/config/reflow_deflux_line_machine_config.py

REFLOW_LINES = {
    "SMT1": ["S1RF-A01", "S1RF-A02", "S1RF-A03", "S1RF-A04", "S1RF-A05"],
    "SMT2": ["S2RF-A01", "S2RF-A03", "S2RF-A04", "S2RF-A05"],
    "SMT3": ["S3RF-A01", "S3RF-A02", "S3RF-A03"]
}

DEFLUX_LINES = {
    "Deflux1": ["FFC-A01", "FFC-A02"],
    "Deflux2": ["FFC-A01"],
    "Deflux3": ["FFC-A02"]
}

MACHINE_MAPPING = {
    # SMT1
    "S1RF-A01": {"machine_id": "2023-1100022", "station": "961", "line": "SMT1", "type": "Reflow"},
    "S1RF-A02": {"machine_id": "2024-1100104", "station": "961", "line": "SMT1", "type": "Reflow"},
    "S1RF-A03": {"machine_id": "2024-1100380", "station": "961", "line": "SMT1", "type": "Reflow"},
    "S1RF-A04": {"machine_id": "2025-1100068", "station": "961", "line": "SMT1", "type": "Reflow"},
    "S1RF-A05": {"machine_id": "2026-1100124", "station": "961", "line": "SMT1", "type": "Reflow"},

    # SMT2
    "S2RF-A01": {"machine_id": "2023-1100116", "station": "962", "line": "SMT2", "type": "Reflow"},
    "S2RF-A03": {"machine_id": "2024-1100396", "station": "962", "line": "SMT2", "type": "Reflow"},
    "S2RF-A04": {"machine_id": "2025-1100091", "station": "962", "line": "SMT2", "type": "Reflow"},
    "S2RF-A05": {"machine_id": "2026-1100147", "station": "962", "line": "SMT2", "type": "Reflow"},

    # SMT3
    "S3RF-A01": {"machine_id": "2023-1100115", "station": "963", "line": "SMT3", "type": "Reflow"},
    "S3RF-A02": {"machine_id": "2025-1100019", "station": "963", "line": "SMT3", "type": "Reflow"},
    "S3RF-A03": {"machine_id": "2025-1100512", "station": "963", "line": "SMT3", "type": "Reflow"},

    # Deflux
    "FFC-A01": {
        "machine_id": "2023-1100121",
        "stations": {"964": "Deflux1", "965": "Deflux2"},
        "type": "Deflux"
    },
    "FFC-A02": {
        "machine_id": "2025-1100094",
        "stations": {"964": "Deflux1", "966": "Deflux3"},
        "type": "Deflux"
    }
}




# REFLOW_LINES = {
#     "SMT1": [
#         "S1RF-A01",
#         "S1RF-A02",
#         "S1RF-A03",
#         "S1RF-A04",
#         "S1RF-A05"
#     ],

#     "SMT2": [
#         "S2RF-A01",
#         "S2RF-A03",
#         "S2RF-A04",
#         "S2RF-A05"
#     ],

#     "SMT3": [
#         "S3RF-A01",
#         "S3RF-A02",
#         "S3RF-A03"
#     ]
# }


# DEFLUX_LINES = {
#     "Deflux1": [
#         "FFC-A01",
#         "FFC-A02"
#     ],

#     "Deflux2": [
#         "FFC-A01"
#     ],

#     "Deflux3": [
#         "FFC-A02"
#     ]
# }



# # MACHINE_MAPPING = {
# #     # SMT1
# #     "S1RF-A01": {
# #         "machine_id": "2023-1100022",
# #         "station": "961",
# #         "line": "SMT1",
# #         "type": "Reflow"
# #     },

# #     "S1RF-A02": {
# #         "machine_id": "2024-1100104",
# #         "station": "961",
# #         "line": "SMT1",
# #         "type": "Reflow"
# #     },

# #     "S1RF-A03": {
# #         "machine_id": "2024-1100380",
# #         "station": "961",
# #         "line": "SMT1",
# #         "type": "Reflow"
# #     },

# #     "S1RF-A04": {
# #         "machine_id": "2025-1100068",
# #         "station": "961",
# #         "line": "SMT1",
# #         "type": "Reflow"
# #     },
# #     "S1RF-A05": {
# #             "machine_id": "2026-1100124",
# #             "station": "961",
# #             "line": "SMT1",
# #             "type": "Reflow"
# #     },

# #     # SMT2
# #     "S2RF-A01": {
# #             "machine_id": "2023-1100116",
# #             "station": "962",
# #             "line": "SMT2",
# #             "type": "Reflow"
# #     },
# #     "S2RF-A03": {
# #             "machine_id": "2024-1100396",
# #             "station": "962",
# #             "line": "SMT2",
# #             "type": "Reflow"
# #     },
# #     "S2RF-A04": {
# #             "machine_id": "2025-1100091",
# #             "station": "962",
# #             "line": "SMT2",
# #             "type": "Reflow"
# #     },
# #     "S2RF-A05": {
# #             "machine_id": "2026-1100147",
# #             "station": "962",
# #             "line": "SMT2",
# #             "type": "Reflow"
# #     },
# #     # SMT3
# #     "S3RF-A01": {
# #             "machine_id": "2023-1100115",
# #             "station": "963",
# #             "line": "SMT3",
# #             "type": "Reflow"
# #     },
# #     "S3RF-A02": {
# #             "machine_id": "2025-1100019",
# #             "station": "963",
# #             "line": "SMT3",
# #             "type": "Reflow"
# #     },
# #     "S3RF-A03": {
# #             "machine_id": "2025-1100512",
# #             "station": "963",
# #             "line": "SMT3",
# #             "type": "Reflow"
# #     },

# #     # Deflux
# #     "FFC-A01": {
# #         "machine_id": "2023-1100121",
# #         "stations": {
# #             "964": "Deflux1",
# #             "965": "Deflux2"
# #         },
# #         "type": "Deflux"
# #     },

# #     "FFC-A02": {
# #         "machine_id": "2025-1100094",
# #         "stations": {
# #             "964": "Deflux1",
# #             "966": "Deflux3"
# #         },
# #         "type": "Deflux"
# #     }
# # }