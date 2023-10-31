from datetime import datetime

class CostsService:
  @staticmethod
  def normalizeCosts(costs):
    items = []
    spentByPeriod = 0
    periods = set(cost.date.isoformat() for cost in costs)
    periods = sorted(periods, reverse=True)

    for period in periods:
      spentByDay = 0
      costsInDate = []
      for cost in costs:
        if cost.date.isoformat() == period:
          costsInDate.append(CostsService.getPublicCost(cost))
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
  def getPublicCost(cost):
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
