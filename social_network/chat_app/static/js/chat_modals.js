let selectedUsers = []

$(document).on('click', '.checkbox', function(){
    let status = this.dataset.checkbox
    let id = String(this.dataset.profileId)

    if (status === 'false'){
        this.dataset.checkbox = 'true'
        this.src = trueCheckbox

        if (!selectedUsers.includes(id)) {
            selectedUsers.push(id)
        }
    } else if (status === 'true'){
        this.dataset.checkbox = 'false'
        this.src = falseCheckbox

        selectedUsers = selectedUsers.filter(checkbox => checkbox !== id);
    }
})

$(document).on('click', '.del-user', function(){
    $(document.getElementById('user_' + this.dataset.delUser)).remove()
    deactiveteCheckBox(this.dataset.delUser)
})

function clearCheckbox(){
    selectedUsers = []

    document.querySelectorAll('.checkbox').forEach(checkbox =>{
        checkbox.dataset.checkbox = 'false'
        checkbox.src = falseCheckbox
    })   
}

function activeCheckBox(){
    let activeCheckBoxArray = []
    document.querySelectorAll('.checkbox').forEach(checkbox =>{
        if (checkbox.dataset.checkbox === 'true') {
            activeCheckBoxArray.push(checkbox)
        }
    })
    
    return activeCheckBoxArray
}

function deactiveteCheckBox(id){
    let checkbox = document.getElementById('checkbox_' + id)

    if (checkbox) {
        checkbox.dataset.checkbox = 'false'
        checkbox.src = falseCheckbox

        return
    } else {
        checkbox = document.getElementById('edit_checkbox_' + id)

        checkbox.dataset.checkbox = 'false'
        checkbox.src = falseCheckbox

        return
    }

}

$(document).on('click', '#next_add_group_modal', function(event){
    event.preventDefault()
    openModal('modal-create-group-bg')
    closeModal('modal-add-group-bg')

    
    deleteUsersContainer = document.getElementById('delete_users_container')
    deleteUsersContainer.innerHTML = ''
    activeCheckBox().forEach(checkbox => {
        deleteUsersContainer.innerHTML += `
            <div class="followers-user-block" id=user_${checkbox.dataset.profileId}>
                <div class="followers-container-image-container">
                    <img class="followers-image online-img-${checkbox.dataset.profileId}" src=${indicatorImg} alt="">
                </div>
                <div class="user-block-info">
                    <p class="user-block-username">${checkbox.dataset.username}</p>
                    <img src=${deleteImg} alt="del" class="del-img del-user" data-del-user=${checkbox.dataset.profileId}>
                </div>
            </div>
        `
    })
})

$(document).on('click', '#cansle_create_group_modal', function(){
    deleteUsersContainer = document.getElementById('delete_users_container').innerHTML = ''

    openModal('modal-add-group-bg')
    closeModal('modal-create-group-bg')
})

$(document).on('click', '#create_group_btn', async function(){
    createGroup(edit=false)
})

$(document).on('click', '#open_add_group_modal', function(){
    openModal('modal-add-group-bg')
})

$(document).on('click', '#cansle_add_group_modal', function(){
    clearCheckbox()
    closeModal('modal-add-group-bg')
})

async function createGroup(edit) {
    const formData = new FormData();
    formData.append("name", document.getElementById('edit_group_name_input').value);

    selectedUsers.forEach((id) => {
        formData.append("users", id);
    });

    const response = await fetch(edit ? `/chats/edit_group/${selectChatId}/`: `/chats/create_group/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: formData,
    });

    const data = await response.json();
    // console.log(data)
    clearCheckbox()

    closeModal('modal-add-group-bg')
    closeModal('modal-create-group-bg')

    closeModal('modal-edit-add-group-bg')
    closeModal('modal-edit-create-group-bg')

    if (data.chat_html){
        document.getElementById('groups_loader').insertAdjacentHTML("beforeend", data.chat_html);
    } else if (data.group_html) {
        chatContainer.innerHTML = ''
        chatContainer.insertAdjacentHTML("afterbegin", data.group_html) 
        let chatDiv = document.getElementById('chat_message_container')

        chatDiv.scrollTo({
            top: chatDiv.scrollHeight
        });

        messagesLoading = false
        messagesCurrentPage = 1
        initMessagesObserver()
    }
}