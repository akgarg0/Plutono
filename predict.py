import pickle
import numpy as np


def predict_price(timestamp, prev_opend, prev_closed, prev_highd, prev_lowd):
    with open('final_model_opend.pkl', 'rb') as f:
        open_model = pickle.load(f)
    with open('final_model_closed.pkl', 'rb') as f:
        close_model = pickle.load(f)
    with open('final_model_highd.pkl', 'rb') as f:
        high_model = pickle.load(f)
    with open('final_model_lowd.pkl', 'rb') as f:
        low_model = pickle.load(f)
    feature = np.array([timestamp, prev_opend, prev_closed, prev_highd, prev_lowd]).reshape(1, -1)
    pred_opend = open_model.predict(feature)
    print(open_model.__class__.__name__)
    pred_closed = close_model.predict(feature)
    print(open_model.__class__.__name__)

    pred_highd = high_model.predict(feature)
    print(open_model.__class__.__name__)

    pred_lowd = low_model.predict(feature)
    print(open_model.__class__.__name__)

    return {'opend': float(pred_opend), 'closed': float(pred_closed), 'highd': float(pred_highd),
            'lowd': float(pred_lowd)}
