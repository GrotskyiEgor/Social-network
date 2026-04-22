const path = window.location.pathname;

if (path === '/') {
    clearCookie(['authState'])
}

document.querySelectorAll('.nav-link').forEach(function(link){
    if (path.includes(link.id)){
        link.classList.toggle("active-link");
    } else if (path === "/" && link.id === "house") {
        link.classList.toggle("active-link");
    };
});