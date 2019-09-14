import datetime as dt

markets = ["AAPL"]

data_folder = "markets/"
deviated_name = "_deviated"

start = dt.datetime(2017, 1, 1)
mid = dt.datetime(2018, 12, 31)
end = dt.datetime.now()
train_data = {"start": start, "end": mid}
test_data = {"start": mid, "end": end}
