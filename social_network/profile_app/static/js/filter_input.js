$(document).on('input', '#filter_requests, #filter_recommendations, #filter_friend', function(){
    console.log(this.id)
    console.log ($(this).val())
})