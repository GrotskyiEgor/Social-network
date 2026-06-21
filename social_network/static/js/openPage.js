const pagePath = window.location.pathname;

if (pagePath === '/') {
    clearCookie(['authState'])
}  

if (pagePath !== '/friends/all_friends'){
    clearCookie(['selection'])
}

document.querySelectorAll('.nav-link').forEach(function(link){
    if (pagePath.includes(link.id)){
        link.classList.toggle("active-link");
    } else if (pagePath === "/" && link.id === "house") {
        link.classList.toggle("active-link");
    };
});