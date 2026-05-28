let chatSocket = null;

const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken
const chatTitle = document.querySelector("#chat-title");

const chatBlocks = document.querySelectorAll('.message-user-block') 
const chatButtons = document.querySelectorAll(".followers-user-block");

chatBlocks.forEach((chat) => {
    chat.addEventListener("click", function(){
        console.log(this.dataset.username)
        chatTitle.textContent = `Чат з ${this.dataset.username}`;
        // connectWebSocket(this.dataset.chatId);
    });
});

chatButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        await openChatWithUser(
            button.dataset.userId,
            button.dataset.chatUsername,
        );
    });
});

async function openChatWithUser(userId, username) {
    const response = await fetch(`/chats/chat_with/${userId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
    });

    const data = await response.json();
        if (data.success) {
            chatTitle.textContent = `Чат з ${username}`;
            connectWebSocket(data.chat_id);
    }
}

function connectWebSocket(chatId) {
    if (chatSocket) {
        chatSocket.close();
    }

    chatSocket = new WebSocket(`ws://${window.location.host}/chat/${chatId}/`);

    chatSocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(data);
    };
}