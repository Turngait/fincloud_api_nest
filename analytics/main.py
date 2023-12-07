import paths

from app import app
import finance_routes
from dotenv import dotenv_values

@app.route('/')
def index():
      return '<h1>Hello, user</h1>'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
