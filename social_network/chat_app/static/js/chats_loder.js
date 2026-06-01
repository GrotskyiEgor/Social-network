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
}, {rootMargin: "50px"})

friendsОbeserve.observe(friendsSentinel)

let chatsCurrentPage = 1;
let chatsisLoading = false;

const chatsSentinel = document.getElementById('chats_loader')

const chatsObeserve = new IntersectionObserver(async (entries)=>{
    if (entries[0].isIntersecting && chatsisLoading === false){
        chatsisLoading = true
        chatsCurrentPage += 1
        
        const response = await fetch (
            `${window.location.pathname}?page=${chatsCurrentPage}&selection=${chatsSentinel.dataset.selection}`, {
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
}, {rootMargin: "50px"})

chatsObeserve.observe(chatsSentinel)
