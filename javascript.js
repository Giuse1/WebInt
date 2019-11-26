function takeUrl(e) {
    var new_url = urlForm.value;
    source.src = new_url;
    video.load();
    video.play();
}

function takeOffset(e) {

    var new_offset = offset.value;
    console.log(typeof new_offset);
    var number_offset = Number(new_offset);
    if (typeof number_offset === 'number' && Number.isInteger(number_offset)){
        var video = document.getElementById("myVideo");
        if(number_offset < 0)
            window.alert("Error: the number is negative");
        else if (number_offset > video.duration)
            window.alert("Error: the number exceeds the lenght of the video");
        else {
            video.currentTime = new_offset;
            video.play();
        }
    }    else
        window.alert("Error: the input is not an integer number");
}

function toggleControls() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    var video = document.getElementById("myVideo");
    if (checkBox.checked == true)
        video.controls = true;
    else
        video.controls =  false;
}

var video = document.getElementById("myVideo");
var source = video.getElementsByTagName("source")[0];
var urlForm  = document.getElementById("urlForm");
urlForm.addEventListener("keydown", function (e){
    if (e.keyCode === 13){
        takeUrl(e);
    }
});

var offset = document.getElementById("Offset");
offset.addEventListener("keydown", function (e){
    if (e.keyCode === 13){
        takeOffset(e);
    }
});

var angle = 0;
var rotationButton = document.getElementById("rotationButton");
rotationButton.addEventListener("click", function (e) {
    angle += 90;
    angle = angle%360;
    video.style.transform = "rotate("+angle+"deg)";
})

source.addEventListener("error", function(e) {
    window.alert("Error: the video link is wrong!")
});


$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});


var previewButton = document.getElementById("previewButton");
previewButton.addEventListener("click",function (e) {
    var canvas = document.createElement("canvas");
    canvas.width = "200px";
    canvas.height = "150px";
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    let url = URL.createObjectURL(img);
    window.alert(url);
    previewButton.setAttribute("data-content",url);
})


var testArray = ["Shirt", "Bottom", "Shoes"];
var toAdd = "toAdd";
window.sessionStorage.setItem("items", JSON.stringify(testArray));
var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets
var i;
var a = [];
for (i = 0; i < storedArray.length; i++) {
    a.push(storedArray[i]);
}
a.push(toAdd);
for (i = 0; i < a.length; i++) {
    console.log(a[i]);
}
