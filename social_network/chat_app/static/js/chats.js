let chatSocket = null;

const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken

let chatsMessagesSentinel
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
            let chatsContainer = document.getElementById('chats_container')

            chatsContainer.scrollTo({
                top: chatsContainer.scrollHeight,
                behavior: 'smooth'
            });
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
        
        console.log('WEBSOCKET -', data.type)
        if (data.type === 'connection_confirmation'){
            chatContainer.innerHTML = ''
            chatContainer.insertAdjacentHTML("afterbegin", data.chat_messages_html) 
            let chatDiv = document.getElementById('chat_message_container')
  
            chatDiv.scrollTo({
                top: chatDiv.scrollHeight
            });

            let messagesLoading = false
            let messagesCurrentPage = 1
            initMessagesObserver()
        } else if (data.type === 'chat_message'){
            let chatDiv = document.getElementById('chat_message_container')
            chatDiv.innerHTML += data.msg_html

            chatDiv.scrollTo({
                top: chatDiv.scrollHeight,
                behavior: 'smooth'
            });
        }
    };
}

let messagesLoading = false
let messagesCurrentPage = 1

const messagesObeserve = new IntersectionObserver(async (entries)=>{
    if (entries[0].isIntersecting && messagesLoading === false){
        messagesLoading = true
        messagesCurrentPage += 1
        
        const response = await fetch (
            `${window.location.pathname}?page=${messagesCurrentPage}&selection=${chatsMessagesSentinel.dataset.selection}&chat_id=${chatsMessagesSentinel.dataset.chatId}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
        )

        const objectRespone = await response.json()

        if (objectRespone.messages_html){
            const chatDiv = document.getElementById('chat_message_container');
            const oldHeight = chatDiv.scrollHeight;
            chatsMessagesSentinel.insertAdjacentHTML("afterend", objectRespone.messages_html)

            const newHeight = chatDiv.scrollHeight;
            chatDiv.scrollTop += newHeight - oldHeight;
        }

        if (!objectRespone.has_next){
            messagesObeserve.unobserve(chatsMessagesSentinel)
        }

        messagesLoading = false
    }
}, {rootMargin: "50px"})

function initMessagesObserver(){
    if (chatsMessagesSentinel){
        messagesObeserve.unobserve(chatsMessagesSentinel)
    }

    chatsMessagesSentinel = document.getElementById('chats_msg_loader')

    if (chatsMessagesSentinel){
        messagesObeserve.observe(chatsMessagesSentinel)
    }
}