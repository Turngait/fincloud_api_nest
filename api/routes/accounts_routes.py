from app import app
from flask import jsonify

@app.route('/accounts', methods=['GET'])
def getAccount():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/accounts', methods=['POST'])
def addAccount():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/accounts', methods=['PUT'])
def updateAccount():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/accounts', methods=['DELETE'])
def deleteAccount():
  return jsonify({'status': 200, 'isSuccess': True}), 200
