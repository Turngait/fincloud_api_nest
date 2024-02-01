from datetime import datetime

from models.costs_model import Costs
from models.cost_groups_model import CostGroups
from services.db_service import DBService


class CostsService:
    @staticmethod
    def get_costs(user_id: int, period: str, account_id: int) -> dict:
        return CostsService.normalize_costs(DBService.get_costs_by_period(user_id, period, account_id))

    @staticmethod
    def get_costs_sources(user_id: int, account_id: int) -> list:
        return CostsService.normalize_costs_group(DBService.get_costs_groups(user_id, account_id))

    @staticmethod
    def normalize_costs(costs: list) -> dict:
        items = []
        periods = set(cost.date.isoformat() for cost in costs)
        periods = sorted(periods, reverse=True)

        for period in periods:
            spentByDay = 0
            costsInDate = []
            for cost in costs:
                if cost.date.isoformat() == period:
                    costsInDate.append(CostsService.get_public_cost(cost))
                    spentByDay += cost.amount
            items.append({
                'period': period,
                'items': costsInDate,
                'spentByDay': spentByDay,
            })

        graph_data = CostsService.add_graph_data(costs)
        statistics = CostsService.calculate_month_sum(items)
        return {'costs': items, 'graph_data': graph_data, 'statistics': statistics}

    @staticmethod
    def get_public_cost(cost: Costs) -> dict:
        return {
            'amount': cost.amount,
            'id': cost.id,
            'group_id': cost.group_id,
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

    @staticmethod
    def add_graph_data(costs: list):
        graph_costs = []
        graph_days = []
        days = set([cost.date.isoformat() for cost in costs])
        days = sorted(days, reverse=False)

        for day in days:
            sum_of_costs = 0
            for cost in costs:
                day2 = cost.date.isoformat()
                if day == day2:
                   sum_of_costs += cost.amount
            graph_costs.append(sum_of_costs)
            graph_days.append(day)
        return {
            'days': graph_days,
            'items': graph_costs,
        }

    @staticmethod
    def calculate_month_sum(costs):
        if not costs:
            return {'spentByMonth': 0}
        sum_of_month = 0
        for cost in costs:
            sum_of_month += cost['spentByDay']

        return {'spentByMonth': sum_of_month}
