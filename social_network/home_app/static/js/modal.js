$(() => {
    console.log(first_registration, typeof(first_registration))
    
    if (first_registration === "True"){
        openModal("modal-bg");
    };

    $('#openModal').on('click', function(){
        openModal('modal-bg')
    });

    // $('.modal-bg').on('click', function(event){
    //     if ($(event.target).is('.modal-bg')) {
    //         $('.modal-bg').removeClass('visible')
    //         $('.modal-bg').addClass('hidden');
    //     }
    // })

    function openModal(modalClass){
        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');
    }

    
})