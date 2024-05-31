let table = document.getElementById('bagua-table');

/* ваш код */

class Button {
    constructor(text) {
        this.text = text;
    }
    createButton() {
        const buttonElement = document.createElement("p");
        buttonElement.innerText = this.text;
        buttonElement.classList.add('button');
        //buttonElement.style.display = "inline"; // Задайте бажану позицію (наприклад, "inline", "block" і т. д.)
        return buttonElement;
    }
}

const leftButton = new Button('ЗГОДА');
const rightButton = new Button('ВІДМІНА');
table.addEventListener('click', function(event) {
    let target = event.target;
    if (target != tagr)
})