from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config.db_config import db_config
from dotenv import load_dotenv

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_config['mysql']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)
# redis_client = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
# redis_client.set('test', 'true')
load_dotenv()