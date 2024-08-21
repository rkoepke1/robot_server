
class RobotSingleton:
    _instance = None
    
    @staticmethod
    def get_instance():
        if RobotSingleton._instance is None:
            RobotSingleton()
        return RobotSingleton._instance

    def __init__(self):
        if RobotSingleton._instance is not None:
            raise Exception("Only one singleton!")
        else:
            RobotSingleton._instance = self
            from robot_control import robotControl
            from robot_control import cameraStreamer
            self.robot = robotControl.Init_Robot(h_cam_servo1=8, v_cam_servo2=7)
            self.robot.center_camera()
            self.camera_streamer = cameraStreamer.CameraStreamer()