from app import app
from flask import request, jsonify
from controllers.finance_controller import FinanceController


@app.route('/getfindata', methods=['POST'])
def get_fin_data():
    data = request.get_json()
    if 'user_id' not in data or 'period' not in data or 'account_id' not in data:
        return jsonify({'status': 400, 'isSuccess': False}), 400

    user_id, period, account_id = data['user_id'], data['period'], data['account_id']
    data = FinanceController.get_fin_data(user_id, period, account_id)
    return jsonify({'status': 200, 'isSuccess': True, 'data': data}), 200
