$(() => {
    const createTagModel = $('#create_tag_modal');
    const createPostModel = $('#create_post_modal');
    const urlsArrayDiv = document.querySelector('#modal_create_post_urls_div');

    createPostModel.on('submit', function(event){
        event.preventDefault();

        $.ajax({
            url: createPostModel.attr('action'),
            method: 'POST',
            data: createPostModel.serialize(),
            success: function(response){
                console.log('200');
            },
            error: function(response){
                console.log('400', response);
            }
        });
    });

    createTagModel.on('submit', function(event){
        event.preventDefault();

        $.ajax({
            url: createTagModel.attr('action'),
            method: 'POST',
            data: createTagModel.serialize(),
            success: function(response){
                console.log('200');
                
                closeModal('modal-tag-bg');
                openModal('modal-bg');
            },
            error: function(response){
                console.log('400', response);
            }
        });
    });

    $("#add_url_btn").on('click', function(){
        const inputDivArray = document.querySelectorAll('.modal-url-div');

        if (inputDivArray.length === 0){
            const inputDiv = document.createElement('div');
            inputDiv.className = 'modal-url-div';
            
            const input = document.createElement('input');
            input.className = 'create-post-input';
            input.type = 'url';
            input.name = 'links';
            input.placeholder = 'https://www.instagram.com/world.it.ac';
            
            inputDiv.appendChild(input);
            urlsArrayDiv.prepend(inputDiv);

            const modalUrlDiv = document.querySelector('.modal-url');

            const modalMinusUrlsDiv = document.createElement('div');
            modalMinusUrlsDiv.className = 'modal-minus-urls-div';

            const modalMinusImg = document.createElement('img');
            modalMinusImg.alt = 'minus_url';
            modalMinusImg.src = STATIC_ADD_URL;
            modalMinusImg.className = 'minus-url-btn';
            modalMinusImg.id = 'minus_url_btn';

            modalMinusUrlsDiv.appendChild(modalMinusImg);
            modalUrlDiv.appendChild(modalMinusUrlsDiv);
            
            const createPostInput = document.querySelector('#create_post_input');
            createPostInput.placeholder = 'Додайте посилання';
        };
    });

    $(document).on('click', '#minus_url_btn', function(){
        const inputDivArray = document.querySelectorAll('.modal-url-div');

        if (inputDivArray.length > 0){
            inputDivArray[inputDivArray.length - 1].remove();
        };
        
        const createPostInput = document.querySelector('#create_post_input');
        createPostInput.placeholder = 'https://www.instagram.com/world.it.ac';

        const minusUrlDiv = document.querySelector('.modal-minus-urls-div');
        minusUrlDiv.remove();
        
    });

    $('#open-modal-create-post').on('click', function(){
        openModal('modal-bg');
    });

    $('#emoji_button').on('click', function(){
        openModal('modal-bg');
    });

    $('#add_tag_btn').on('click', function(){
        closeModal('modal-bg');
        openModal('modal-tag-bg');
    })
    
    $("#cansle_tag_modal").on('click', function(){
        closeModal('modal-tag-bg');
        openModal('modal-bg');
    });

    $("#exit_tag_button").on('click', function(){
        closeModal('modal-tag-bg');
    });

    $("#exit_button").on('click', function(){
        closeModal('modal-bg');
    });

    $('.modal-bg').on('click', function(event){
        if ($(event.target).is('.modal-bg')) {
            closeModal('modal-bg');
        };
    });

    function openModal(modalClass){
        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');
    };

    function closeModal(modalClass){
        $(`.${modalClass}`).addClass('hidden');
        $(`.${modalClass}`).removeClass('visible');
    };
})
