const csrfToken = document.getElementById('meta_csrf_token').dataset.csrfToken
const saveImg = saveBtn.split('/').pop() 
const editImg = editBtn.split('/').pop()

$(document).on('click', '#base_set, #password_set, #pictire_set, #sing_set', async function(){
    let btnId = this.id
    let imageName = this.src.split('/').pop()

    if (imageName === saveImg) {
        let saveForm = document.getElementById(`${btnId}_con`)
        let saveStatus = saveSettingsManager(btnId, saveForm)
        
        if (saveStatus && saveForm){     
            this.src = editBtn

            if (btnId === 'pictire_set') {
                saveForm.innerHTML = `
                    <div class="profile-user-image-container">
                        <div class="status-wrapper">
                            <img class="profile-user-image online-img-${userId} avatar-img" src=${avatarImg} alt="indicator">
                            <img class="status-img" src=${offlineImg} alt="off">
                        </div>
                    </div>
                    
                    <div class="profile-username">
                        <a href=${profileUrlWatch} class="username-text" id="username_text">${profilePseudonym}</a>
                        <a href=${profileUrlWatch} class="pseudonym-text" id="pseudonym_text">${ userUsername }</a>          
                    </div>
                `
            } else if (btnId === 'password_set'){
                saveForm.innerHTML = `
                    <div class="modal-create-post-inputs-div">
                        <p class="create-post-text">Пароль</p>
                        <input type="text" name="new_password" class="create-post-input" placeholder="⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕">
                    </div>
                `
            }
            saveForm.classList.add('idle-container')
        }
    } else if (imageName === editImg){
        let settingForm = document.getElementById(`${btnId}_con`)

        if (settingForm) {
            this.src = saveBtn
            settingForm.classList.remove('idle-container')
            settingForm.style.background = '#E9E5EE'

            if (btnId === 'pictire_set'){
                console.log('no change pictire_set')
                // <div class="images-text-div">
                //     <img src=${plusImg} alt="plus" class="images-text-img">
                //     <p class="images-text">Додайте фото</p>
                // </div>

                settingForm.innerHTML = `
                    <p class="picture-title">Оберіть або завантажте фото профілю</p>
                    
                    <div class="profile-user-image-container">
                        <div class="status-wrapper">
                            <img class="profile-user-image online-img-${userId} avatar-img" src=${avatarImg} alt="indicator">
                            <img class="status-img" src=${offlineImg} alt="off">
                        </div>
                    </div>

                    <div class="group-image-texts-container">
                        <div class="images-text-div">
                            <input name="avatar" type="file" accept="image/*" multiple="" id="avatar_img" hidden>
                            <img src=${imgIconImg} alt="exit-button" class="images-text-img" id="avatar_img_div">
                            <p class="images-text">Оберіть фото</p>
                        </div>
                    </div>
                    
                    <div class="modal-create-post-inputs-div">
                        <p class="create-post-text">Ім'я користувача</p>
                        <input type="text" name="username" class="create-post-input" value=${userUsername}>
                    </div>
                `
            } else if (btnId === 'base_set'){
                console.log('no change base_set')
            } else if (btnId === 'password_set'){
                settingForm.innerHTML = `
                    <div class="set-container">
                        <div class="modal-create-post-inputs-div">
                            <p class="create-post-text">Новый пароль</p>
                            <div class="password-wrapper">
                                <input type="password" name="new_password" class="create-post-input" placeholder="⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕" id='new_password'>
                                <img src=${inputEye} alt="eye" class='password-eye' id='new_password_eye'>
                            </div>
                        </div>

                        <div class="modal-create-post-inputs-div">
                            <p class="create-post-text">Підтвердіть новий пароль</p>
                            <div class="password-wrapper">
                                <input type="password" name="check_password" class="create-post-input" placeholder="⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕" id='check_password'>
                                <img src=${inputEye} alt="eye" class='password-eye' id='check_password_eye'>
                            </div>
                        </div>
                    </div>
                `
            }

        }
    }
})

async function saveSettingsManager(id, form){
    let result = false

    form.style.background = 'transparent'
    if (id === 'pictire_set'){
        result = await savePicture(id, form)
    } else if (id === 'base_set'){
        result = await saveBaseSet(id, form)
    } else if (id === 'password_set'){
        result = await savePassword(id, form)
    }

    return result
}

async function savePicture(id, form){
    let saveForm = new FormData(form)

    let response = await fetch(`/settings/save/${id}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: saveForm,
    });

    response = await response.json();
    return response.success
}

async function saveBaseSet(id, form){
    let saveForm = new FormData(form)

    let response = await fetch(`/settings/save/${id}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: saveForm,
    });

    response = await response.json();
    return response.success
}

async function savePassword(id, form){
    let saveForm = new FormData(form)

    let response = await fetch(`/settings/save/${id}/`, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        body: saveForm,
    });

    response = await response.json();
    return response.success
}
