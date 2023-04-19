let username = false; //state of the username
let email = false; //state of the email
let password = false; //state of the password

//sets the element's border to green
function setGreen(element) {
    document.querySelector(element).style.borderColor = "green";
}

//sets the element's border to red
function setRed(element) {
    document.querySelector(element).style.borderColor = "red";
}

//validates the username
function checkUsername() {
    let currentValue = document.querySelector("#username").value.trim();
    reset();
    if (currentValue.length >= 3) {
        username = true;
        setGreen("#username");
    }
    else {
        username = false;
        setRed("#username");
    }
}

//validates the email using regex
function checkEmail() {
    let currentValue = document.querySelector("#email").value.trim();
    reset();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentValue)) {
        email = true;
        setGreen("#email");
    }
    else {
        email = false;
        setRed("#email");
    }
}

//validates the password using regex
function checkPassword() {
    let currentValue = document.querySelector("#password").value.trim();
    reset();
    if (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(currentValue)) {
        password = false;
        setRed("#password");
    } else {
        password = true;
        setGreen("#password");
    }
}

//Controls the button's movement. Used a mixture of jQuery and normal javascript DOM
$(document).ready(function () {
    $(".submit").mousemove(function (event) { //when the mouse moves over the button (or clicks)
        let submitButton = document.querySelector("button"); //get the button
        let buttonCont = document.querySelector(".submit-cont"); //get the button container
        submitButton.style.transform = "translateX(0)"; //remove the style centering the button as a transform
        if (email && password && username) { //if all inputs are valid
            submitButton.style.left = "50%"; //center the button
            submitButton.style.transform = "translateX(-50%)"; //center the button
            submitButton.style.backgroundColor = "rgb(151, 241, 151)"; //change the background color to light green
            document.querySelector("#none").id = "confetti"; //activate the button to be ready for the confetti
            let confetti = new Confetti("confetti"); //set up the button as the confetti trigger
            confetti.setCount(100);
            confetti.setSize(2);
            confetti.setPower(50);
            confetti.setFade(true);
            confetti.destroyTarget(false);
        }
        else { //if there is at least one invalid input
            submitButton.style.backgroundColor = "rgb(243, 174, 174)"; //change the button's background color to red
            let leftBoundary = $(".submit-cont").offset().left; //get the left position of the container
            let rightBoundary = leftBoundary + buttonCont.offsetWidth; //get the right position of the container
            let buttonWidth = submitButton.offsetWidth; //get the width of the button

            let positionX = event.pageX; //get the mouse position

            if ((positionX - leftBoundary) < (buttonWidth + 2)) { //if the space between the mouse and the left boundary is less than the width of the button
                submitButton.style.right = "unset"; //unset the right property
                let distance = rightBoundary - positionX - buttonWidth; //get a random distance to use as a placement
                submitButton.style.left = `${positionX - leftBoundary + Math.floor(Math.random() * distance)}px`; //move the button to the right of the cursor
            }
            else { //otherwise
                submitButton.style.left = "unset"; //unset the left property
                let distance = positionX - leftBoundary - buttonWidth; //get a random distance to use as a placement
                submitButton.style.right = `${rightBoundary - positionX + Math.floor(Math.random() * distance)}px`; //move the button to the left
            }
        }
    })
})

function congrats(event) {
    event.preventDefault(); //stop the page from reloading
    document.querySelector(".congrats").style.display = "block"; //display the congrats message
}

function reset() {
    document.querySelector(".congrats").style.display = "none"; //hide the congrats message
    if(document.querySelector("#confetti")){
        document.querySelector("#confetti").id = "none"; //unset the button as the confetti trigger
    }
}