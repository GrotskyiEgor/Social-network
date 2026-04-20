const formsArray = document.querySelectorAll('.form')
const loginButtomn = document.getElementById('show_login')
const registrationButtomn = document.getElementById('show_registration')

showForm('registration_form')

loginButtomn.addEventListener('click', function(){
    console.log('Вы нажали на параграф! login_form');
    showForm('login_form')
})

registrationButtomn.addEventListener('click', function(){
    console.log('Вы нажали на параграф! registration_form');
    showForm('registration_form')
})

function showForm(id_form){
    console.log('showFrom');
    formsArray.forEach(form =>{
        if (form.id !== id_form) {
            form.style.display = 'none';
        }
        else {
            form.style.display = 'block';
        }
    }
)}