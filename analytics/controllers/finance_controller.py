from services.costs_service import CostsService
from services.incomes_service import IncomesService


class FinanceController:
    @staticmethod
    def get_fin_data(user_id: int, period: str, account_id: int) -> dict:
        return {
            'costs': {
                'costs': CostsService.get_costs(user_id, period, account_id),
                'groups': CostsService.get_costs_sources(user_id, account_id),
                'graphData': []
            },
            'incomes': {
                'incomes': IncomesService.get_incomes(user_id, period, account_id),
                'sources': IncomesService.get_incomes_sources(user_id, account_id),
                'incomeGraphData': []
            },
            'budgets': [],
            'accounts': [],
            'targets': []
        }
