// GMAIL BLOCK

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp2 = /^[a-zA-Z0-9._-]+@gmail.com$/;

gmailButton.onclick = () => {
    if (regExp2.test(gmailInput.value)){
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else{
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
}

// MOVE BLOCK

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionLeft = 0;
let positionTop = 0;
let offsetParentWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
let offsetParentHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

function moveBlock() {
    if (positionLeft < offsetParentWidth && positionTop === 0) {
        positionLeft++;
        childBlock.style.left = `${positionLeft}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionLeft >= offsetParentWidth && positionTop < offsetParentHeight) {
        positionTop++;
        childBlock.style.top = `${positionTop}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionTop >= offsetParentHeight && positionLeft > 0) {
        positionLeft--;
        childBlock.style.left = `${positionLeft}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionLeft === 0 && positionTop > 0) {
        positionTop--;
        childBlock.style.top = `${positionTop}px`;
        requestAnimationFrame(moveBlock);
    }
}
moveBlock();

//STOPWATCH

const secondBlock = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');
let secondNum = 0;
let interval;

startBtn.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            secondNum++;
            secondBlock.innerHTML = secondNum;
        }, 1000);
    }
};

stopBtn.onclick = () => {
    clearInterval(interval)
    interval = null;
}

resetBtn.onclick = () => {
    secondBlock.innerHTML = '0';
    secondNum = 0
    clearInterval(interval)
    interval = null;
}

//HOMEWORK 4

const request = new XMLHttpRequest();
request.open('GET', '../data/persons.json');
request.setRequestHeader('Content-type', 'application/json');
request.send();

request.onload = () => {
    const data = JSON.parse(request.responseText);
    data.forEach(function(person, index) {
        const card = document.querySelector(`.card${index + 1}`);
        if (card) {
            card.innerHTML = `
                <div class="card-content">
                    <img src="${person.person_photo}" alt="${person.name}" />
                    <div class="info">
                        <h4>${person.name}</h4>
                        <p>Age: ${person.age}</p>
                    </div>
                </div>
            `;
        }
    });
};

const request2 = new XMLHttpRequest()
request2.open('GET', '../data/persons2.json')
request2.setRequestHeader('Content-type', 'application/json')
request2.send()
request2.onload = () => {
    const data = JSON.parse(request2.responseText)
    const info = data
    console.log(info)
}