from models.costs_model import Costs
from models.cost_groups_model import CostGroups


class CostsService:
    @staticmethod
    def get_costs(user_id: int, period: str, account_id: int) -> list:
        costs = Costs.query.filter_by(user_id=user_id, period=period, account_id=account_id).all()
        return CostsService.normalize_costs(costs)

    @staticmethod
    def get_costs_sources(user_id: int, account_id: int) -> list:
        costs_groups = CostGroups.query.filter_by(user_id=user_id, account_id=account_id).all()
        return CostsService.normalize_costs_group(costs_groups)

    @staticmethod
    def normalize_costs(costs: list) -> list:
        items = []
        spentByPeriod = 0
        periods = set(cost.date.isoformat() for cost in costs)
        periods = sorted(periods, reverse=True)

        for period in periods:
            spentByDay = 0
            costsInDate = []
            for cost in costs:
                if cost.date.isoformat() == period:
                    costsInDate.append(CostsService.get_public_cost(cost))
                    spentByDay += cost.amount
                    spentByPeriod += spentByDay

            items.append({
                'period': period,
                'items': costsInDate,
                'spentByDay': spentByDay,
                'spentByThisMonth': spentByPeriod
            })

        return items

    @staticmethod
    def get_public_cost(cost: Costs) -> dict:
        return {
            'amount': cost.amount,
            'id': cost.id,
            'group_id ': cost.group_id,
            'account_id': cost.account_id,
            'title': cost.title,
            'year': cost.year,
            'month': cost.month,
            'period': cost.period,
            'description': cost.description,
            'date': cost.date,
            'budget_id': cost.budget_id
        }

    @staticmethod
    def normalize_costs_group(costs_groups: list) -> list:
        return [CostsService.get_public_cost_group(cost_group) for cost_group in costs_groups]

    @staticmethod
    def get_public_cost_group(cost_group: CostGroups) -> dict:
        return {
            'id': cost_group.id,
            'account_id': cost_group.account_id,
            'title': cost_group.title,
            'description': cost_group.description,
            'order': cost_group.order
        }