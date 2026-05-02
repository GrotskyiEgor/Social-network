$(() => {
    console.log(first_registration, typeof(first_registration));
    const registrationModal = $('#registration-modal');
    
    if (first_registration === "True"){
        openModal("modal-bg");
    };

    $('#openModal').on('click', function(){
        openModal('modal-bg');
    });

    registrationModal.on('submit', function(event){
        event.preventDefault()

        $.ajax({
            url: registrationModal.attr('action'),
            method: 'POST',
            data: registrationModal.serialize(),
            success: function(response){
                console.log('200');

                // const errorText = getErrorText(form);
                // errorText.innerText = '';
                // errorText.classList.add('hidden');
                // errorText.classList.remove('visible');

                $('.modal-bg').removeClass('visible')
                $('.modal-bg').addClass('hidden');
            },
            error: function(response){
                console.log('400')
                
                // let data = response.responseJSON;
                // const errorText = getErrorText(form);

                // if (data?.error) {
                //     const errors = data.error;

                //     const firstKey = Object.keys(errors)[0];
                //     const message = errors[firstKey][0];

                //     errorText.innerText = message;
                // } else {
                //     errorText.innerText = 'Помилка серверу';
                // };

                // errorText.classList.remove('hidden');
                // errorText.classList.add('visible');
            }
        })
    })

    // $('.modal-bg').on('click', function(event){
    //     if ($(event.target).is('.modal-bg')) {
    //         $('.modal-bg').removeClass('visible')
    //         $('.modal-bg').addClass('hidden');
    //     }
    // })

    function openModal(modalClass){
        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');
    };
})
