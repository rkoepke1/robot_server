
import cv2
from picamera2 import Picamera2
import libcamera

class CameraStreamer:
    def __init__(self):
        self.camera = Picamera2()
        self.camera.configure(self.camera.create_preview_configuration(main={"size": (640, 480)}))
        self.camera.start()
        self.is_running = False

    def start(self):
        if not self.is_running:
            self.camera.start()
            self.is_running = True

    def generate_frames(self):
        while True:
            frame = self.camera.capture_array()
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    def close(self):
        if self.is_running:
            self.camera.stop()
            self.is_running = False