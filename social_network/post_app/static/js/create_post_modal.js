$(() => {
    const imagesField = $('#images_field');
    const createTagModel = $('#create_tag_modal');
    const createPostModel = $('#create_post_modal');
    const imagesFieldHidden = $('#images_field_hidden');
    const urlsArrayDiv = document.querySelector('#modal_create_post_urls_div');
    const previewContainer = document.getElementById('image_preview_container');

    const createPostModelText = document.getElementById('create_post_modal_text');
    const createPostModalTextTags = document.getElementById('create_post_modal_text_tags');

    let selectedFiles = [];
    let selectedTags = [];
    
    imagesField.on('click', function(){
        imagesFieldHidden.click();
    })

    $(document).on('click', '.tag', function(index, tag){    
        this.classList.toggle('selected-tag')

        if (this.classList.contains('selected-tag')){
            selectedTags.push(this.textContent)
        } else {
            indexTag = selectedTags.indexOf(this.textContent)
            selectedTags.splice(indexTag, 1)
        }

        createPostModalTextTags.innerHTML = ''
        for (let tag of selectedTags){
            createPostModalTextTags.innerHTML += tag
        }
    })

    imagesFieldHidden.on('change', function(){
        const newFiles = Array.from(this.files);

        for (let file of newFiles){
            if (!file.type.startsWith('image/')) continue;

            if (!isDuplicate(file, selectedFiles)) {
                selectedFiles.push(file);
            }
        }

        renderImages();
    });

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
            processData: false,
            contentType: false,
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
            modalMinusImg.src = ADD_URL_IMG_PATH;
            modalMinusImg.className = 'minus-url-btn';
            modalMinusImg.id = 'minus_url_btn';

            modalMinusUrlsDiv.appendChild(modalMinusImg);
            modalUrlDiv.appendChild(modalMinusUrlsDiv);
            
            const createPostInput = document.querySelector('#create_post_input');
            createPostInput.placeholder = 'Додайте посилання';
        };
    });

    $(document).on('click', '.delete-preview-image', function(){
        const imageItem = this.closest('.image-item');
        const index = parseInt(imageItem.dataset.index);
        selectedFiles.splice(index, 1);
        
        renderImages();
    })

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

    // $('#emoji_button').on('click', function(){
    //     openModal('modal-bg');
    // });

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
            createPostModelText.textContent = createPostText.value;
        }

        $(`.${modalClass}`).removeClass('hidden');
        $(`.${modalClass}`).addClass('visible');

        
    };

    function closeModal(modalClass){
        $(`.${modalClass}`).addClass('hidden');
        $(`.${modalClass}`).removeClass('visible');
    };

    function isDuplicate(file, filesArray) {
        return filesArray.some(img =>img.name === file.name && img.size === file.size && img.lastModified === file.lastModified);
    }

    function renderImages(){
        previewContainer.innerHTML = '';

        previewContainer.classList.add('hidden')
        if (selectedFiles.length > 0){
            previewContainer.classList.remove('hidden')
            previewContainer.classList.add('visible')
        }

        for (let index = 0; index < selectedFiles.length; index++){
            const file = selectedFiles[index];
            const imageURL = URL.createObjectURL(file);

            const wrapper = document.createElement('div');
            wrapper.className = 'image-item';
            wrapper.dataset.index = index;

            const image = document.createElement('img');
            image.className = 'preview-image';
            image.src = imageURL;
            image.onload = () => URL.revokeObjectURL(imageURL);

            const deleteImgage = document.createElement('img')
            deleteImgage.className = 'delete-preview-image'
            deleteImgage.src = DELTE_IMG_PATH;

            wrapper.appendChild(deleteImgage);
            wrapper.appendChild(image);
            previewContainer.appendChild(wrapper);
        }
    }
})
