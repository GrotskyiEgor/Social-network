$(() => {
    const urlsArrayDiv = document.querySelector('#modal_create_post_urls_div')
    const createPostModel = $('#registration-modal');

    $('#open-modal-create-post').on('click', function(){
        openModal('modal-bg');
    });

    createPostModel.on('submit', function(event){
        event.preventDefault()

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: createPostModel.serialize(),
            success: function(response){
                console.log('200');
            },
            error: function(response){
                console.log('400');
            }
        })
    })

    $("#add_url_btn").on('click', function(){
        const inputDiv = document.createElement('div')
        inputDiv.className = 'modal-urls-div'
        
        const input = document.createElement('input')
        input.className = 'create-post-input'
        input.type = 'url'
        input.name = 'links'
        input.placeholder = 'Додайте посилання'
        
        inputDiv.appendChild(input)
        urlsArrayDiv.appendChild(inputDiv) 
    })

    $("#exit_button").on('click', function(){
        $('.modal-bg').removeClass('visible');
        $('.modal-bg').addClass('hidden');
    })

    $('.modal-bg').on('click', function(event){
        if ($(event.target).is('.modal-bg')) {
            $('.modal-bg').removeClass('visible');
            $('.modal-bg').addClass('hidden');
        };
    })

    function openModal(modalClass){
        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');
    };
})
