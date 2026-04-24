$(() => {
    $('#openModal').on('click', function(){
        openModal('modal-bg')
    });

    $('.modal-bg').on('click', function(event){
        if ($(event.target).is('.modal-bg')) {
            $('.modal-bg').removeClass('active')
        }
    })

    function openModal(modalClass){
        $(`.${modalClass}`).addClass('active');
    }
})