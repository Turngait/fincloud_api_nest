from models.accounts_model import Accounts
from services.db_service import DBService


class AccountsService:
    @staticmethod
    def get_accounts(user_id: int) -> list:
        return AccountsService.normalize_accounts(DBService.get_accounts(user_id))

    @staticmethod
    def normalize_accounts(accounts: list) -> list:
        return [AccountsService.get_public_account(account) for account in accounts]

    @staticmethod
    def get_public_account(account: Accounts) -> dict:
        return {
            'id': account.id,
            'title': account.title,
            'description': account.description,
            'balance': account.balance,
            'currency': account.currency,
            'is_active': account.is_active
        }
