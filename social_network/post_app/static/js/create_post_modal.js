$(() => {
    const createTagModel = $('#create_tag_modal');
    const createPostModel = $('#create_post_modal');
    const urlsArrayDiv = document.querySelector('#modal_create_post_urls_div');
    const imagesField = $('#images_field')
    const imagesFieldHidden = $('#images_field_hidden')

    let tags = $('.tag');
    console.log(imagesField, imagesFieldHidden)
    imagesField.on('click', function(){
        console.log(imagesField, imagesFieldHidden)
        imagesFieldHidden.click();
    })

    $(document).on('click', '.tag', function(index, tag){
        this.classList.toggle('selected-tag')
    })
    
    createPostModel.on('submit', function(event){
        event.preventDefault();
        let createPostformData = new FormData(this)

        $('.selected-tag').each(function(){
            createPostformData.append('tags', $(this).data('id'))
        })

        $.ajax({
            url: createPostModel.attr('action'),
            method: 'POST',
            data: createPostformData,
            success: function(response){
                console.log('200');

                $('#post_content').prepend(response.post_html)
                closeModal('modal-bg');
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

                $('#modal_add_tag').before(response.tag_html)
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

    $(document).on('click', '.profile-interaction-image', function(event){
        event.stopPropagation()

        const menu =  $(this).siblings('.interaction-menu')
        $('.interaction-menu').not(menu).removeClass('visible').addClass('hidden');
        menu.toggleClass('hidden visible');
    })

    $(document).on('click', '.delete-post-button', function(event){
        event.preventDefault();

        const button = $(this)
        const deletePostForm = button.closest('form');
        const post = button.closest('.post-conteiner');
        const menu = button.closest('.interaction-menu')

        $.ajax({
            url: deletePostForm.attr('action'),
            method: 'POST',
            data: deletePostForm.serialize(),
            success: function(response){
                console.log('200');

                menu.removeClass('visible').addClass('hidden')
                post.remove()
            },
            error: function(response){
                console.log('400', response);
            }
        });
    })

    $(document).on('click', function(){
        $('.interaction-menu').removeClass('visible').addClass('hidden')
    })

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
        if (modalClass == 'modal-bg'){
            const createPostText = document.getElementById('create_post_container_text');
            const createPostModelText = document.getElementById('create_post_modal_text');
            createPostModelText.textContent = createPostText.value;
        }

        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');

        
    };

    function closeModal(modalClass){
        $(`.${modalClass}`).addClass('hidden');
        $(`.${modalClass}`).removeClass('visible');
    };
})
