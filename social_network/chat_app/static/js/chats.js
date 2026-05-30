let chatSocket = null;

const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken
const chatTitle = document.querySelector("#chat-title");

$(document).on("click", '.message-user-block', function(){
    chatTitle.textContent = `Чат з ${this.dataset.username ? this.dataset.username : this.dataset.gropname}`;
    document.getElementById('chat-under-title').innerHTML = ''
    // connectWebSocket(this.dataset.chatId);
});

$(document).on("click", ".open-chat-with", async function(){
    await openChatWithUser(
        this.dataset.userId,
        this.dataset.chatUsername,
    );
});


async function openChatWithUser(userId, username) {
    const response = await fetch(`/chats/chat_with/${userId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
    });

    const data = await response.json();
    if (data.success) {

        if (data.chats_html){
            chatsSentinel.insertAdjacentHTML("beforebegin", data.chats_html)
        }

        chatTitle.textContent = `Чат з ${username}`;
        document.getElementById('chat-under-title').innerHTML = ''
        // connectWebSocket(data.chat_id);
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