const onlineCache = new Map()
const onlineSocket = new WebSocket(`ws://${window.location.host}/chat/online/`);

onlineSocket.onmessage = function (event) {
    const data = JSON.parse(event.data)
    onlineCache.set(data.user_id, data.status)

    setUserOnline(data.user_id, data.status)
}

function setUserOnline(userId, status) {
    document.querySelectorAll(`.online-img-${userId}`).forEach((avatar) => {
        if (status === "offline") {
            avatar.src = offlineImg
        } else if (status === "online") {
            avatar.src = onlineImg
        }
    })
}

const observer = new MutationObserver(() => {
    requestAnimationFrame(() => {
        onlineCache.forEach((status, userId) => {
            setUserOnline(userId, status)
        })
    })
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})