const formsArray = document.querySelectorAll('.form');
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

formsArray.forEach(form => {
    form.addEventListener('submit', function(event){
        event.preventDefault();

        $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: $(form).serialize(),
            sussces: function(response){
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
    formsArray.forEach(form =>{
        if (form.id !== id_form) {
            form.style.display = 'none';
        }
        else {
            form.style.display = 'block';
        };
    });
};