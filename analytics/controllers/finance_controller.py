from services.costs_service import CostsService
from services.incomes_service import IncomesService
from services.budgets_service import BudgetsService
from services.account_service import AccountsService
from services.targets_service import TargetsService


class FinanceController:
    @staticmethod
    def get_fin_data(user_id: int, period: str, account_id: int) -> dict:
        costs_data = CostsService.get_costs(user_id, period, account_id)
        incomes_date = IncomesService.get_incomes(user_id, period, account_id)
        return {
            'costs': {
                'costs': costs_data['costs'],
                'groups': CostsService.get_costs_sources(user_id, account_id),
                'graphData': costs_data['graph_data']
            },
            'incomes': {
                'incomes': incomes_date['incomes'],
                'sources': IncomesService.get_incomes_sources(user_id, account_id),
                'incomeGraphData': incomes_date['graph_data']
            },
            'budgets': BudgetsService.get_budgets(user_id, account_id),
            'accounts': AccountsService.get_accounts(user_id),
            'targets': TargetsService.get_targets(user_id, account_id)
        }
