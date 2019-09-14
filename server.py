from flask import Flask, request, jsonify
import pandas as pd
from predict import predict_price
import datetime

app = Flask(__name__)


def to_timestamp(dt):
    epoch = datetime.datetime.utcfromtimestamp(0)
    return (dt - epoch).total_seconds() * 1000


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