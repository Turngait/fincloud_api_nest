# import paths

# from flask import request
from app import app
from dotenv import dotenv_values
import os

@app.route('/')
def index():
      # user_agent = request.headers.get('User-Agent')
      # is_redis_connect = redis_client.get('test')
      # print(is_redis_connect)
      # online_users = mongo.db.users.find()
      # # db.create_all()
      print(os.getenv('DB_PASS'))
      return '<h1>Hello, user</h1>'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
