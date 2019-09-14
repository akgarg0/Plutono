import pandas as pd
import Data
import numpy as np
from Data import markets

apple_dev = pd.read_csv('markets/AAPL_deviated.csv')

apple_dev['prev_opend'] = np.nan
apple_dev['prev_closed'] = np.nan
apple_dev['prev_highd'] = np.nan
apple_dev['prev_lowd'] = np.nan

prev_close = 0
prev_open = 0
prev_high = 0
prev_low = 0
prev_close_list = []
prev_open_list = []
prev_high_list = []
prev_low_list = []
for index, row in apple_dev.iterrows():
    prev_close_list.append(prev_close)
    prev_open_list.append(prev_open)
    prev_low_list.append(prev_low)
    prev_high_list.append(prev_high)
    prev_close = row['closed']
    prev_open = row['opend']
    prev_high = row['highd']
    prev_low = row['lowd']
apple_dev['prev_opend'] = prev_open_list
apple_dev['prev_closed'] = prev_close_list
apple_dev['prev_highd'] = prev_high_list
apple_dev['prev_lowd'] = prev_low_list

apple_dev.to_csv('final_dataset.csv', index=False)
