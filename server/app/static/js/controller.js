function sendCommand(direction) {
    fetch('{{ url_for("main.move") }}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ direction: direction }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

window.addEventListener('resize', () => {
    containerRect = joystickContainer.getBoundingClientRect();
    centerX = containerRect.width / 2;
    centerY = containerRect.height / 2;
    maxDistance = containerRect.width / 2;
});

window.addEventListener("controllerconnected", function(event) {
    let gp = event.controller;
    document.getElementById("controllerStatus").innerText = `controller connected at index ${gp.index}: ${gp.id}. ${gp.buttons.length} buttons, ${gp.axes.length} axes.`;
    updatecontrollerStatus();
});

window.addEventListener("controllerdisconnected", function(event) {
    document.getElementById("controllerStatus").innerText = "No controller connected";
});

function updatecontrollerStatus() {
    let controllers = navigator.getcontrollers();
    for (let i = 0; i < controllers.length; i++) {
        let gp = controllers[i];
        if (gp) {
            // Example: Log the status of the first button
            if (gp.buttons[0].pressed) {
                console.log("Button 0 is pressed");
            }

            // Example: Log the status of the first axis (joystick)
            console.log(`Axis 0: ${gp.axes[0]}, Axis 1: ${gp.axes[1]}`);
        }
    }
    requestAnimationFrame(updatecontrollerStatus);
}