$(() => {
    console.log(first_registration, typeof(first_registration));
    const registrationModal = $('#registration-modal');
    
    if (first_registration === "True"){
        openModal("modal-registration-bg");
    };

    $('#openModal').on('click', function(){
        openModal('modal-registration-bg');
    });

    registrationModal.on('submit', function(event){
        event.preventDefault()

        $.ajax({
            url: registrationModal.attr('action'),
            method: 'POST',
            data: registrationModal.serialize(),
            success: function(response){
                console.log('200');

                $('.modal-registration-bg').removeClass('visible')
                $('.modal-registration-bg').addClass('hidden');
            },
            error: function(response){
                console.log('400')
                
            }
        })
    })

    function openModal(modalClass){
        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');
    };
})
