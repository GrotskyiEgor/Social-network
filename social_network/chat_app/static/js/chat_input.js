let lastFilterDiv = ''

$(document).on('input', '#filter_friend', async function(){
    const filterDiv = this.dataset.selection
    let selectionDiv = document.getElementById(filterDiv)
    const status = getCookie('selection')
    let fetchUrl = ''

    filterText = $(this).val()
    currentPage = 1
    hasNextPage = true

    const isEmptyText = filterText === ''

    if (!selectionDiv){
        return
    }

    console.log(this.id, status, 'fff', filterText)

    if (status === 'all') {
        let limit = filterDiv === 'requests' ? 3 : 6
        console.log(limit)
        fetchUrl = `/friends/all_friends/${filterDiv}?page=${currentPage}&filter_text=${filterText}&limit=${limit}`
    } else {
        fetchUrl = `/friends/all_friends/${status}?page=${currentPage}&filter_text=${filterText}`
    }

    try {
        const response = await fetch(fetchUrl, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        });
    
        const data = await response.json();
        
        filterData = data.html.trim()
        if (lastFilterDiv === filterData && !isEmptyText){
            console.log('return', isEmptyText, 'f', filterText)
            return
        }

        selectionDiv.innerHTML = ''
        lastFilterDiv = filterData

        console.log('filterData', filterData !== '',filterData)
        if (filterData !== '') {
            selectionDiv.insertAdjacentHTML("beforeend", filterData);
        } else {
            selectionDiv.innerHTML = '<p class="empty-text">Нет результату по этому запросу</p>'
        }

    } catch (error){
        console.log(error)
        selectionDiv.innerHTML = '<p class="empty-text">Ошибка закрузки</p>'
    }
})