const field = document.querySelector('.field');
const heroes = document.querySelectorAll('.draggable')
heroes.forEach(function (hero) {
    var shiftX, shiftY; // зсув відносно курсора миші
    // // Функція для обробки події mousedown
    function onMouseDown(event) {
        shiftX = event.clientX - hero.getBoundingClientRect().left;
        shiftY = event.clientY - hero.getBoundingClientRect().top;

        hero.style.position = 'absolute';
        hero.style.zIndex = 1000;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }

    // Функція для обробки події mousemove
    function onMouseMove(event) {

        var newX = event.clientX - shiftX;
        var newY = event.clientY - shiftY;

        var newBottom = newY + hero.offsetHeight;
        var newRight = newX + hero.offsetWidth;

        // Перевіряємо, чи не виходить елемент за межі вікна
        if (newBottom > window.innerHeight) {
            newY = window.innerHeight - hero.offsetHeight;
        }
        if (newRight > window.innerWidth) {
            newX = window.innerWidth - hero.offsetWidth;
        }
        if (newY < 0) { newY = 0; }
        if (newX < 0) { newX = 0; }

        hero.style.left = newX + 'px';
        hero.style.top = newY + 'px';
    }

    // Застосовуємо обробник подій mousedown до елемента
    hero.onmousedown = onMouseDown;

    // Зупиняємо запуск випадкового перетягування при натисканні на текст
    hero.ondragstart = function () {
        return false;
    };

    // Оновлюємо положення елемента при зміні розміру вікна
    window.onresize = function () {
        var pageX = parseInt(hero.style.left);
        var pageY = parseInt(hero.style.top);

        var newX = Math.min(pageX, window.innerWidth - hero.offsetWidth);
        var newY = Math.min(pageY, window.innerHeight - hero.offsetHeight);

        hero.style.left = newX + 'px';
        hero.style.top = newY + 'px';
    };
}); // Вистраждано за допомогою copilot, і все ж не до кінця правильно


// Рішення javascript.info


// let isDragging = false;

// document.addEventListener('mousedown', function (event) {

//     let dragElement = event.target.closest('.draggable');

//     if (!dragElement) return;

//     event.preventDefault();

//     dragElement.ondragstart = function () {
//         return false;
//     };

//     let coords, shiftX, shiftY;

//     startDrag(dragElement, event.clientX, event.clientY);

//     function onMouseUp(event) {
//         finishDrag();
//     };

//     function onMouseMove(event) {
//         moveAt(event.clientX, event.clientY);
//     }

//     // на початку переміщення елемента:
//     //  зберегаємо місце кліку по елементу
//     //  перемикаємо позиціонування елемента (position: fixed) і рухаємо елемент
//     function startDrag(element, clientX, clientY) {
//         if (isDragging) {
//             return;
//         }

//         isDragging = true;

//         document.addEventListener('mousemove', onMouseMove);
//         element.addEventListener('mouseup', onMouseUp);

//         shiftX = clientX - element.getBoundingClientRect().left;
//         shiftY = clientY - element.getBoundingClientRect().top;

//         element.style.position = 'fixed';

//         moveAt(clientX, clientY);
//     };

//     // перемикаємося назад на абсолютні координати щоб закріпити елемент відносно документа
//     function finishDrag() {
//         if (!isDragging) {
//             return;
//         }

//         isDragging = false;

//         dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
//         dragElement.style.position = 'absolute';

//         document.removeEventListener('mousemove', onMouseMove);
//         dragElement.removeEventListener('mouseup', onMouseUp);
//     }

//     function moveAt(clientX, clientY) {
//         // обчислюємо нові координати (відносно вікна)
//         let newX = clientX - shiftX;
//         let newY = clientY - shiftY;

//         // перевіряємо, чи не виходять нові координати за нижній край вікна:
//         let newBottom = newY + dragElement.offsetHeight; // нові координати

//         // виходять за межі вікна? прокручуємо сторінку
//         if (newBottom > document.documentElement.clientHeight) {
//             // координата нижнього краю документа щодо вікна
//             let docBottom = document.documentElement.getBoundingClientRect().bottom;

//             // прокрутка документа на 10px вниз має проблему --
//             // він може прокрутити документ за його межі,
//             // тому використовуємо Math.min (відстань до кінця, 10)
//             let scrollY = Math.min(docBottom - newBottom, 10);

//             // обчислення можуть бути не зовсім точні -- трапляються помилки при округленні,
//             // які призводять до негативного значенням прокрутки. Відфільтруємо їх:
//             if (scrollY < 0) scrollY = 0;

//             window.scrollBy(0, scrollY);

//             // швидке переміщення миші може помістити курсор за межі документа вниз
//             // якщо це сталося -
//             // обмежуємо нове значення Y максимально можливим, виходячи з розміру документа:
//             newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
//         }

//         // перевіряємо, чи не переходять нові координати за верхній край вікна (за схожим алгоритмом)
//         if (newY < 0) {
//             // scroll up
//             let scrollY = Math.min(-newY, 10);
//             if (scrollY < 0) scrollY = 0; // перевіряємо помилки точності

//             window.scrollBy(0, -scrollY);
//             // швидке переміщення миші може помістити курсор за межі документа зверху
//             newY = Math.max(newY, 0); // newY не може бути менше нуля
//         }


//         // обмежимо newX розмірами вікна
//         // згідно з умовою, горизонтальна прокрутка відсутня, тому це не складно:
//         if (newX < 0) newX = 0;
//         if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
//             newX = document.documentElement.clientWidth - dragElement.offsetWidth;
//         }

//         dragElement.style.left = newX + 'px';
//         dragElement.style.top = newY + 'px';
//     }

// });
