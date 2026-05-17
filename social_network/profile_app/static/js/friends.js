let currentSelection = '';
let currentPage = 1;
let isLoading = false;
let hasNextPage = false;

const sentinel = document.getElementById('post-loader');
const navigationsTexts = document.querySelectorAll('.info-navigations-text')
const friendsContainer = document.querySelectorAll('.friends-container')
const getAllTexts = document.querySelectorAll('.get-all-text')

$(document).on('click', '.info-navigations-text', async function(){
    resetText(this)
})

$(document).on('click', '.get-all-text', async function(){
    for (let text of getAllTexts){
        if (text === this){
            resetText(this)
            openSelection(text.dataset.id)
        }
    }
})

async function loadSelectionPage(selection, page){
    isLoading = true;

    const response = await fetch(`/friends/all_friends/${selection}?page=${page}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    const data = await response.json();

    let selectionDiv = document.getElementById(currentSelection)

    if (!selectionDiv){
        console.log("не тл")
        isLoading = false
        return
    }

    selectionDiv.insertAdjacentHTML("beforeend", data.html);

    hasNextPage = data.has_next_page;
    isLoading = false;
}

async function openSelection(selection){
    currentSelection = ""
    currentPage = 1;
    hasNextPage = false;

    if (selection === 'all'){
        for (let container of friendsContainer){
            container.style.display = 'flex'

            cleanDiv("requests", 3)
            cleanDiv("recommendations", 6)
            cleanDiv("friend", 6)
        }
        return
    }

    currentSelection = selection;
    
    for (let container of friendsContainer){
        if (container.dataset.id === selection){
            // container.classList.remove('hidden')
            // container.classList.add('visible')
            container.style.display = 'flex'
        } else{
            container.style.display = 'none'
            // container.classList.add('hidden')
        }
    }

    await loadSelectionPage(currentSelection, currentPage)
}

function resetText(clickedText) {
    for (let text of navigationsTexts){
        if (text.dataset.id === clickedText.dataset.id){
            text.classList.add('info-navigations-active-test')
            openSelection(text.dataset.id)
        } else {
            text.classList.remove('info-navigations-active-test')
        }
    }
}

function cleanDiv(id, slice){
    let div = document.getElementById(id)
    let children = Array.from(div.children)
    children.slice(slice).forEach(child => div.removeChild(child))
}

const obeserve = new IntersectionObserver(async (entries)=>{
    if (entries[0].isIntersecting && isLoading === false){
        currentPage += 1
        await loadSelectionPage(currentSelection, currentPage)
    }
}, {rootMargin: "450px"})

obeserve.observe(sentinel)
