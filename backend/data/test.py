import pyarrow.parquet as pd

file_path = "reflow_ctq.parquet"

table = pd.read_table(file_path)

print("===PARQUET SCHEMA===")
print(table)