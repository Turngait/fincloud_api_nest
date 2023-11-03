from models.costs_model import Costs
from models.cost_groups_model import CostGroups
from models.incomes_model import Incomes
from models.income_sources_model import IncomeSources
from models.budgets_model import Budgets
from models.accounts_model import Accounts
from models.targets_model import Targets


class DBService:
    @staticmethod
    def get_costs_by_period(user_id: int, period: str, account_id: int) -> list:
        try:
            return Costs.query.filter_by(user_id=user_id, period=period, account_id=account_id).all()
        except:
            return []

    @staticmethod
    def get_costs_groups(user_id: int, account_id: int) -> list:
        try:
            return CostGroups.query.filter_by(user_id=user_id, account_id=account_id).all()
        except:
            return []

    @staticmethod
    def get_incomes_by_period(user_id: int, period: str, account_id: int) -> list:
        try:
            return Incomes.query.filter_by(user_id=user_id, period=period, account_id=account_id).all()
        except:
            return []

    @staticmethod
    def get_incomes_sources_by_period(user_id: int, account_id: int) -> list:
        try:
            return IncomeSources.query.filter_by(user_id=user_id, account_id=account_id).all()
        except:
            return []

    @staticmethod
    def get_budgets(user_id: int, account_id: int) -> list:
        try:
            return Budgets.query.filter_by(user_id=user_id, account_id=account_id).all()
        except:
            return []

    @staticmethod
    def get_accounts(user_id: int) -> list:
        try:
            return Accounts.query.filter_by(user_id=user_id).all()
        except:
            return []

    @staticmethod
    def get_targets(user_id: int, account_id: int) -> list:
        try:
            return Targets.query.filter_by(user_id=user_id, account_id=account_id).all()
        except:
            return []
