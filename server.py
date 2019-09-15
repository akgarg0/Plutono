from flask import Flask, request, jsonify
import pandas as pd
from predict import predict_price
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from HistoricalData import download_market_data
import pickle
import numpy as np


def to_timestamp(dt):
    epoch = datetime.datetime.utcfromtimestamp(0)
    return (dt - epoch).total_seconds() * 1000


def update_data():
    data = pd.read_csv('markets/AAPL.csv')
    prev_vals = data.iloc[0]
    new_vals = download_market_data(datetime.datetime.now() - datetime.timedelta(days=1), datetime.datetime.now())

    new_series = {'date': to_timestamp(to_timestamp(datetime.datetime.now())),
                  'opend': new_vals['Open'] - prev_vals['Close'],
                  'closed': new_vals['Close'] - prev_vals['Open'],
                  'highd': new_vals['High'] - prev_vals['Opne'],
                  'lowd': new_vals['Low'] - prev_vals['Open']}
    deviations = pd.read_csv('markerts/AAPL_deviations.csv')
    deviations.append(new_series)
    deviations.to_csv('markets/AAPL_deviations.csv')
    final_dataset = pd.read_csv('final_dataset.csv')
    prev_vals = final_dataset.iloc[0]
    new_series['prev_opend'] = prev_vals['opend']
    new_series['prev_closed'] = prev_vals['closed']
    new_series['prev_highd'] = prev_vals['highd']
    new_series['prev_lowd'] = prev_vals['lowd']

    with open('final_model_opend.pkl', 'rb') as f:
        open_model = pickle.load(f)
    with open('final_model_closed.pkl', 'rb') as f:
        close_model = pickle.load(f)
    with open('final_model_highd.pkl', 'rb') as f:
        high_model = pickle.load(f)
    with open('final_model_lowd.pkl', 'rb') as f:
        low_model = pickle.load(f)
    x = np.array(
        [to_timestamp(to_timestamp(datetime.datetime.now())), new_series['prev_opend'], new_series['prev_closed'],
         new_series['prev_highd'], new_series['prev_lowd']]).reshape(1, -1)
    open_model.partial_fit(x, np.array(new_series['opend']).reshape(1, -1))
    close_model.partial_fit(x, np.array(new_series['closed']).reshape(1, -1))
    high_model.partial_fit(x, np.array(new_series['highd']).reshape(1, -1))
    low_model.partial_fit(x, np.array(new_series['lowd']).reshape(1, -1))

    with open('final_model_opend.pkl' 'wb') as f:
        pickle.dump(open_model, f)
    with open('final_model_closed.pkl' 'wb') as f:
        pickle.dump(close_model, f)
    with open('final_model_highd.pkl' 'wb') as f:
        pickle.dump(high_model, f)
    with open('final_model_lowd.pkl' 'wb') as f:
        pickle.dump(low_model, f)
    data.append(deviations)
    data.to_csv('final_dataset.csv', index=False)


scheduler = BackgroundScheduler()
scheduler.add_job(func=update_data, trigger="interval", days=1,
                  next_run_time=datetime.datetime.now() + datetime.timedelta(days=1))
scheduler.start()
app = Flask(__name__)


@app.route('/get_data', methods=['GET'])
def get_data():
    data = pd.read_csv('markets/AAPL.csv')
    new_data = pd.DataFrame(None, columns=data.columns)
    start_date = request.args.get('start')
    end_date = request.args.get('start')

    for index, row in new_data.iterrows():
        if row['Date'] < start_date:
            continue
        elif row['Date'] > end_date:
            return new_data.to_json()
        else:
            new_data.append(row)
    return new_data.to_json()


@app.route('/predict', methods=['GET'])
def predict_data():
    date = request.args.get('date')
    data = pd.read_csv('final_dataset.csv')
    aapl_data = pd.read_csv('markets/AAPL.csv')
    aapl_data = aapl_data.sort_values(by='Date')
    reqd_data = None
    date_timestamp = datetime.datetime.strptime(date, '%Y-%m-%d')
    date_timestamp = to_timestamp(date_timestamp)

    for index, row in data.iterrows():
        if row['date'] == date:
            reqd_data = data.iloc[index]
    reqd_data = reqd_data.drop(['opend', 'closed', 'highd', 'lowd'])
    res = predict_price(date_timestamp, reqd_data['prev_opend'], reqd_data['prev_closed'], reqd_data['prev_highd'],
                        reqd_data['prev_lowd'])
    prev = [0, 0, 0, 0]
    reqd_data = None
    for index, row in aapl_data.iterrows():
        if row['Date'] == date:
            reqd_data = prev
        prev = [row['Open'], row['Close'], row['High'], row['Low']]
    result = {}
    result['open'] = reqd_data[0] + res['opend']
    result['close'] = reqd_data[0] + res['closed']
    result['high'] = reqd_data[0] + res['highd']
    result['low'] = reqd_data[0] + res['lowd']
    return jsonify(result)


app.run()
