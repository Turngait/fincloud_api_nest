from app import app
from flask import request, jsonify
# from DTO import DTO
import json

@app.route('/budgets', methods=['POST'])
def addBudget():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/budgets', methods=['PUT'])
def updateBudget():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/budgets', methods=['DELETE'])
def deleteBudget():
  return jsonify({'status': 200, 'isSuccess': True}), 200
