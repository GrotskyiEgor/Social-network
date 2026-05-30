let friendscurrentPage = 1;
let friendsisLoading = false;

const friendsSentinel = document.getElementById('friends_loader')

const friendsОbeserve = new IntersectionObserver(async (entries)=>{
    if (entries[0].isIntersecting && friendsisLoading === false){
        friendsisLoading = true
        friendscurrentPage += 1
        
        const response = await fetch (
            `${window.location.pathname}?page=${friendscurrentPage}&selection=${friendsSentinel.dataset.selection}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
        )

        const objectRespone = await response.json()

        if (objectRespone.friends_html){
            friendsSentinel.insertAdjacentHTML("beforebegin", objectRespone.friends_html)
        }

        if (!objectRespone.has_next){
            friendsОbeserve.disconnect()
        }

        friendsisLoading = false
    }
}, {rootMargin: "750px"})

friendsОbeserve.observe(friendsSentinel)

let chatscurrentPage = 1;
let chatsisLoading = false;

const chatsContainer = document.getElementById('chats_container')
const chatsSentinel = document.getElementById('chats_loader')

const chatsObeserve = new IntersectionObserver(async (entries)=>{
    if (entries[0].isIntersecting && chatsisLoading === false){
        chatsisLoading = true
        chatscurrentPage += 1
        
        const response = await fetch (
            `${window.location.pathname}?page=${chatscurrentPage}&selection=${chatsSentinel.dataset.selection}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
        )

        const objectRespone = await response.json()

        if (objectRespone.chats_html){
            chatsSentinel.insertAdjacentHTML("beforebegin", objectRespone.chats_html)
        }

        if (!objectRespone.has_next){
            chatsObeserve.disconnect()
        }

        chatsisLoading = false
    }
}, {rootMargin: "750px"})

chatsObeserve.observe(chatsSentinel)