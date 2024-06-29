// PHONE CHECkER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else{
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')
let currentIndex = 0
const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
}

const nextTabContent = () => {
    hideTabContent();
    currentIndex = (currentIndex + 1) % tabContentBlocks.length;
    showTabContent(currentIndex);
};

hideTabContent()
showTabContent()

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(index)
                currentIndex = index
            }
        })
    }
}
setInterval(nextTabContent, 3000)

// CONVERTER

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const euroInput = document.querySelector('#eur')

const clearInputs = () => {
    somInput.value = ''
    usdInput.value = ''
    euroInput.value = ''
}

const fetchConversionData = async () => {
    try {
        const response = await fetch('../data/converter.json', {
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

const converter = (element, targetElements) => {
    element.oninput = async () => {
        const data = await fetchConversionData()
        if (element.id === 'som') {
            targetElements.usd.value = (element.value / data.usd).toFixed(2)
            targetElements.euro.value = (element.value / data.euro).toFixed(2)
        }
        if (element.id === 'usd') {
            targetElements.som.value = (element.value * data.usd).toFixed(2)
            targetElements.euro.value = ((element.value * data.usd) / data.euro).toFixed(2)
        }
        if (element.id === 'eur') {
            targetElements.som.value = (element.value * data.euro).toFixed(2)
            targetElements.usd.value = ((element.value * data.euro) / data.usd).toFixed(2)
        }
        if (element.value === '') {
            clearInputs()
        }
    }
}

converter(somInput, { usd: usdInput, euro: euroInput })
converter(usdInput, { som: somInput, euro: euroInput })
converter(euroInput, { som: somInput, usd: usdInput })



// CARD SWITCHER

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let cardNumber = 1

const renderCardSwitcher = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
        const data = await response.json()
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `
    } catch (error) {
        cardBlock.innerHTML = `<p>Error loading card data</p>`
    }
}

btnNext.onclick = () => {
    cardNumber++
    if (cardNumber > 200) {
        cardNumber = 1
    }
    renderCardSwitcher()
}

btnPrev.onclick = () => {
    cardNumber--;
    if (cardNumber <= 0) {
        cardNumber = 200
    }
    renderCardSwitcher()
}

renderCardSwitcher()

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Fetch error:', error)
    }
};

fetchPosts()

// WEATHER

const URL = 'http://api.openweathermap.org/data/2.5/weather'
const APIKEY = 'e417df62e04d3b1b111abeab19cea714'

const searchInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const citySearch = () => {
    searchInput.oninput = async (event) => {
        if (!event.target.value) {
            city.innerHTML = ''
            temp.innerHTML = ''
            return
        }

        try {
            const response = await fetch(`${URL}?q=${event.target.value}&appid=${APIKEY}`)
            const data = await response.json()
            city.innerHTML = data.name ? data.name : 'Город не найден'
            temp.innerHTML = data.main?.temp ? Math.round(data.main.temp - 273) + '&deg;С' : '///'
        } catch (error) {
            city.innerHTML = 'Ошибка загрузки данных'
            temp.innerHTML = '///'
        }
    };
};

citySearch()

// optional chaining - ?.