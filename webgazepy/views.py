from flask import render_template, jsonify, request
from . import webserver
import numpy as np


class Data:
    payload = []


@webserver.route('/')
def index():
    return render_template('index.html')

# Process a generated pointcloud
@webserver.route('/get_point_cloud')
def get_point_cloud():
    num_particles = 10000
    points = np.random.uniform(low=-0, high=1, size=(num_particles, 3))
    points_list = points.tolist()
    return jsonify(points=points_list)

@webserver.route('/stream', methods=['POST'])
def stream():
    data = request.get_json()
    if 'vertices' in data:
        Data.payload = data['vertices']
        return jsonify({"message": "Data received successfully."})
    return jsonify({"error": "Invalid data format."})


@webserver.route('/get_vertices_data', methods=['GET'])
def get_vertices_data():
    return jsonify(vertices=Data.payload)

