from app import app
from flask import jsonify

@app.route('/income-source', methods=['POST'])
def addIncomeSource():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/income-source', methods=['PUT'])
def updateIncomeSource():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/income-source', methods=['DELETE'])
def deleteIncomeSource():
  return jsonify({'status': 200, 'isSuccess': True}), 200
