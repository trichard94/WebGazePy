import requests
import time
import open3d as o3d
import numpy as np
from pathlib import Path

FPS = 1
ENDPOINT = 'http://localhost:5000/stream'
project_dir = Path(__file__).resolve().parent.parent
ply_file_path = str(project_dir / "resources" / "bun_zipper.ply")

def stream(data):
    delay = 1 / FPS
    while True:
        try:
            response = requests.post(ENDPOINT, json=data)
            print(response.status_code)
            time.sleep(delay)
        except Exception as err:
            print("NOK")


def send_ply(file_path):
    pcd = o3d.io.read_point_cloud(file_path)
    vertices = np.asarray(pcd.points)
    data = {'vertices': vertices.tolist()}
    stream(data=data)


def send_string(string: str):
    stream(string)


if __name__ == "__main__":
    send_ply(ply_file_path)
