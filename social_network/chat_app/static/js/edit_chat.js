$(document).on('click', '.clear-chat', clearChat)

$(document).on('click', '.close-context-menu', ()=>{
    closeModalId('context_menu_admin')
    closeModalId('context_menu_user')
})

$(document).on('click', function(event) {
    if (!$(event.target).closest('.context-menu-admin').length) {
        closeModalId('context_menu_admin')
    }

    if (!$(event.target).closest('.context-menu-user').length) {
        closeModalId('context_menu_user')
    } 
})

$(document).on('click', '.context-menu-admin-interactive', function(event){
    event.stopPropagation();

    openModalId('context_menu_admin')
    
    const contextMenu = $('#context_menu_admin');
    contextMenu.css({
        top: event.pageY + 20 + 'px',
        left: event.pageX - ( contextMenu.width() / 2 ) + 'px'
    })
})

$(document).on('click', '.context-menu-interactive ', function(event){
    event.stopPropagation();

    openModalId('context_menu_user')

    const contextMenu = $('#context_menu_user');
    contextMenu.css({
        top: event.pageY + 20 + 'px',
        left: event.pageX - ( contextMenu.width() / 2 ) + 'px'
    })
})

function clearChat(){
    clearCookie(["chatId"])
    document.getElementById('chat_container').innerHTML = `
        <div class="empty-chat-conteiner" id="empty_chat_conteiner">
            <p class="empty-chat-title">Почніть нове спілкування</p>
            <p class="empty-chat-text">Оберіть контакт зі списку ліворуч або створіть групу, щоб почати спілкування</p>
        </div>
    `
}