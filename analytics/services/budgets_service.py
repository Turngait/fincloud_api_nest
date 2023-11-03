from models.budgets_model import Budgets
from services.db_service import DBService


class BudgetsService:
    @staticmethod
    def get_budgets(user_id, account_id):
        return BudgetsService.normalize_budgets(DBService.get_budgets(user_id, account_id))

    @staticmethod
    def normalize_budgets(budgets: list) -> list:
        return [BudgetsService.get_public_budget(budget) for budget in budgets]

    @staticmethod
    def get_public_budget(budget: Budgets) -> dict:
        return {
            'id': budget.id,
            'title': budget.title,
            'description': budget.description,
            'balance': budget.balance,
            'is_calculated': budget.is_calculated,
            'account_id': budget.account_id
        }
