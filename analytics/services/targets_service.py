from models.targets_model import Targets
from services.db_service import DBService


class TargetsService:
    @staticmethod
    def get_targets(user_id: int, account_id: int) -> dict:
        return TargetsService.normalize_targets(DBService.get_targets(user_id, account_id))

    @staticmethod
    def normalize_targets(targets: list) -> dict:
        if len(targets) < 1:
            return {
                'day': [],
                'month': []
            }

        monthly_targets = [TargetsService.get_public_target(target) for target in targets if target.type == 'month']
        daily_targets = [TargetsService.get_public_target(target) for target in targets if target.type == 'day']

        return {
            'day': daily_targets,
            'month': monthly_targets
        }

    @staticmethod
    def get_public_target(target: Targets) -> dict:
        return {
            'id': target.id,
            'amount': target.amount,
            'type': target.type,
            'created_at': target.created_at,
            'group_id': target.group_id,
            'account_id': target.account_id
        }
