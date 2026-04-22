const authForm = document.querySelectorAll('.auth-form');
const loginButton = document.getElementById('show_login');
const registrationButton = document.getElementById('show_registration');

console.log(jQuery.fn.jquery);
showForm('registration_form');

loginButton.addEventListener('click', function(){
    console.log('Вы нажали на параграф! login_form');
    registrationButton.className = 'auth-text';
    this.className = 'auth-text-active';
    showForm('login_form');
});

registrationButton.addEventListener('click', function(){
    console.log('Вы нажали на параграф! registration_form');
    loginButton.className = 'auth-text';
    this.className = 'auth-text-active';
    showForm('registration_form');
});

authForm.forEach(auth => {
    const form = $(auth).find('.form');

    form.on('submit', function(event){
        event.preventDefault();

        $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: $(form).serialize(),
            success: function(response){
                console.log('200')
            },
            error: function(response){
                console.log('400', response)
            }
        })
    });
});

function showForm(id_form){
    console.log('showFrom');

    authForm.forEach(auth =>{
        const form = $(auth).find('.form');
        const authText = $(auth).prev('.under-auth-navigation-text');
        console.log(authText)
        console.log(form.attr('id') !== id_form, form.attr('id'), id_form)
        if (form.attr('id') !== id_form) {
            auth.style.display = 'none';
            authText.css('display', 'none');
        }
        else {
            auth.style.display = 'block';
            authText.css('display', 'block');
        };
    });
};