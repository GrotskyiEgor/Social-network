$(document).on('click', '#open_add_group_modal', function(){
    openModal('modal-add-group-bg')
})

$(document).on('click', '#cansle_add_group_modal', function(){
    closeModal('modal-add-group-bg')
})

$(document).on('click', '#next_add_group_modal', function(event){
    event.preventDefault()
    openModal('modal-create-group-bg')
    closeModal('modal-add-group-bg')
})

$(document).on('click', '#cansle_create_group_modal', function(){
    openModal('modal-add-group-bg')
    closeModal('modal-create-group-bg')
})

function openModal(modalClass){
    $(`.${modalClass}`).removeClass('hidden');
    $(`.${modalClass}`).addClass('visible');
};

function closeModal(modalClass){
    $(`.${modalClass}`).addClass('hidden');
    $(`.${modalClass}`).removeClass('visible');
};