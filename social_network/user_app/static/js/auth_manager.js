const authState = getCookie('authState');

const authFormContainer = $('.auth-form-container')
const authForm = document.querySelectorAll('.auth-form');
const loginButton = document.getElementById('show_login');
const registrationButton = document.getElementById('show_registration');

const password1Eye = document.getElementById('password1_eye')
const password2Eye = document.getElementById('password2_eye')
const password3Eye = document.getElementById('password3_eye')

const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')
const password3 = document.getElementById('password3')

password1Eye.addEventListener('click', function(){
    if (password1.type === 'password'){
        password1.type = 'text'
        password1Eye.src = openEye
    }
    else {
        password1.type = 'password'
        password1Eye.src = closeEye
    }
})

password2Eye.addEventListener('click', function(){
    if (password2.type === 'password'){
        password2.type = 'text'
        password2Eye.src = openEye
    } else {
        password2.type = 'password'
        password2Eye.src = closeEye
    }
})



password3Eye.addEventListener('click', function(){
    if (password3.type === 'password'){
        password3.type = 'text'
        password3Eye.src = openEye
    }
    else {
        password3.type = 'password'
        password3Eye.src = closeEye
    }
})

if (authState){
    showForm(authState);
} else {
    showForm('registration_form')
};

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

        const code = getEmailCode();
        const button = $(document.activeElement);

        ajaxRequests(form, button.attr('form'), code);
    });
});

function ajaxRequests(form, form_id, code){
    user_data = form.serialize();

    if (code){
        user_data += `&confirm_code=${code}`;
    };

    $.ajax({
        url: form.attr('action'),
        method: 'POST',
        data: user_data,
        success: function(response){
            console.log('200');

            const errorText = getErrorText(form);
            errorText.innerText = '';
            errorText.classList.add('hidden');
            errorText.classList.remove('visible');

            if (form_id === 'registration_form') {
                showForm('confirm_email_form');
            }; 

            if (form_id === 'confirm_email_form') {
                showForm('login_form');
            }; 

            if (form_id === 'login_form') {
                window.location = '/';
            }; 
        },
        error: function(response){
            let data = response.responseJSON;
            const errorText = getErrorText(form);

            if (data?.error) {
                const errors = data.error;

                const firstKey = Object.keys(errors)[0];
                const message = errors[firstKey][0];

                errorText.innerText = message;
            } else {
                errorText.innerText = 'Помилка серверу';
            };

            errorText.classList.remove('hidden');
            errorText.classList.add('visible');
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

        authFormContainer.removeClass('registration_form login_form confirm_email_form');
        authFormContainer.addClass(id_form);

        if (form.attr('id') !== id_form) {
            auth.classList.add('hidden');
            auth.classList.remove('visible');
            authText.addClass('hidden');
            authText.removeClass('visible');
        }
        else {
            auth.classList.remove('hidden');
            auth.classList.add('visible');
            authText.removeClass('hidden');
            authText.addClass('visible');
        };

        if (id_form === 'confirm_email_form'){
            navigation.html(`
                <p id="show_registration" class="confirm-text-active">Підтвердження пошти</p>
            `);
            
            confirmEmailText.removeClass('hidden');
            confirmEmailText.addClass('visible');
            
            $('#show_confirm_email').off('click');

            $('#show_confirm_email').on('click', function(){
                showForm('registration_form');
            });
        } else {
            navigation.html(`
                <p id="show_registration" class="${id_form === 'registration_form' ? 'auth-text-active' : 'auth-text'}">Реєстрація</p>
                <p id="show_login" class="${id_form === 'login_form' ? 'auth-text-active' : 'auth-text'}">Авторизація</p>
            `);
            
            confirmEmailText.addClass('hidden');
            confirmEmailText.removeClass('visible');
            
            $('#show_login').off('click');
            $('#show_registration').off('click');

            $('#show_login').on('click', function(){
                showForm('login_form');
            });

            $('#show_registration').on('click', function(){
                showForm('registration_form');
            });
        };
    });
};
