// read the new video URL and set it
function takeUrl() {
    source.src = urlForm.value;
    video.load();
    video.play();
}

// read and set the video offset
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

// toggle the presence of default video controls
function toggleControls() {
    let checkBox = document.getElementById("myCheck");
    if (checkBox.checked === true)
        video.controls = true;
    else
        video.controls =  false;
}

// check if name and last name contains only letters and spaces
function validName(s){

    s = s.replace(/\s/g, '');
    var letters = /([A-Z]|[a-z]|\s)/;
    if(s.match(letters))
        return true;
    else{
        console.log("name")
        return false;
    }

}

// check if telephone number contains only digits
function validNumber(n){

    console.log(n)
    if (/^\d+$/.test(n))
        return true
    else{
        window.alert("Not valid phone number")
        return false
    }
}

// check if email address is valid
function validMail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(String(email).toLowerCase()));
        return re.test(String(email).toLowerCase());
}

// return the city and the country of the user
function getCityCountry() {
    return "City, Country"
}

// check if all form inputs are filled
function filledForm() {

    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    if (firstName && lastName && email && phone)
        return true
    else{
        window.alert("Missing information")
        return false
    }

}

// return current date-time string
function getDate() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let strDate = hour + ":" +minute+ " "+ day + "/" + month + "/" + year;
    console.log(strDate)
    return strDate
}

// check if the user information are already present in the session storage
function presentInformation() {

    let name = window.sessionStorage.getItem("firstName");
    let lastName = window.sessionStorage.getItem("lastName");
    let email = window.sessionStorage.getItem("email");
    let phone = window.sessionStorage.getItem("phone");
    console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(phone);

    if (name && lastName && email && phone)
        return true;
    else
        return false;
}

// saves the user information
function saveInformation() {
    console.log("saving info");
    if (filledForm())
        if (validName(firstName) && validName(lastName) && validNumber(phone) && validMail(email)){
            console.log("check ok");
            window.sessionStorage.setItem("firstName", firstName);
            window.sessionStorage.setItem("lastName", lastName);
            window.sessionStorage.setItem("email", email);
            window.sessionStorage.setItem("phone", phone);
            closeNav()
            commentButton.style.display = "none";
            labelComment.style.display = "block";
            commentInput.style.display = "block";
            addCommentButton.style.display = "block";
        }
        else
            console.log("not ok")

}

// save comment in local storage
function saveComment(s) {

    let commentStr = s;
    let name = myStorage.getItem("firstName");
    let lastName = myStorage.getItem("lastName");
    commentStr += " " + name + " " + lastName + getDate() + " " + getCityCountry();
    // saving the comment
    myStorage.setItem(commentKey.toString(), commentStr);
    commentKey += 1;

    myStorage.setItem("numberComments", commentKey.toString());
}

// create an area to show the comment just posted when newComment is true; when it is false, it is used to show comments
// in the local storage
function showComment(s, newComment) {

    // Adds an element to the document
    var p = document.getElementById("commentArea");
    var newElement = document.createElement("textarea");
    newElement.disabled = true;
    newElement.style.class = "form-control";
    newElement.style.rows= "5";
    if (newComment)
        newElement.value = s + " " + name + " " + lastName + getDate() + " " + getCityCountry();
    else
        newElement.value = s;
    p.appendChild(newElement);
}

myStorage = window.localStorage;
var firstName = "";
var lastName = "";
var email = "";
var phone = "";
var video = document.getElementById("myVideo");
var source = video.getElementsByTagName("source")[0];
var numberClicks = 0;
var canvas = document.getElementById("previewCanvas");
var addCommentButton =  document.getElementById("addComment");
canvas.width = 150;
canvas.height = 150;

// listener to get the first frame of the video and put in the preview canvas
video.addEventListener('loadeddata', function() {
    var $this = this;
    canvas.getContext('2d').drawImage($this, 0, 0, canvas.width, canvas.height);
});

// listener to count the number of clicks on preview button, in order to show or hide the video preview
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

// listener to put in the proper canvas the mirrored frames of video when it is played
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

// open the form
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

// close the form
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

var labelComment =   document.getElementById("labelComment");
var commentInput = document.getElementById("commentInput");
var commentButton = document.getElementById("commentButton");
// if user is authenticated show comment and hide button to login
if (presentInformation()) {
    console.log("present")
    commentButton.style.display = "none";
    labelComment.style.display = "block";
    commentInput.style.display = "block";
    addCommentButton.style.display = "block";
    let numberComments = myStorage.getItem("numberComments");
    console.log(numberComments);

    for (let i = 0; i < numberComments; i++) {
        let commentToLoad = myStorage.getItem(i.toString());
        showComment(commentToLoad,newComment=false);
    }
}

var commentKey = 0;

// retrieve number of comments if any
if (myStorage.getItem("numberComments"))
    commentKey = Number(myStorage.getItem("numberComments"));


// save the comment and update the number of comments
commentInput.addEventListener("keydown", function (e){
    if (e.keyCode === 13) {
        e.preventDefault();
        saveComment(commentInput.value);
        showComment(commentInput.value, newComment = true);
        commentInput.value = "";}
});



