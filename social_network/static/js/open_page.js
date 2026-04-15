const path = window.location.pathname;

document.querySelectorAll('.nav-link').forEach(function(link){
    if (path.includes(link.id)){
        link.classList.toggle("active-link");
    } else if (path === "/" && link.id === "house") {
        link.classList.toggle("active-link");
    };
});