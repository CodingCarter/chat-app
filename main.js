document.addEventListener('DOMContentLoaded', function() {

document.querySelector('.popup button').addEventListener('click', function() {
document.querySelector('.popup').style.display = "none";

const form = document.querySelector("form");
const input = document.querySelector(".input-message");
const messages = document.querySelector(".messages");
var username = document.querySelector('.input-username').value;//prompt("Please enter a nickname: ", "")
const socket = io('/', {transports: ['websocket'],upgrade:false});

function randomNumbers(max, len) { var str = ''; for (var i = len-1; i >= 0; i--) { str += Math.floor(Math.random() * Math.floor(max)); } return str; }

if (username == '' || username == ' ') {
    username = 'Guest' + randomNumbers(9, 4)
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addMessage(`<h2>You:</h2><p>${input.value}</p>`);
    socket.emit("chat_message", {
        message: input.value
    });
    input.value = "";
    return false;
}, false);

socket.on("chat_message", function(data) {
    addMessage(`<h2>${data.username}:</h2><p>${data.message}</p>`);
});

socket.on("user_join", function(data) {
    addMessage(`<h2>Server:</h2><p>${data} joined the chat!</p>`);
});

socket.on("user_leave", function(data) {
    addMessage(`<h2>Server:</h2><p>${data} left the chat!</p>`);
});

addMessage(`<h2>Server:</h2><p>Welcome to the chat, ${username}!</p>`);

socket.emit("user_join", username);

function addMessage(message) {
    messages.innerHTML += `<li>${message}</li>`;
    document.querySelector('ul').scrollTo(0, document.querySelector('ul').scrollHeight);
}

});

});
