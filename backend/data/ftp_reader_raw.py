from ftplib import FTP
from io import BytesIO
import time

FTP_HOST = "10.201.16.80"
FTP_USER = "v1foxpmcdata"
FTP_PASS = "V9g8.f2*"


def get_ftp():

    ftp = FTP(
        FTP_HOST,
        timeout=60
    )

    ftp.login(
        FTP_USER,
        FTP_PASS
    )

    return ftp


def get_folder_files(folder):

    ftp = get_ftp()

    try:

        ftp.cwd(folder)

        return ftp.nlst()

    finally:

        ftp.quit()


def read_file(
    ftp,
    folder,
    filename
):

    t0 = time.time()

    ftp.cwd(folder)

    buffer = BytesIO()

    ftp.retrbinary(
        f"RETR {filename}",
        buffer.write
    )

    print(
        f"DOWNLOAD {round(time.time()-t0,2)}s",
        filename
    )

    return buffer.getvalue().decode(
        "utf-8-sig",
        errors="ignore"
    )