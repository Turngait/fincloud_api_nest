from app import db
from datetime import datetime

class Costs(db.Model):
  __tablename__ = 'costs'
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(length=150), nullable=False)
  description = db.Column(db.Text, nullable=True)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
  budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'), nullable=False)
  group_id = db.Column(db.Integer, db.ForeignKey('cost_groups.id'), nullable=False)

  amount = db.Column(db.Integer, nullable=False, default=0)
  year = db.Column(db.Integer, nullable=False, default=0)
  month = db.Column(db.Integer, nullable=False, default=0)
  period = db.Column(db.String(length=100), nullable=False)
  date = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return '<Cost %r>' % self.id
