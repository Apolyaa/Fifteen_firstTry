window.onload = function() {
    let time = document.getElementById("time");
    let clicks = document.getElementById("clicks");

    time.innerText = localStorage.getItem('time');
    clicks.innerText = localStorage.getItem('clicks');
}
