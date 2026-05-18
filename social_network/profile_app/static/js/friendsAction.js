$(document).on('click', '.friends-btn', function(){
    const dataAction = this.dataset.action
    const csrf =  document.getElementById('meta_csrf_token').dataset.csrfToken
    console.log(dataAction, csrf)

    if (dataAction === undefined) return

    fetch(`friends_action/${dataAction}`, {
        method: 'POST',
        headers: {
            'X-CSRF-Token': csrf 
        }
    })
    .then(response =>{
        if (!response.ok){
            throw new Error("Error")
        }
        return response.json()
    })
    .then(data =>{
        console.log(data)
    })
    .catch(error =>{
        console.log(error.message)
    })
})
