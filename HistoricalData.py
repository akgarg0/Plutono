import pandas_datareader.data as web
import Data


def download_market_data():
    for market in Data.markets:
        df = web.DataReader(market, 'yahoo', Data.start, Data.end)
        df.to_csv(Data.data_folder + market + '.csv')


def download_market_data_(start, end):
    df = web.DataReader('AAPL', 'yahoo', start, end)
    return df