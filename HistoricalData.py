import datetime as dt
import matplotlib.pyplot as plt
import matplotlib as style
import pandas as pd
import pandas_datareader.data as web

# style.use("ggplot")

end = dt.datetime.now()
start = dt.datetime(end.year - 1, end.month, end.day)

df =web.DataReader('APPL', 'yahoo', start, end)
df.to_csv('APPL.csv')

# df.head()
# df[['High', 'Low', 'Open', 'Close']].plot()
