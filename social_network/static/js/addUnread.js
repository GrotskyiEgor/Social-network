const headerUnreadCount = document.querySelector("#headerUnreadCount");
const personalUnreadCount = document.querySelector("#personalUnreadCount");
const groupUnreadCount = document.querySelector("#groupUnreadCount");

function unreadText(count) {
    if (count == 0) {
        return "";
    }

    return `(${count})`;
}

function setUnreadText(element, count) {
    if (element) {
        element.textContent = unreadText(count);
    }
}

function updateChatButton(chat) {
    const button = document.querySelector(`[data-chat-id="${chat.id}"]`);

    if (!button) {
        return;
    }

    const lastMessage = button.querySelector(".chat-button-last");

    if (lastMessage) {
        lastMessage.textContent = chat.last;
    }

    if (chat.unread > 0) {
        button.classList.add("chat-has-unread");
    }

    if (chat.unread == 0) {
        button.classList.remove("chat-has-unread");
    }
}

function showUnreadData(data) {
    setUnreadText(headerUnreadCount, data.total);
    setUnreadText(personalUnreadCount, data.personal_total);
    setUnreadText(groupUnreadCount, data.group_total);

    data.chats.forEach((chat) => {
        updateChatButton(chat);
    });
}

const unreadSocket = new WebSocket(`ws://${window.location.host}/chat/unread/`);

unreadSocket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    showUnreadData(data);
};

function updateUnreadData() {
    if (unreadSocket.readyState == WebSocket.OPEN) {
        unreadSocket.send("{}");
    }
}

window.updateUnreadData = updateUnreadData;
