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
let selectedTd;

table.onclick = function (event) {
    let target = event.target; // де відбувся клік?

    if (target.tagName != 'TD') return; // не на TD? Тоді нас не цікавить

    highlight(target); // виділити TD
};

// todo
function highlight(td) {
    if (selectedTd) { // видалити наявне виділення, якщо таке є
        selectedTd.classList.remove('editHTML');
        selectedTd.innerHTML = selectedTd.textContent;
    }
    selectedTd = td;
    selectedTd.classList.add('editHTML'); // виділити новий td для редагування

    function addLineBreakBeforeBR(text) {
        // Замінюємо всі теги <br> на перенос рядка та <br>
        let newText = text.split('<br>').join('\n<br>');
        return newText;
    }

    selectedTd.textContent = addLineBreakBeforeBR(selectedTd.innerHTML);
    //alert(selectedTd.innerHTML)
}