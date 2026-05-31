let chatSocket = null;

const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken

const chatContainer = document.getElementById('chat_container')
const emptyChatContainer = document.getElementById("empty_chat_conteiner")

$(document).on("click", '.message-user-block', function(){
    $(emptyChatContainer).remove()
    connectWebSocket(this.dataset.chatId);
});

$(document).on("click", ".open-chat-with", async function(){
    await openChatWithUser(
        this.dataset.userId,
        this.dataset.chatUsername,
    );
});
$
$(document).on('click', '#message_form_btn', function(){
    send_message()
})

$(document).on("submit", "#message_form", function(event){
    event.preventDefault()

    send_message()
})

function send_message(){
    const formIntput = document.getElementById('message_form_input')
    inputMessage = formIntput.value.trim()
    
    if (inputMessage){
        chatSocket.send(JSON.stringify({ messageText: inputMessage }));
        formIntput.value = ''
    }
}

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

        $(emptyChatContainer).remove()
        connectWebSocket(data.chat_id);
    }
}

function connectWebSocket(chatId) {
    if (chatSocket) {
        chatSocket.close();
    }

    chatSocket = new WebSocket(`ws://${window.location.host}/chat_chanel/${chatId}/`);

    chatSocket.onmessage = function (event) {
        let data = JSON.parse(event.data);

        console.log('do' ,data.type)
        if (data.type === 'connection_confirmation'){
            console.log('connection_confirmation')
            chatContainer.innerHTML = ''
            chatContainer.insertAdjacentHTML("afterbegin", data.chat_messages_html) 
        } else if (data.type === 'chat_message'){
            console.log('sender', data.sender)
            document.getElementById('chat_message_container').innerHTML += data.msg_html
        }
    };
}