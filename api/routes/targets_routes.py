from app import app
from flask import jsonify

@app.route('/targets', methods=['GET'])
def getTargetsByAccountId():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/targets', methods=['POST'])
def addTarget():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/targets', methods=['DELETE'])
def deleteTarget():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/targets', methods=['PUT'])
def editTarget():
  return jsonify({'status': 200, 'isSuccess': True}), 200
