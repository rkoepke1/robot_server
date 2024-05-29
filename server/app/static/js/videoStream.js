function startStream() {
    document.getElementById('video').style.display = 'block';
    document.getElementById('video').src = '{{ url_for("main.video_feed") }}';
}

function stopStream() {
    document.getElementById('video').style.display = 'none';
    fetch('{{ url_for("main.stop_feed") }}');
}
