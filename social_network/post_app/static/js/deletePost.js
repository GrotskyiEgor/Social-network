$(document).on('click', '.profile-interaction-image', function(event){
    event.stopPropagation()

    const menu =  $(this).siblings('.interaction-menu')
    $('.interaction-menu').not(menu).removeClass('visible').addClass('hidden')
    menu.toggleClass('hidden visible')
})

$(document).on('click', '.delete-post-button', function(event){
    event.preventDefault();

    const button = $(this)
    const deletePostForm = button.closest('form')
    const post = button.closest('.post-conteiner')
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