// MODAL

const modal = document.querySelector('.modal')
const modalTriggerButton = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTriggerButton.onclick = () => openModal()
modalCloseButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal){
        closeModal()
    }
}

const showModalOnScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', showModalOnScroll)
    }
}

window.addEventListener('scroll', showModalOnScroll)

setTimeout(openModal, 10000)

// TG BOT

const form = document.querySelector('form')
const token = '7477218505:AAECbnK5zeMGYz_cUvjZO8gAUhmStJkpWL8'
const chat_id = '@less7nikita'
const API_URL = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event) => {
    event.preventDefault()
    const {name, phone} = Object.fromEntries(new FormData(event.target))
    const text = `имя: ${name}\nномер: ${phone}`
    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({chat_id: chat_id, text: text})
    })
}

