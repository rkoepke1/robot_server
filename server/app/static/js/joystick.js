class Joystick {
    constructor(containerId, joystickId) {
        this.container = document.getElementById(containerId);
        this.joystick = document.getElementById(joystickId);
        this.isDragging = false;

        this.containerRect = this.container.getBoundingClientRect();
        this.centerX = this.containerRect.width / 2;
        this.centerY = this.containerRect.height / 2;
        this.maxDistance = this.containerRect.width / 2;

        this.initEventListeners();
        console.log('Joystick initialized');
    }

    initEventListeners() {
        this.joystick.addEventListener('mousedown', () => {
            this.isDragging = true;
            console.log('Mouse down');
        });
        this.joystick.addEventListener('touchstart', () => {
            this.isDragging = true;
            console.log('Touch start');
        });

        document.addEventListener('mousemove', this.handleJoystickMove.bind(this));
        document.addEventListener('touchmove', this.handleJoystickMove.bind(this));
        document.addEventListener('mouseup', this.handleJoystickEnd.bind(this));
        document.addEventListener('touchend', this.handleJoystickEnd.bind(this));

        window.addEventListener('resize', this.updateContainerRect.bind(this));
    }

    updateContainerRect() {
        this.containerRect = this.container.getBoundingClientRect();
        this.centerX = this.containerRect.width / 2;
        this.centerY = this.containerRect.height / 2;
        this.maxDistance = this.containerRect.width / 2;
        console.log('Container rect updated');
    }

    handleJoystickMove(event) {
        event.preventDefault();
        if (!this.isDragging) return;
        console.log('Joystick move');

        let clientX, clientY;
        if (event.type.startsWith('touch')) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        let offsetX = clientX - this.containerRect.left;
        let offsetY = clientY - this.containerRect.top;
        let deltaX = offsetX - this.centerX;
        let deltaY = offsetY - this.centerY;
        let distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), this.maxDistance);
        let angle = Math.atan2(deltaY, deltaX);

        let newX = this.centerX + distance * Math.cos(angle);
        let newY = this.centerY + distance * Math.sin(angle);

        this.joystick.style.left = `${newX}px`;
        this.joystick.style.top = `${newY}px`;

        let normalizedX = (newX - this.centerX) / this.maxDistance;
        let normalizedY = (newY - this.centerY) / this.maxDistance;

        this.sendJoystickData(normalizedX, normalizedY);
    }

    handleJoystickEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        console.log('Joystick end');
        this.joystick.style.left = '50%';
        this.joystick.style.top = '50%';
        this.sendJoystickData(0, 0);
    }

    sendJoystickData(x, y) {
        console.log(`Sending joystick data: x=${x}, y=${y}`);
        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ direction: { x: x, y: y } }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
}

export default Joystick;