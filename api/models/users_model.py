from app import db
from datetime import datetime

class Users(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), nullable=False)
  pass = db.Column(db.String(300), nullable=False)
  token = db.Column(db.String(300))
  paper = db.Column(db.String(300))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return '<User %r>' % self.id