class IncomesService:
  @staticmethod
  def normalizeIncomes(incomes):
    items = []
    gainByPeriod = 0
    periods = set(income.date.isoformat() for income in incomes)
    periods = sorted(periods, reverse=True)

    for period in periods:
      gainByDay = 0
      costsInDate = []
      for income in incomes:
        if income.date.isoformat() == period:
          costsInDate.append(IncomesService.getPublicIncome(income))
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
  def getPublicIncome(income):
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
