from HistoricalData import download_market_data
from Data import markets
import pandas as pd
import ProcessData

data = download_market_data()
for market in markets:
    ProcessData.get_deviations(market)