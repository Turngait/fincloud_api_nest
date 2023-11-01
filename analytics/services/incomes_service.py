from models.incomes_model import Incomes
from models.income_sources_model import IncomeSources


class IncomesService:
    @staticmethod
    def get_incomes(user_id: int, period: str, account_id: int) -> list:
        incomes = Incomes.query.filter_by(user_id=user_id, period=period, account_id=account_id).all()
        return IncomesService.normalize_incomes(incomes)

    @staticmethod
    def get_incomes_sources(user_id: int, account_id: int) -> list:
        incomes_sources = IncomeSources.query.filter_by(user_id=user_id, account_id=account_id).all()
        return IncomesService.normalize_incomes_sources(incomes_sources)

    @staticmethod
    def normalize_incomes(incomes: list) -> list:
        items = []
        gainByPeriod = 0
        periods = set(income.date.isoformat() for income in incomes)
        periods = sorted(periods, reverse=True)

        for period in periods:
            gainByDay = 0
            costsInDate = []
            for income in incomes:
                if income.date.isoformat() == period:
                    costsInDate.append(IncomesService.get_public_income(income))
                    gainByDay += income.amount
                    gainByPeriod += gainByDay

            items.append({
                'period': period,
                'items': costsInDate,
                'gainByDay': gainByDay,
                'gainByPeriod': gainByPeriod
            })

        return items

    @staticmethod
    def get_public_income(income: Incomes) -> dict:
        return {
            'amount': income.amount,
            'id': income.id,
            'source_id ': income.source_id,
            'account_id': income.account_id,
            'title': income.title,
            'year': income.year,
            'month': income.month,
            'period': income.period,
            'description': income.description,
            'date': income.date,
            'budget_id': income.budget_id
        }

    @staticmethod
    def normalize_incomes_sources(incomes_sources: list) -> list:
        return [IncomesService.get_public_income_source(income_source) for income_source in incomes_sources]

    @staticmethod
    def get_public_income_source(income_source: IncomeSources) -> dict:
        return {
          'id': income_source.id,
          'account_id': income_source.account_id,
          'title': income_source.title,
          'description': income_source.description,
          'order': income_source.order
        }

