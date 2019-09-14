from sklearn.linear_model import Ridge, LinearRegression
from sklearn.svm import LinearSVR, SVR
from sklearn.ensemble import RandomForestRegressor, ExtraTreesRegressor
import math
import pandas as pd
import numpy as np
import pickle
from sklearn.metrics import mean_squared_error
import xgboost
from sklearn.model_selection import train_test_split

generic_dataset = pd.DataFrame(data=None,
                               columns=['month', 'day_of_week', 'week_no', 'week_day', 'week_of_year',
                                        'mean_sentiment',
                                        'std_sentiment', 'prev_close', 'opend', 'highd', 'lowd', 'closed',
                                        'target'])
generic_train_dataset, generic_test_dataset = train_test_split(generic_dataset, test_size=0.25)


class Train:

    def train(self):
        pass


class RidgeModels(Train):
    def train(self):
        alpha = [0.01, 0.033, 0.066, 0.1, 0.3, 0.6, 1.0]
        prev_rmse = math.inf
        for a in alpha:
            model = Ridge(alpha=a)
            x_train = generic_train_dataset.drop('target')
            y_train = generic_train_dataset['target']
            model.fit(x_train, y_train)
            x_test = generic_test_dataset.drop('target')
            y_test = generic_test_dataset['target']
            y_pred = model.predict(x_test)
            cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
            if cur_rmse < prev_rmse:
                prev_rmse = cur_rmse
                print('Saving ridge model with parameters: alpha={}, rmse={}'.format(a, cur_rmse))
                with open('models/ridge_model_{}_{}.pkl'.format(a, cur_rmse)) as f:
                    pickle.dump(model, f)


class SVMModels(Train):
    def train(self):
        Cs = [0.01, 0.033, 0.066, 0.1, 0.3, 0.6, 1.0]
        prev_rmse = math.inf
        for c in Cs:
            for model in [LinearSVR(C=c), SVR(C=c)]:
                x_train = generic_train_dataset.drop('target')
                y_train = generic_train_dataset['target']
                model.fit(x_train, y_train)
                x_test = generic_test_dataset.drop('target')
                y_test = generic_test_dataset['target']
                y_pred = model.predict(x_test)
                cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
                if cur_rmse < prev_rmse:
                    prev_rmse = cur_rmse
                    print('Saving SVM model with parameters: c={}, model={}'.format(c, model.__class__))
                    with open('models/ridge_model_{}_{}.pkl'.format(c, model.__class__)) as f:
                        pickle.dump(model, f)


class RandomForestModels(Train):
    def train(self):
        n_estimators = [5, 10, 15, 20]
        prev_rmse = math.inf
        for ne in n_estimators:
            for model in [RandomForestRegressor(n_estimators=ne), ExtraTreesRegressor(n_estimators=ne)]:
                x_train = generic_train_dataset.drop('target')
                y_train = generic_train_dataset['target']
                model.fit(x_train, y_train)
                x_test = generic_test_dataset.drop('target')
                y_test = generic_test_dataset['target']
                y_pred = model.predict(x_test)
                cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
                if cur_rmse < prev_rmse:
                    prev_rmse = cur_rmse
                    print('Saving RandomForest model with parameters: ne={}, model={}'.format(ne, model.__class__))
                    with open('models/random_forest{}_{}.pkl'.format(ne, model.__class__)) as f:
                        pickle.dump(model, f)


class GradientBoostedTreeModels(Train):

    def convert_to_dmatrics(self, dfs):
        res = []
        for df in dfs:
            res.append(xgboost.DMatrix(df.values))
        return res

    def train(self):
        max_depths = [5, 10, 15, 20]
        n_estimators = [20, 30, 50, 100]
        prev_rmse = math.inf
        for d in max_depths:
            for ne in n_estimators:
                model = xgboost.XGBRegressor(max_depth=d, n_estimators=ne)
                x_train = generic_train_dataset.drop('target')
                y_train = generic_train_dataset['target']
                x_test = generic_test_dataset.drop('target')
                y_test = generic_test_dataset['target']
                x_train, y_train, x_test = self.convert_to_dmatrics([x_train, y_train, x_test])
                y_pred = model.predict(x_test)
                model.fit(x_train, y_train)

                cur_rmse = mean_squared_error(y_true=y_test, y_pred=y_pred)
                if cur_rmse < prev_rmse:
                    prev_rmse = cur_rmse
                print('Saving GBT model with parameters: ne={}, d={}'.format(ne, d))
                with open('models/ridge_model_{}_{}.pkl'.format(ne, d)) as f:
                    pickle.dump(model, f)


if __name__ == '__main__':
    models = [RidgeModels(), GradientBoostedTreeModels(), SVMModels(), RandomForestModels()]
    for m in models:
        m.train()
