

function takeUrl() {
    source.src = urlForm.value;
    video.load();
    video.play();
}

function takeOffset() {

    let new_offset = offset.value;
    console.log(typeof new_offset);
    let number_offset = Number(new_offset);
    if (typeof number_offset === 'number' && Number.isInteger(number_offset)){
        if(number_offset < 0)
            window.alert("Error: the number is negative");
        else if (number_offset > video.duration)
            window.alert("Error: the number exceeds the length of the video");
        else {
            video.currentTime = new_offset;
            video.play();
        }
    }    else
        window.alert("Error: the input is not an integer number");
}

function toggleControls() {
    let checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true)
        video.controls = true;
    else
        video.controls =  false;
}


var video = document.getElementById("myVideo");
var source = video.getElementsByTagName("source")[0];


var numberClicks = 0;
var canvas = document.getElementById("previewCanvas");
canvas.width = 150;
canvas.height = 150;

video.addEventListener("canplay",function () {
    var $this = this;
    console.log("canplay");
    console.log(video.readyState);
    canvas.getContext('2d').drawImage($this, 0, 0, canvas.width, canvas.height);
});


var previewButton = document.getElementById("previewButton");
previewButton.addEventListener("click",function (e) {
    numberClicks += 1;

    if (numberClicks%2 == 1){
        canvas.style.display = "block";
    }else
        canvas.style.display = "none";
});


// change video URL when a new one is inserted
var urlForm  = document.getElementById("urlForm");
urlForm.addEventListener("keydown", function (e){
    if (e.keyCode === 13){
        takeUrl();
    }
});

// offeset video
var offset = document.getElementById("Offset");
offset.addEventListener("keydown", function (e){
    if (e.keyCode === 13){
        takeOffset();
    }
});

// rotate the video
var angle = 0;
var rotationButton = document.getElementById("rotationButton");
rotationButton.addEventListener("click", function () {
    angle += 90;
    angle = angle%360;
    video.style.transform = "rotate("+angle+"deg)";
})

// listener to check if the inserted URL is correct
source.addEventListener("error", function() {
    window.alert("Error: the video link is wrong!")
});

// Mirroring the video in a canvas
var mCanvas = document.getElementById('mirroredCanvas');
var context = mCanvas.getContext('2d');


video.addEventListener('loadedmetadata', function() {
    mCanvas.width = 150;
    mCanvas.height = 100
});

video.addEventListener('play', function() {
    var $this = this;
    (function loop() {
        if (!$this.paused && !$this.ended) {
            context.save();
            context.scale(-1, 1);
            context.drawImage($this, 0, 0, mCanvas.width*-1, mCanvas.height);
            context.restore();
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
    })();
}, 0);

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

// form
/*var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {

    let name = document.getElementById("nameInput").valueOf();
    let lastName = document.getElementById("latNameInput").valueOf();
    let email = document.getElementById("emailInput").valueOf(); // already checked
    let phone = document.getElementById("phoneInput").valueOf();

    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("lastName", lastName);
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("phone", phone);
});*/


