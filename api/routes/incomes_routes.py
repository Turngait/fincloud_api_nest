from app import app
from flask import jsonify

@app.route('/incomes', methods=['POST'])
def addIncome():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/incomes', methods=['DELETE'])
def deleteIncome():
  return jsonify({'status': 200, 'isSuccess': True}), 200
