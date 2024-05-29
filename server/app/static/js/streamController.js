class StreamController {
    constructor(videoElementId) {
        this.videoElement = document.getElementById(videoElementId);
        this.videoUrl = null;
        this.stopUrl = null;
    }

    initialize(videoUrl, stopUrl) {
        this.videoUrl = videoUrl;
        this.stopUrl = stopUrl;
    }

    startStream() {
        if (this.videoUrl) {
            console.log('Starting stream with URL:', this.videoUrl);  // Debug statement
            this.videoElement.src = this.videoUrl;
            this.videoElement.style.display = 'block';
        } else {
            console.error('Stream URL not initialized.');
        }
    }

    stopStream() {
        if (this.stopUrl) {
            console.log('Stopping stream with URL:', this.stopUrl);  // Debug statement
            this.videoElement.src = '';
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
        if (this.videoElement.requestFullscreen) {
            this.videoElement.requestFullscreen();
        } else if (this.videoElement.mozRequestFullScreen) { 
            this.videoElement.mozRequestFullScreen();
        } else if (this.videoElement.webkitRequestFullscreen) { 
            this.videoElement.webkitRequestFullscreen();
        } else if (this.videoElement.msRequestFullscreen) { 
            this.videoElement.msRequestFullscreen();
        }
    }
}

export default StreamController;