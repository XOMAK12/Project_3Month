const URL = 'https://jsonplaceholder.typicode.com/posts'
const cardsContainer = document.querySelector('#cards-container')

const fetchAndRenderCards = async () => {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        renderCards(data)
    } catch (error) {
        cardsContainer.innerHTML = '<p>Error loading data</p>'
    }
}

const renderCards = (data) => {
    const cardsHTML = data.map(post => `
        <div class="card">
            <img src="https://pm1.aminoapps.com/7089/44566acd28600ea52de28e7b2d2cb40d52b3a900r1-375-333v2_00.jpg">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </div>
    `).join('');
    cardsContainer.innerHTML = cardsHTML
}

fetchAndRenderCards()