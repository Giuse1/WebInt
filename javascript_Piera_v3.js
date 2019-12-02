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
    if (typeof number_offset === 'number' && Number.isInteger(number_offset)) {
        if (number_offset < 0)
            window.alert("Error: the number is negative");
        else if (number_offset > video.duration)
            window.alert("Error: the number exceeds the length of the video");
        else {
            video.currentTime = new_offset;
            video.play();
        }
    } else
        window.alert("Error: the input is not an integer number");
}

// toggle the presence of default video controls
function toggleControls() {
    let checkBox = document.getElementById("myCheck");
    if (checkBox.checked === true)
        video.controls = true;
    else
        video.controls = false;
}

// check if name and last name contains only letters and spaces
function validName(s) {

    s = s.replace(/\s/g, '');
    var letters = /([A-Z]|[a-z]|\s)/;
    if (s.match(letters))
        return true;
    else {
        console.log("name")
        return false;
    }

}

// check if telephone number contains only digits
function validNumber(n) {

    console.log(n)
    if (/^\d+$/.test(n))
        return true
    else {
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



function getCityCountry() {
    return  sessionStorage.getItem("city") + ", " + sessionStorage.getItem("country");
}

// check if all form inputs are filled and correct
function filledForm() {

    let name = document.getElementById("firstName").value;
    let surname = document.getElementById("lastName").value;
    let mail = document.getElementById("email").value;
    let tel = document.getElementById("phone").value;

    if (name && surname && mail && tel)
        if (validName(name) && validName(surname) && validNumber(tel) && validMail(mail)) {
            firstName = name;
            lastName = surname;
            email = mail;
            phone = tel;
            return true
        } else {
            window.alert("Missing information ");
            return false
        }
}

// return current date-time string
function dateStr() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let strDate = hour + ":" + minute + " " + day + "/" + month + "/" + year;
    console.log(strDate)
    return strDate
}

// check if the user information are already present in the session storage and save them if present
function presentInformation() {

    let name = window.sessionStorage.getItem("firstName");
    let surname = window.sessionStorage.getItem("lastName");
    let mail = window.sessionStorage.getItem("email");
    let tel = window.sessionStorage.getItem("phone");
    console.log(name);
    console.log(surname);
    console.log(mail);
    console.log(tel);

    if (name && surname && mail && tel) {
        firstName = name;
        lastName = surname;
        email = mail;
        phone = tel;
        showAvatar(firstName, lastName)
        return true;
    } else
        return false;
}

// saves the user information in session storage
function saveInformation() {
    console.log("saving info");
    if (filledForm()) {
        console.log("check ok");
        window.sessionStorage.setItem("firstName", firstName);
        window.sessionStorage.setItem("lastName", lastName);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("phone", phone);
        closeNav();
        commentButton.style.display = "none";
        labelComment.style.display = "block";
        commentInput.style.display = "block";
        addCommentButton.style.display = "block";
        loadComments();
    } else
        console.log("not ok")

}

// save comment in local storage
function saveComment(s) {

    let commentStr = s;
    // saving the comment
    myStorage.setItem(commentKey.toString(), commentStr);
    commentKey += 1;

    myStorage.setItem("numberComments", commentKey.toString());
}

// create an area to show the comments
function showComment(comment, user, location) {
    let element = document.getElementById("commentArea");
    let p = document.createElement("p");
    p.style.padding = "10px";
    p.style.border = "dashed #AFEBAB";

    p.style.wordBreak = "break-word"
    p.style.width = "500px";


    var node = document.createTextNode(comment);
    var node2 = document.createTextNode(user);
    var node3 = document.createTextNode(location);
    var node4 = document.createElement("img")
    node4.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFANoiGzwMeVa4PdAnNJ3GBAZbA-TDlCnubGAc7oR6nbmaYo5k&s')
    node4.width = '50'
    node4.height = '50'

    p.appendChild(node4);
    p.appendChild(node2);
    p.appendChild(document.createElement("BR"));
    p.appendChild(node);
    
    p.appendChild(document.createElement("BR"));

    p.appendChild(node3);
    

    element.appendChild(p);
    // Adds an element to the document

}

function showAvatar(name, surname) {
    let element = document.getElementById("personalInfo");
    let p = document.createElement("p");

    var nodeName = document.createTextNode(name);
    var nodeSurname = document.createTextNode(surname);
    var node4 = document.createElement("img")
    node4.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFANoiGzwMeVa4PdAnNJ3GBAZbA-TDlCnubGAc7oR6nbmaYo5k&s')
    node4.width = '100'
    node4.height = '100'

    p.appendChild(node4);
    p.appendChild(nodeName);
    p.appendChild(nodeSurname);

    element.appendChild(p);
    // Adds an element to the document

}

// open the form
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

// close the form
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

// inserts the video in the jukebox player
function insertVideoJukebox(v) {

    let url = v.getElementsByTagName("source")[0].src;
    let type = 'video/webm';
    let source = videoJukebox.getElementsByTagName("source")[0];

    if (!source) {
        source = document.createElement('source');
        videoJukebox.appendChild(source);
    }
    source.src = url;
    source.type = type;
    console.log(v.currentTime);
    videoJukebox.load();
    videoJukebox.currentTime = 0;
    videoJukebox.play();
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
var addCommentButton = document.getElementById("addComment");
var n = 0; // counter for jukebox
canvas.width = 150;
canvas.height = 150;

// listener to get the first frame of the video and put in the preview canvas
video.addEventListener('loadeddata', function () {
    var $this = this;
    canvas.getContext('2d').drawImage($this, 0, 0, canvas.width, canvas.height);
});

// listener to count the number of clicks on preview button, in order to show or hide the video preview
var previewButton = document.getElementById("previewButton");
previewButton.addEventListener("click", function (e) {
    numberClicks += 1;

    if (numberClicks % 2 == 1) {
        canvas.style.display = "block";
    } else
        canvas.style.display = "none";
});

// change video URL when a new one is inserted
var urlForm = document.getElementById("urlForm");
urlForm.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        takeUrl();
    }
});

