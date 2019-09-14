from sklearn.linear_model import Ridge
from sklearn.svm import LinearSVR, SVR
from sklearn.ensemble import RandomForestRegressor, ExtraTreesRegressor
import math
import pandas as pd
import pickle
from sklearn.metrics import mean_squared_error
import xgboost
from sklearn.model_selection import train_test_split


class Train:

    def __init__(self, target, alltars, data):
        self.train_data = data.iloc[0:int(0.8 * len(data))]
        self.test_data = data.iloc[int(0.8 * len(data)):]
        self.target = target
        self.alltars = alltars


class RidgeModels(Train):
    def train(self):
        alpha = [0.01, 0.033, 0.066, 0.1, 0.3, 0.6, 1.0]
        prev_rmse = math.inf
        for a in alpha:
            model = Ridge(alpha=a)
            x_train = self.train_data.drop(self.alltars, axis=1)
            y_train = self.train_data[self.target]
            model.fit(x_train, y_train)
            x_test = self.test_data.drop(self.alltars, axis=1)
            y_test = self.test_data[self.target]
            y_pred = model.predict(x_test)
            cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
            if cur_rmse < prev_rmse:
                prev_rmse = cur_rmse
                print(
                    'Saving ridge model with parameters: alpha={}, rmse={}, traget={}'.format(a, cur_rmse, self.target))
                with open(
                        'models/ridge_model_{}_{}_{}_{}.pkl'.format(a, cur_rmse, self.target, model.__class__.__name__),
                        'wb') as f:
                    pickle.dump(model, f)


class SVMModels(Train):
    def train(self):
        Cs = [0.01, 0.033, 0.066, 0.1, 0.3, 0.6, 1.0]
        prev_rmse = math.inf
        for c in Cs:
            for model in [LinearSVR(C=c), SVR(C=c)]:
                x_train = self.train_data.drop(self.alltars, axis=1)
                y_train = self.train_data[self.target]
                model.fit(x_train, y_train)
                x_test = self.test_data.drop(self.alltars, axis=1)
                y_test = self.test_data[self.target]
                y_pred = model.predict(x_test)

                cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
                if cur_rmse < prev_rmse:
                    prev_rmse = cur_rmse
                    print('Saving SVM model with parameters: c={}, model={}, target={}'.format(c,
                                                                                               model.__class__.__name__,
                                                                                               self.target))
                    with open(
                            'models/ridge_model_{}_{}_{}_{}.pkl'.format(c, model.__class__.__name__, target, cur_rmse),
                            'wb') as f:
                        pickle.dump(model, f)


class RandomForestModels(Train):
    def train(self):
        n_estimators = [5, 10, 15, 20]
        prev_rmse = math.inf
        for ne in n_estimators:
            for model in [RandomForestRegressor(n_estimators=ne), ExtraTreesRegressor(n_estimators=ne)]:
                x_train = self.train_data.drop(self.alltars, axis=1)
                y_train = self.train_data[self.target]
                model.fit(x_train, y_train)
                x_test = self.test_data.drop(self.alltars, axis=1)
                y_test = self.test_data[self.target]
                y_pred = model.predict(x_test)
                cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
                if cur_rmse < prev_rmse:
                    prev_rmse = cur_rmse
                    print('Saving RandomForest model with parameters: ne={}, model={}, traget={}'.format(ne,
                                                                                                         model.__class__.__name__,
                                                                                                         self.target))
                    with open('models/random_forest{}_{}_{}_{}.pkl'.format(ne, model.__class__.__name__, target,
                                                                           cur_rmse), 'wb') as f:
                        pickle.dump(model, f)


import datetime


def to_timestamp(dt):
    epoch = datetime.datetime.utcfromtimestamp(0)
    return (dt - epoch).total_seconds() * 1000


if __name__ == '__main__':
    alltars = ['opend', 'highd', 'lowd', 'closed']
    dateparse = lambda x: pd.datetime.strptime(x, '%Y-%m-%d')
    data = pd.read_csv('final_dataset.csv')
    dateparse = lambda x: to_timestamp(datetime.datetime.strptime(x, '%Y-%m-%d'))
    data['date'] = data['date'].apply(dateparse)
    for target in alltars:
        models = [RidgeModels(target, alltars, data), SVMModels(target, alltars, data),
                  RandomForestModels(target, alltars, data)]
        for m in models:
            m.train()
