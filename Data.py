import datetime as dt

markets = ("AAPL","", "002502.SZ", "LNVGY", "APH", "DIOD", "INTC", "HPQ", "DELL", "SNE")
# Apple, Samsung, Huawei, Amphenol, Diodes Inc, Intel, HP, Dell, Sony

data_folder = "markets/"
deviated_name = "_deviated"

start = dt.datetime(2017, 1, 1)
mid = dt.datetime(2018, 12, 31)
end = dt.datetime.now()
train_data = {"start": start, "end": mid}
test_data = {"start": mid, "end": end}
