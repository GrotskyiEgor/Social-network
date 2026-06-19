const authToken = localStorage.getItem('authToken');

const socket = io("http://192.168.0.125:8081", {
    auth: {
        token: `Bearer ${authToken}`
    },
    transports: ["websocket"],
    autoConnect: true
});

async function joinToChat(chatId) {
    socket.emit("joinChat", { chatId: chatId}, (response) => {
        console.log("connected", socket.id)
        console.log('response', response)
    })
    
    socket.on("newChatMessage", (data) => {
        console.log("got message:", data);

        let chatDiv = document.getElementById('chat_message_container')

        chatDiv.innerHTML += `
            <div class="msg-container">
                <img class="message-image msg-image online-img-${data.msg.sender.username.id}" src="${offlineImg}" alt="indicator">

                <div class="msg-info content-border-container">
                    <div class="msg-info-text">
                        <p class="msg-username-text">${ data.msg.sender.username }</p>
                        <div class="msg-text">${ data.msg.text }</div>
                    </div>
                    <div class="msg-info-date">
                        <p class="msg-date-text">${ data.msg.created_at }</p>
                        <img class="msg-img" src="{% static 'images/msg/open.svg' %}" alt="open" >
                    </div>
                </div>
            </div>
        `
        
        // {% for image_obj in msg.images.all %}
        //     <img class="send-message-image-other load-message-image" src="http://192.168.0.125:8081/media/thumb/{{ image_obj.image }}" alt="img">
        // {% endfor %}

        chatDiv.scrollTo({
            top: chatDiv.scrollHeight,
            behavior: 'smooth'
        });
    })
}
  