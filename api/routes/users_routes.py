from app import app
from flask import request, jsonify
from controllers.users_controller import UsersController

@app.route('/users/signin', methods=['POST'])
def signIn():
  data = request.get_json()
  controller = UsersController()
  response_data = controller.signIn(data)
  return jsonify(response_data), response_data['status']

@app.route('/users/signup', methods=['POST'])
def addUser():
  data = request.get_json()
  controller = UsersController()
  response_data = controller.addUser(data)
  return jsonify(response_data), response_data['status']

@app.route('/users/getid', methods=['POST'])
def getUserID():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/users/changename', methods=['PUT'])
def changeUserName():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/users/changepassword', methods=['PUT'])
def changePass():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/users/getdata', methods=['POST'])
def getData():
  return jsonify({'status': 200, 'isSuccess': True}), 200

@app.route('/users/restorepass', methods=['PUT'])
def restorePass():
  return jsonify({'status': 200, 'isSuccess': True}), 200
