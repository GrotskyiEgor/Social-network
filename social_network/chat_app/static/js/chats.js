let chatSocket = null
let selectedImages = []

const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken

let chatsMessagesSentinel
const chatContainer = document.getElementById('chat_container')
const emptyChatContainer = document.getElementById("empty_chat_conteiner")
let selectChatId = getCookie('chatId')

if (selectChatId){
    console.log(1, selectChatId)
    connectWebSocket(selectChatId)
    // updateUnreadData()
    joinToChat(selectChatId)
}

$(document).on('change', '#message_images_input', function(){
    selectedImages.push(...Array.from(this.files))

    renderImagesPreview()
    this.value = ''
})

function renderImagesPreview() {
    const msgInput = document.getElementById('chat_input')

    let imgsContainer = document.getElementById('preview_images')

    if (!imgsContainer){
        imgsContainer = document.createElement('div')
        imgsContainer.className = 'preview-images'
        imgsContainer.id = 'preview_images'
    } else {
        imgsContainer.innerHTML = ''
    }

    selectedImages.forEach((file, index) => {
        const imageUrl = URL.createObjectURL(file)

        imgsContainer.innerHTML += `
            <div class="preview-item" onclick="removeImage(${index})">
                <img src="${imageUrl}" class="preview-img">
            </div>
        `
    })

    msgInput.before(imgsContainer)
}

function removeImage(index) {
    selectedImages.splice(index, 1)

    if (selectedImages.length <= 0) {
        let imgsContainer = document.getElementById('preview_images')
        imgsContainer.remove()
    } else {
        renderImagesPreview()
    }
}

$(document).on("click", '.message-user-block', function(){
    $(emptyChatContainer).remove()
    console.log(2, this.dataset.chatId)
    connectWebSocket(this.dataset.chatId);
    // updateUnreadData()
    
    let lastChatId = getCookie('chatId')
    leaveFromChat(lastChatId)
    joinToChat(this.dataset.chatId)
})

$(document).on("click", ".open-chat-with", async function(){
    await openChatWithUser(
        this.dataset.userId,
        this.dataset.chatUsername,
    );
})

$(document).on('click', '#message_form_btn', function(){
    send_message()
})

$(document).on("submit", "#message_form", function(event){
    event.preventDefault()
    send_message()
})

$(document).on('click', ".message-image-triger", function(){
    const messageImagesInput = document.getElementById('message_images_input')
    messageImagesInput.click()
})

function getSelectImages() {
    // const messageImagesInput = document.getElementById('message_images_input')
    // return Array.from(messageImagesInput.files);
    return selectedImages
}

async function send_message(){
    const formIntput = document.getElementById('message_form_input')
    const messageImagesInput = document.getElementById('message_images_input')
    inputMessage = formIntput.value.trim()
    hasImages = getSelectImages().length > 0

    if (!inputMessage && !hasImages) return;

    if (hasImages) {
        const data = await sendMessageWithImages(inputMessage)
        
        if (!data.success) return;

        formIntput.value = '';
        messageImagesInput.value = ""; 
    }


    if (!hasImages){
        chatSocket.send(JSON.stringify({ messageText: inputMessage }))
        formIntput.value = ''
    }
}

async function sendMessageWithImages(text) {
    const selectChatId = getCookie('chatId')
    const formData = new FormData();
    formData.append("text", text);
    
    getSelectImages().forEach((image) => {
        formData.append("images", image)
    });

    const response = await fetch(`/chats/upload_images/${selectChatId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: formData,
    });

    console.log('img response.success', response.ok, response)
    if (response.ok) {
        selectedImages = []

        const preview = document.getElementById('preview_images')
        if (preview) {
            preview.remove()
        }
    }

    return response.json();
}

async function openChatWithUser(userId, username) {
    const response = await fetch(`/chats/chat_with/${userId}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
    });

    const data = await response.json();

    console.log(data)

    if (data.success) {
        if (data.chats_html.trim() !== ''){
            chatsSentinel.insertAdjacentHTML("beforebegin", data.chats_html)
            let chatsContainer = document.getElementById('chats_container')

            chatsContainer.scrollTo({
                top: chatsContainer.scrollHeight,
                behavior: 'smooth'
            });
        }

        $(emptyChatContainer).remove()
        console.log(3, data.chat_id)
        connectWebSocket(data.chat_id);
    }
}

let messagesLoading = false
let messagesCurrentPage = 0

function connectWebSocket(chatId) {
    if (chatSocket) {
        chatSocket.close();
    }

    if (chatId === undefined || chatId === null){
        console.log('not have chat id', chatId)
        return
    }

    chatSocket = new WebSocket(`ws://${window.location.host}/chat_chanel/${chatId}/`)
    setCookie("chatId", chatId)

    chatSocket.onmessage = function (event) {
        let data = JSON.parse(event.data)
        
        console.log('WEBSOCKET -', data.type)
        if (data.type === 'connection_confirmation'){
            chatContainer.innerHTML = ''
            chatContainer.insertAdjacentHTML("afterbegin", data.chat_messages_html) 
            let chatDiv = document.getElementById('chat_message_container')
            getOnlineUsers(data.friends_ids)
  
            chatDiv.scrollTo({
                top: chatDiv.scrollHeight
            });

            messagesLoading = false
            messagesCurrentPage = 1
            initMessagesObserver()
        } else if (data.type === 'chat_message'){
            let chatDiv = document.getElementById('chat_message_container')

            socket.emit('sendMessage', {chatId: selectChatId, text: data.input_message, commit: false, messageId: data.message_id, messageImages: data.message_images})
            chatDiv.innerHTML += data.msg_html

            chatDiv.scrollTo({
                top: chatDiv.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
}

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

document.addEventListener('load', function(event) {
    if (event.target.tagName === 'IMG' && event.target.classList.contains('load-message-image')) {
        let chatDiv = document.getElementById('chat_message_container')

        chatDiv.scrollTo({
            top: chatDiv.scrollHeight,
            behavior: 'smooth'
        })
    }
}, true)

document.addEventListener('load', function(event) {
    if (event.target.tagName === 'IMG' && event.target.classList.contains('load-message-image')) {
        let chatDiv = document.getElementById('chat_message_container')
        this.alt = 'loading error'

        chatDiv.scrollTo({
            top: chatDiv.scrollHeight,
            behavior: 'smooth'
        })
    }
}, true)