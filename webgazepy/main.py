from flask import Flask

webserver = Flask(__name__, static_url_path='/static', static_folder='static')
