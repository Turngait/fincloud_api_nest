from costs_model import Costs
from incomes_model import Incomes
from costs_service import CostsService
from incomes_service import IncomesService

class FinanceController:
    def getFinData(self, user_id, period):
        costs = Costs.query.filter_by(user_id=user_id, period=period).all()
        incomes = Incomes.query.filter_by(user_id=user_id, period=period).all()
        response = {
            'costs': {
                'costs': CostsService.normalizeCosts(costs),
                'groups': [],
                'graphData': []
            },
            'incomes': {
                'incomes': IncomesService.normalizeIncomes(incomes),
                'sources': [],
                'incomeGraphData': []
            },
            'budgets': [],
            'accounts': [],
            'targets': []
        }
        return response
