$(document).on('click', '.checkbox', function(){
    let status = this.dataset.checkbox
    if (status === 'false'){
        this.dataset.checkbox = 'true'
        this.src = trueCheckbox
    } else if (status === 'true'){
        this.dataset.checkbox = 'false'
        this.src = falseCheckbox
    }
})

$(document).on('click', '.del-user', function(){
    $(document.getElementById('user_' + this.dataset.delUser)).remove()
    deactiveteCheckBox(this.dataset.delUser)
})

function clearCheckbox(){
    document.querySelectorAll('.checkbox').forEach(checkbox =>{
        checkbox.dataset.checkbox = 'false'
        checkbox.src = falseCheckbox
    })   
}

function activeCheckBox(){
    activeCheckBoxArray = []
    document.querySelectorAll('.checkbox').forEach(checkbox =>{
        if (checkbox.dataset.checkbox === 'true') {
            activeCheckBoxArray.push(checkbox)
        }
    })
    
    return activeCheckBoxArray
}

function deactiveteCheckBox(id){
    checkbox = document.getElementById('checkbox_' + id)
    checkbox.dataset.checkbox = 'false'
    checkbox.src = falseCheckbox
}

$(document).on('click', '#next_add_group_modal', function(event){
    event.preventDefault()
    openModal('modal-create-group-bg')
    closeModal('modal-add-group-bg')

    
    deleteUsersContainer = document.getElementById('delete_users_container')
    activeCheckBox().forEach(checkbox => {
        deleteUsersContainer.innerHTML += `
            <div class="followers-user-block" id=user_${checkbox.dataset.profileId}>
                <div class="followers-container-image-container">
                    <img class="followers-image" src=${indicatorImg} alt="">
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
    createGroup()
})

$(document).on('click', '#open_add_group_modal', function(){
    openModal('modal-add-group-bg')
})

$(document).on('click', '#cansle_add_group_modal', function(){
    clearCheckbox()
    closeModal('modal-add-group-bg')
})

function openModal(modalClass){
    $(`.${modalClass}`).removeClass('hidden');
    $(`.${modalClass}`).addClass('visible');
};

function closeModal(modalClass){
    $(`.${modalClass}`).addClass('hidden');
    $(`.${modalClass}`).removeClass('visible');
};

async function createGroup() {
    const formData = new FormData();
    console.log('document.getElementById().value', document.getElementById('group_name_input').value)
    formData.append("name", document.getElementById('group_name_input').value);
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
        if (checkbox.dataset.checkbox === 'true') {
            formData.append("users", checkbox.dataset.profileId);
        }
    });

    const response = await fetch("/chats/create_group/", {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: formData,
    });

    const data = await response.json();
    console.log(data)
}