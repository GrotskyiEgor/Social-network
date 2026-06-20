const authToken = localStorage.getItem('authToken');

const socket = io("http://192.168.0.125:8020", {
    auth: {
        token: `Bearer ${authToken}`
    },
    transports: ["websocket"],
    autoConnect: true
});

async function joinToChat(chatId) {
    socket.emit("joinChat", { chatId: chatId}, (response) => {
        console.log("connected", response.status)
        startListeningMessages();
    })
}

function startListeningMessages() {
    socket.off("newChatMessage", newMessage);
    socket.on("newChatMessage", newMessage);
    console.log("Прослушивание новых сообщений успешно запущено.");
}
  
function newMessage(data) {
    console.log("got message:", data);

    if (data.sender.id == Number(myId)) return

    let chatDiv = document.getElementById('chat_message_container')

    if (data.text){
        chatDiv.innerHTML += `
            <div class="msg-container">
                <img class="message-image msg-image online-img-${data.senderId}" src="${offlineImg}" alt="indicator">
    
                <div class="msg-info content-border-container">
                    <div class="msg-info-text">
                        <p class="msg-username-text">${ data.sender.profile.pseudonym }</p>
                        <div class="msg-text">${ data.text }</div>
                    </div>
                    <div class="msg-info-date">
                        <p class="msg-date-text">${ data.createdAt }</p>
                        <img class="msg-img" src="{% static 'images/msg/open.svg' %}" alt="open" >
                    </div>
                </div>
            </div>
        `
    }

    let imageHtml = ''
    for (let image of data.messageImages){
        imageHtml += `<img class="send-message-image-other load-message-image" src="http://192.168.0.125:8020/media/${ image.image }" alt="img"></img>`
    }
    chatDiv.innerHTML += imageHtml

    chatDiv.scrollTo({
        top: chatDiv.scrollHeight,
        behavior: 'smooth'
    });
}