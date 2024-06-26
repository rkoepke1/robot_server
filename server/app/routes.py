from flask import Blueprint, render_template, Response, request, jsonify, current_app
import os
from . import cameraStreamer
from . import robotControl

robot = robotControl.Init_Robot(h_cam_servo1=8, v_cam_servo2=7)
robot.center_camera()
camera_streamer = cameraStreamer.CameraStreamer()
main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/video_feed')
def video_feed():
    camera_streamer.start() 
    return Response(camera_streamer.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@main.route('/stop_feed', methods=['POST'])
def stop_feed():
    camera_streamer.close()
    return jsonify({'status': 'stopped'})

@main.route('/move', methods=['POST'])
def move():
    direction = request.json.get('direction')
    if direction:
        h_val = direction.get('x', 0)
        v_val = direction.get('y', 0)
        robot.move_camera(h_val, v_val)
        return jsonify({'status': 'moving', 'direction': direction})
    return jsonify({'status': 'failed', 'reason': 'No direction provided'}), 400
