$(document).on('click', '.clear-chat', clearChat)

let openContextMenu = false

$(document).on('click', function(event) {
    if (openContextMenu){
        if (!$(event.target).closest('.context-menu-admin').length) {
            closeModalId('context_menu_admin')
        }

        if (!$(event.target).closest('.context-menu-гыук').length) {
            closeModalId('context_menu_user')
        }

        openContextMenu = false
    }
});

$(document).on('click', '.context-menu-admin-interactive', function(event){
    event.stopPropagation();

    openModalId('context_menu_admin')
    
    const contextMenu = $('#context_menu_admin');
    contextMenu.css({
        top: event.pageY + 20 + 'px',
        left: event.pageX - ( contextMenu.width() / 2 ) + 'px'
    });
    openContextMenu = true
})

$(document).on('click', '.context-menu-interactive ', function(event){
    event.stopPropagation();

    openModalId('context_menu_user')

    const contextMenu = $('#context_menu_user');
    contextMenu.css({
        top: event.pageY + 20 + 'px',
        left: event.pageX - ( contextMenu.width() / 2 ) + 'px'
    });
    openContextMenu = true
})

function clearChat(){
    document.getElementById('chat_container').innerHTML = `
        <div class="empty-chat-conteiner" id="empty_chat_conteiner">
            <p class="empty-chat-title">Почніть нове спілкування</p>
            <p class="empty-chat-text">Оберіть контакт зі списку ліворуч або створіть групу, щоб почати спілкування</p>
        </div>
    `
}