from app import app
from flask import request, jsonify
# from DTO import DTO
import json

@app.route('/getfindata', methods=['POST'])
def getFinData():
  return jsonify({'status': 200, 'isSuccess': True}), 200
