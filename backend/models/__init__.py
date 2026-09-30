from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from models.student import Student
from models.prediction import Prediction