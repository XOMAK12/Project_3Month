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

const converter = (element, targetElements) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()
        request.onload = () => {
            const data = JSON.parse(request.response)
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
            if (element.value === ''){
                clearInputs()
            }
        }
    }
}

converter(somInput, { usd: usdInput, euro: euroInput })
converter(usdInput, { som: somInput, euro: euroInput })
converter(euroInput, { som: somInput, usd: usdInput })