const authState = getCookie('authState');

const authForm = document.querySelectorAll('.auth-form');
const loginButton = document.getElementById('show_login');
const registrationButton = document.getElementById('show_registration');

if (authState){
    showForm(authState);
} else {
    showForm('registration_form')
}

loginButton.addEventListener('click', function(){
    registrationButton.className = 'auth-text';
    this.className = 'auth-text-active';
    showForm('login_form');
});

registrationButton.addEventListener('click', function(){
    loginButton.className = 'auth-text';
    this.className = 'auth-text-active';
    showForm('registration_form');
});

authForm.forEach(auth => {
    const form = $(auth).find('.form');

    form.on('submit', function(event){
        event.preventDefault();

        const button = $(document.activeElement);
        if (button.attr('form') === 'registration_form') {
            showForm('confirm_email_form');
            ajaxRequests(form);
        }; 

        if (button.attr('form') === 'confirm_email_form') {
            const code = getEmailCode();
            ajaxRequests(form, code);
        }; 

        if (button.attr('form') === 'login_form') {
            ajaxRequests(form);
        }; 
    });
});

function ajaxRequests(form, code=null){
    console.log(code);

    $.ajax({
        url: form.attr('action'),
        method: 'POST',
        data: form.serialize(),
        success: function(response){
            console.log('200');
        },
        error: function(response){
            console.log('400', response);
        }
    })
}

function showForm(id_form){
    setCookie('authState', id_form);

    authForm.forEach(auth =>{
        const form = $(auth).find('.form');
        const authText = $(auth).prev('.under-auth-navigation-text');
        const navigation = $('.auth-navigation');
        const confirmEmailText = $('.under-auth-navigation-div');

        if (form.attr('id') !== id_form) {
            auth.style.display = 'none';
            authText.css('display', 'none');
        }
        else {
            auth.style.display = 'block';
            authText.css('display', 'block');
        };

        if (id_form === 'confirm_email_form'){
            navigation.html(`
                <p id="show_registration" class="confirm-text-active">Підтвердження пошти</p>
            `);

            confirmEmailText.css('display', 'block');

            $('#show_confirm_email').on('click', function(){
                showForm('registration_form');
            });
        } else {
            navigation.html(`
                <p id="show_registration" class="${id_form === 'registration_form' ? 'auth-text-active' : 'auth-text'}">Реєстрація</p>
                <p id="show_login" class="${id_form === 'login_form' ? 'auth-text-active' : 'auth-text'}">Авторизація</p>
            `);

            confirmEmailText.css('display', 'none');

            $('#show_login').on('click', function(){
                showForm('login_form');
            });

            $('#show_registration').on('click', function(){
                showForm('registration_form');
            });
        };
    });
};