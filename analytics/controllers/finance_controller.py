from services.costs_service import CostsService
from services.incomes_service import IncomesService
from services.budgets_service import BudgetsService
from services.account_service import AccountsService
from services.targets_service import TargetsService


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
            'budgets': BudgetsService.get_budgets(user_id, account_id),
            'accounts': AccountsService.get_accounts(user_id),
            'targets': TargetsService.get_targets(user_id, account_id)
        }
