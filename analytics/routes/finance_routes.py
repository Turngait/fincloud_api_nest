from app import app
from flask import request, jsonify
from finance_controller import FinanceController
# from DTO import DTO
import json

@app.route('/getfindata', methods=['POST'])
def getFinData():
  data = request.get_json()
  if 'user_id' not in data or 'period' not in data:
    return jsonify({'status': 400, 'isSuccess': False}), 400

  user_id, period = data['user_id'], data['period']
  fin_controller = FinanceController()
  data = fin_controller.getFinData(user_id, period)
  return jsonify({'status': 200, 'isSuccess': True, 'data': data}), 200
