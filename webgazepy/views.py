from flask import render_template
from . import webserver


@webserver.route('/')
def index():
    return render_template('index.html')
