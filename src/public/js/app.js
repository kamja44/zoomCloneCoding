const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.appendChild(li);
});

socket.addEventListener("close",() => {
    console.log("DisConnected from server");
});
function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value="";
}
messageForm.addEventListener("submit", handleSubmit);
function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value)); 
}
nickForm.addEventListener("submit", handleNickSubmit); 