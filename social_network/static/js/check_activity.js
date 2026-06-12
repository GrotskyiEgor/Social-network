let activeWebSocket = null

function connectWebSocketActive(profileId) {
    if (activeWebSocket) {
        activeWebSocket.close();
    }
    
    if (isAuthenticated === "True"){

        activeWebSocket = new WebSocket(`ws://${window.location.host}/is_active/${profileId}/`);

        activeWebSocket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            
            console.log('WEBSOCKET IS ACTIVE-', data.type, data.message)
        };
    }
}

setTimeout(() => {
    connectWebSocketActive(profileId)
}, 3000);