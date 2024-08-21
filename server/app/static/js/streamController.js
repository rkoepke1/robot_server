class StreamController {
    constructor(videoContainerId) {
        this.videoContainer = document.getElementById(videoContainerId);
        this.fullscreenContainer = document.getElementById('fullscreenContainer'); 
        this.buttonContainer = document.getElementById('buttonContainer'); 
        this.joystickContainer = document.getElementById('joystickContainer'); 
        if (!this.videoContainer) {
            console.error(`Video element with ID ${videoContainerId} not found.`);
        }
        if (!this.fullscreenContainer) {
            console.error('Fullscreen container element not found.');
        }
        this.videoUrl = null;
        this.stopUrl = null;
        this.isFullscreen = false; // Track fullscreen state
    }

    initialize(videoUrl, stopUrl) {
        this.videoUrl = videoUrl;
        this.stopUrl = stopUrl;
    }

    startStream() {
        if (this.videoUrl) {
            console.log('Starting stream with URL:', this.videoUrl);
            this.videoContainer.src = this.videoUrl;
            this.videoContainer.style.display = 'block';
        } else {
            console.error('Stream URL not initialized.');
        }
    }

    stopStream() {
        if (this.stopUrl) {
            console.log('Stopping stream with URL:', this.stopUrl);
            this.videoContainer.src = '';
            fetch(this.stopUrl, {
                method: 'POST',
            }).catch((error) => {
                console.error('Error stopping stream:', error);
            });
        } else {
            console.error('Stop URL not initialized.');
        }
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            console.log('Entering fullscreen mode');
            this.enterFullscreen();
        } else {
            console.log('Exiting fullscreen mode');
            this.exitFullscreen();
        }
        this.isFullscreen = !this.isFullscreen;
    }

    enterFullscreen() {
        if (!this.fullscreenContainer || !this.videoContainer) {
            console.error('Fullscreen container or video element not found.');
            return;
        }
        this.fullscreenContainer.style.position = 'fixed';
        this.fullscreenContainer.style.top = '0';
        this.fullscreenContainer.style.left = '0';
        this.fullscreenContainer.style.width = '100vw';
        this.fullscreenContainer.style.height = '100vh';
        this.fullscreenContainer.style.zIndex = '9999';
        this.fullscreenContainer.style.backgroundColor = 'black'; 
        this.videoContainer.style.width = '1340px';
        this.videoContainer.style.height = '1080px';
        this.buttonContainer.style.right = '50px';
        this.joystickContainer.style.right = '50px';
        document.body.style.overflow = 'hidden'; 
    }

    exitFullscreen() {
        if (!this.fullscreenContainer || !this.videoContainer) {
            console.error('Fullscreen container or video element not found.');
            return;
        }
        this.fullscreenContainer.style.position = '';
        this.fullscreenContainer.style.top = '';
        this.fullscreenContainer.style.left = '';
        this.fullscreenContainer.style.width = '';
        this.fullscreenContainer.style.height = '';
        this.fullscreenContainer.style.zIndex = '';
        this.fullscreenContainer.style.backgroundColor = ''; 
        this.videoContainer.style.width = '';
        this.videoContainer.style.height = '';
        this.videoContainer.style.objectFit = ''; 
        this.buttonContainer.style.right = '';
        this.joystickContainer.style.right = '';
        document.body.style.overflow = ''; 
    }
}

export default StreamController;