// offeset video
var offset = document.getElementById("Offset");
offset.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        takeOffset();
    }
});

// rotate the video
var angle = 0;
var rotationButton = document.getElementById("rotationButton");
rotationButton.addEventListener("click", function () {
    angle += 90;
    angle = angle % 360;
    video.style.transform = "rotate(" + angle + "deg)";
})

// listener to check if the inserted URL is correct
source.addEventListener("error", function () {
    window.alert("Error: the video link is wrong!")
});

// Mirroring the video in a canvas
var mCanvas = document.getElementById('mirroredCanvas');
var context = mCanvas.getContext('2d');

video.addEventListener('loadedmetadata', function () {
    mCanvas.width = 150;
    mCanvas.height = 100
});

// listener to put in the proper canvas the mirrored frames of video when it is played
video.addEventListener('play', function () {
    var $this = this;
    (function loop() {
        if (!$this.paused && !$this.ended) {
            context.save();
            context.scale(-1, 1);
            context.drawImage($this, 0, 0, mCanvas.width * -1, mCanvas.height);
            context.restore();
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
    })();
}, 0);

var labelComment = document.getElementById("labelComment");
var commentInput = document.getElementById("commentInput");
var commentButton = document.getElementById("commentButton");
// if user is authenticated show comment and hide button to login
if (presentInformation())
    loadComments();

// loads already presents comments
function loadComments() {
    console.log("present")
    commentButton.style.display = "none";
    labelComment.style.display = "block";
    commentInput.style.display = "block";
    addCommentButton.style.display = "block";
    let numberComments = myStorage.getItem("numberComments");
    console.log(numberComments);

    for (let i = 0; i < numberComments; i++) {
        let commentToLoad = myStorage.getItem(i.toString());

        let splitted = commentToLoad.split(',');
        let c = splitted[0];
        let u = splitted[1];
        let d = splitted[2];
        let city = splitted[3];
        let country = splitted[4];
        let userAndDate = u + ", " + d;
        showComment(c, userAndDate, city + ", " + country);
    }
}

var commentKey = 0;

// retrieve number of comments if any
if (myStorage.getItem("numberComments"))
    commentKey = Number(myStorage.getItem("numberComments"));

// save the comment and update the number of comments
var addCommentButton = document.getElementById("addComment");
addCommentButton.addEventListener("click", function (e) {
    if (!commentInput.value)
        window.alert("Insert comment please");
    else {
        let commentStr = commentInput.value + "," + firstName + " " + lastName + "," + dateStr() + "," + getCityCountry();
        let userAndDate = firstName + " " + lastName + ", " + dateStr();
        saveComment(commentStr);
        showComment(commentInput.value, userAndDate, getCityCountry());
        commentInput.value = "";
    }
});

// loop to attach the listeners to the videos of the jukebox
for (let i = 1; i <= 3; i++) {
    let id = "video" + i.toString();
    let video1 = document.getElementById(id);
    video1.addEventListener("mouseover", function () {
        video1.play();
    });

    var startTime = video1.currentTime;
    video1.addEventListener('timeupdate', (event) => {
        let sec = Math.floor(video1.currentTime);

        if ((sec - startTime) === 5)
            video1.currentTime = 0;
    });

    video1.addEventListener("mouseout", function () {
        video1.pause();
    });

    video1.addEventListener("click", function () {
        n = i - 1;
        console.log(n)
        insertVideoJukebox(video1);
        video1.pause();
    });
}

var videoJukebox = document.getElementById("mainVideoJukebox")
var firstVideo = document.getElementById("video1");
// insert the first video in the jukebox
insertVideoJukebox(firstVideo);

// listener to play the next video when one ends
videoJukebox.addEventListener("ended", function () {
    n += 1;
    let x = n % 3 + 1;
    console.log(x)
    let v = document.getElementById("video" + x.toString());
    insertVideoJukebox(v);
});

