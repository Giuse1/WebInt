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
        video.currentTime = new_offset;
        video.play();
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


/*var rotationButton = document.getElementById("rotationButton");
rotationButton.addEventListener("click", function (e) {
})*/

source.addEventListener("error", function(e) {
    window.alert("Error: the video link is wrong!")
});

