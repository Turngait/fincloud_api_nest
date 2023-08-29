from app import app
from flask import request, jsonify
# from DTO import DTO
import json

@app.route('/cost-group', methods=['POST'])
def addCostGroup():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/cost-group', methods=['PUT'])
def updateCostGroup():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/cost-group', methods=['DELETE'])
def deleteCostGroup():
  return jsonify({'status': 200, 'isSuccess': True}), 200
