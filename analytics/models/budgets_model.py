from app import db
from datetime import datetime

class Budgets(db.Model):
  __tablename__ = 'budgets'
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(length=150), nullable=False)
  description = db.Column(db.Text, nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
  balance = db.Column(db.Integer, nullable=False, default=0)
  is_calculated = db.Column(db.Boolean, nullable=False, default=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return '<Budget %r>' % self.id
