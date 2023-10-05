from app import db
from datetime import datetime

class Accounts(db.Model):
  __tablename__ = 'accounts'
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(length=150), nullable=False)
  description = db.Column(db.Text, nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  balance = db.Column(db.Integer, nullable=False, default=0)
  currency = db.Column(db.String(length=50), nullable=False, default="USD")
  is_active = db.Column(db.Boolean, nullable=False, default=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return '<Account %r>' % self.id
