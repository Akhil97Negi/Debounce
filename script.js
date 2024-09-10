function apiCall(query){
    return new Promise((resolve) => {
        setInterval(() =>{
            const res = [
                'apple', 'apricot', 'banana', 'lemon', 'lime', 'mango', 'orange'
            ]
            const filteredRes = res.filter(item => item.includes(query.toLowerCase()))
            resolve(filteredRes)
        }, 1000)
    })
}

function updatedRes(res){
    const resContainer = document.getElementById('results')
    resContainer.innerHTML = res.map(res => `<li>${res}</li>`).join('')
}

function debounce(func , delay){
    let timer 
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(() => func(...args), delay)
    }
}

async function handelSearchInput(event){
    const query = event.target.value
    if(query){
        const results = await apiCall(query)
        updatedRes(results)
    }
    else{
        updatedRes([])
    }
}

function setup(){
    const searchInput = document.getElementById('search')
    const debouncedSearch = debounce(handelSearchInput, 500)
    searchInput.addEventListener('input', debouncedSearch)
}

setup()