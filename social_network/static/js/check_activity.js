let activeWebSocket = null

function connectWebSocket(profileId) {
    if (activeWebSocket) {
        activeWebSocket.close();
    }

    if (isAuthenticated){

        activeWebSocket = new WebSocket(`ws://${window.location.host}/is_active/${profileId}/`);

        activeWebSocket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            
            console.log('WEBSOCKET -', data.type, data.message)
        };
    }
}

setTimeout(() => {
    connectWebSocket(profileId)
}, 3000);