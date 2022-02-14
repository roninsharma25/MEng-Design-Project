# schools.py: Endpoints for reading and writing Schools database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from flask import Blueprint

schools = Blueprint('schools', __name__, url_prefix='/schools')

@schools.route('/')
def show():
    return 'schools root'
