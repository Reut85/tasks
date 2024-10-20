let table = document.getElementById('bagua-table');

/* ваш код */


class Textarea {
    constructor(text) {
        this.text = text;
    }

    createTextarea() {
        const form = document.createElement("form");
        const area = document.createElement("textarea");
        area.value = this.text;
        form.append(area);
        return form;
    }
}

class Button {
    constructor(text) {
        this.text = text;
    }
    createButton() {
        let buttonElement = document.createElement("button");
        buttonElement.innerHTML = this.text;
        return buttonElement;
    }
}

let leftButton;
let rightButton;
let selectedTd;

table.onclick = function (event) {
    let target = event.target; // де відбувся клік?

    if (target.tagName != 'TD') return; // не на TD? Тоді нас не цікавить
    const cashText = target.innerHTML;
    highlight(target); // замінити td на textarea

    leftButton = new Button('ЗГОДА').createButton();
    rightButton = new Button('ВІДМІНА').createButton();
    leftButton.classList.add('buttonLeft');
    rightButton.classList.add('buttonRight');
    leftButton.setAttribute('type', 'left');
    rightButton.setAttribute('type', 'right');
    target.appendChild(leftButton);
    target.appendChild(rightButton);
    target.onclick = function (event) {
        let subject = event.target;
        if (subject.getAttribute('type') == 'left') {
            target.innerHTML = selectedTd.children[0].value;
            selectedTd = '';
            leftButton = '';
            rightButton = '';
        }
        else if (subject.getAttribute('type') == 'right') {
            target.innerHTML = cashText;
            selectedTd = '';
            leftButton = '';
            rightButton = '';
        }
    }
}
function highlight(td) {
    selectedTd = new Textarea(td.innerHTML).createTextarea();
    selectedTd.children[0].classList.add('editHTML');
    td.textContent = '';
    td.append(selectedTd);
}