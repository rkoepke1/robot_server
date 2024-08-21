from flask import Blueprint, render_template, Response, request, jsonify, current_app, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required
from .models import LoginForm
from .models import User
from .robot_singleton import RobotSingleton
from robot_control import cameraStreamer
from robot_control import robotControl

main = Blueprint('main', __name__)
auth = Blueprint('auth', __name__)

@main.route('/')
@login_required
def home():
    return render_template('index.html')

@main.route('/video_feed')
def video_feed():
    camera_streamer = RobotSingleton.get_instance().camera_streamer
    camera_streamer.start() 
    return Response(camera_streamer.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@main.route('/stop_feed', methods=['POST'])
def stop_feed():
    camera_streamer = RobotSingleton.get_instance().camera_streamer
    camera_streamer.close()
    return jsonify({'status': 'stopped'})

@main.route('/move', methods=['POST'])
def move():
    robot = RobotSingleton.get_instance().robot
    direction = request.json.get('direction')
    if direction:
        h_val = direction.get('x', 0)
        v_val = direction.get('y', 0)
        robot.move_camera(-h_val, v_val)
        return jsonify({'status': 'moving', 'direction': direction})
    return jsonify({'status': 'failed', 'reason': 'No direction provided'}), 400

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('main.home'))
        else:
            flash('Invalid username or password')
    return render_template('login.html', form=form)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))