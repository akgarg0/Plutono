import sqlite3
import tweepy


class Tweet:

    def __init__(self):
        connection = sqlite3.connect("AppData.db")
        cursor = connection.cursor()
        query = """SELECT * FROM Keys_Twitter"""
        cursor.execute(query)
        values = cursor.fetchall()
        values = list(values[0])
        con_acc = values[0]
        con_secret = values[1]
        auth = tweepy.OAuthHandler(con_acc, con_secret)
        api = tweepy.API(auth, wait_on_rate_limit=True)
        self.API = api

    @staticmethod
    def getMonthNumber(mn):
        if mn == "Jan":
            return "01"
        elif mn == "Feb":
            return "02"
        elif mn == "Mar":
            return "03"
        elif mn == "Apr":
            return "04"
        elif mn == "May":
            return "05"
        elif mn == "Jun":
            return "06"
        elif mn == "Jul":
            return "07"
        elif mn == "Aug":
            return "08"
        elif mn == "Sep":
            return "09"
        elif mn == "Oct":
            return "10"
        elif mn == "Nov":
            return "11"
        else:
            return "12"

    def getTweets(self, n_tweets, query, result_type):
        max_tweets = n_tweets
        searched_tweets = [status for status in
                           tweepy.Cursor(self.API.search, q=query, result_type=result_type).items(max_tweets)]
        Tweets = []
        for tweet in searched_tweets:
            json = tweet._json
            text = json['text']
            Tweets.append(text)
        return Tweets

    def getTweetsDays(self, n_tweets, query, result_type, start_date, end_date):
        max_tweets = n_tweets
        searched_tweets = [status for status in
                           tweepy.Cursor(self.API.search, q=query, result_type=result_type).items(max_tweets)]
        Tweets = []
        for tweet in searched_tweets:
            if start_date < tweet.created_at < end_date:
                Tweets.append(tweet._json['text'])
        return Tweets
