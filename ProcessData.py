import Data
import csv
# import pandas as pd


def get_deviations(symbol):
    path = Data.data_folder + symbol + ".csv"
    file_obj = open(path, "r")
    # csv_obj = pd.read_csv(path)
    reader = csv.DictReader(file_obj)
    # new_csv_obj = pd.DataFrame()

    data = []

    for row in reader:
        data.append(row)

    skipped = False
    new_data = []
    last = {}
    for row in data:
        if not skipped:
            skipped = True
            last = row
            continue
        new_row = {}
        new_row["date"] = row['Date']
        new_row["opend"] = float(row['Open']) - float(last['Close'])
        new_row["highd"] = float(row['High']) - float(row['Open'])
        new_row["lowd"] = float(row['Low']) - float(row['Open'])
        new_row["closed"] = float(row['Close']) - float(row['Open'])
        new_data.append(new_row)
        last = row

    file_obj.close()

    path = Data.data_folder + symbol + Data.deviated_name + ".csv"
    file_obj = open(path, "w", newline='')
    writer = csv.DictWriter(file_obj, fieldnames=['date', 'opend', 'highd', 'lowd', 'closed'])
    writer.writeheader()
    for row in new_data:
        writer.writerow(row)
    file_obj.close()
