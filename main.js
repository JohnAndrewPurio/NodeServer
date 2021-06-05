const counter = document.querySelector('.counter')
const url = 'http://localhost:4000/counter'

async function incrementCounter() {
    try {
        const fetchedCount = await fetch(url)

        console.log(fetchedCount)

        const count = await fetchedCount.json()

        
        counter.innerText = count
    } catch(e) {
        alert(e)
    }
}

incrementCounter()