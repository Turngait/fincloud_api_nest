from app import app
from flask import request, jsonify
# from DTO import DTO
import json

@app.route('/costs', methods=['POST'])
def addCost():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/costs', methods=['DELETE'])
def deleteCost():
  return jsonify({'status': 200, 'isSuccess': True}), 200
