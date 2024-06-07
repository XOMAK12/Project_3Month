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

let positionLeft = '';
function moveBlock () {
    if (positionLeft < 448){
        positionLeft++
        childBlock.style.left = `${positionLeft}px`;
        requestAnimationFrame(moveBlock)
    }
}

moveBlock();