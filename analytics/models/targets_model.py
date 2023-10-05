from app import db
from datetime import datetime

class Targets(db.Model):
  __tablename__ = 'targets'
  id = db.Column(db.Integer, primary_key = True)
  type = db.Column(db.String(length=150), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
  group_id = db.Column(db.Integer, db.ForeignKey('cost_groups.id'), nullable=False)
  amount = db.Column(db.Integer, nullable=False, default=0)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return '<Target %r>' % self.id
