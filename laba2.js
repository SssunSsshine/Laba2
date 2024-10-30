/*На странице генерируются карточки с объектами, которые можно отнести к категории "съедобное" или "несъедобное". 
Справа и слева от объекта находятся блоки "съедобное" и "несъедобное". Карточка с объектом должна быть перенесена либо влево либо вправо мышкой. 
Игра начинается по нажатию на кнопку "Старт". Изначально пользователю дается 20 секунд. За каждый правильный ответ он получает +5 секунд, за каждый неверный -5 секунд. 
Если время истекло, игра заканчивается и пользователю выводится статистика с количеством верных и неверных ответов. 
Игру также можно досрочно завершить нажатием кнопки "Завершить".
а) Карточки с объектами находятся статично по центру. Блоки "Съедобное" и "Несъедобное" могут случайным образом поменяться местами (а могут и не поменяться) после 
правильного перетаскивания туда объекта.
 */

"use strict";

//Вывод рандомного элемента
function getRandElem(){
    /*const images = {
        food1:"/food1.png", 
        food2:"/food2.png", 
        food3:"/food3.png",
        food4:"/food4.png",
        notfood1:"/notfood1.png",
        notfood2:"/notfood2.png",
        notfood3:"/notfood3.png",
        notfood4:"/notfood4.png",
    }*/
    const images = ["/food1.png", "/food2.png", "/food3.png","/food4.png","/notfood1.png","/notfood2.png","/notfood3.png","/notfood4.png"];
    let image = document.createElement('img');
    let numRand;

    numRand = Math.floor(images.length * Math.random());
    image.src = "../Laba2" + images[numRand];
    document.querySelector(`.box`).append(image);
    image.classList.add(`draggable`);
    image.draggable = true;
    
    if (images[numRand].includes("/food")){
        image.dataset.type = "isfood";
    }
    else{
        image.dataset.type = "notfood";
    }
}

//Изменение расположения на странице элементов списка dropElements
function changeOrd(dropElements){
    if (Math.random() < 0.5){
        let el1 = dropElements[0];
        let el2 = dropElements[1];
        let ml1 = getComputedStyle(el1).marginLeft;
        let mt1 = getComputedStyle(el1).marginTop;
        el1.style.marginLeft = getComputedStyle(el2).marginLeft;
        el1.style.marginTop = getComputedStyle(el2).marginTop;
        el2.style.marginTop = mt1;
        el2.style.marginLeft = ml1;
    }
}

function main(){
    const buttonRun = document.getElementById("runButton");
    const buttonEnd = document.getElementById("endButton");
    const list = document.querySelector(`.box`);
    let time = 20;
    let dragged;
    let rightAns = 0;
    let wrongAns = 0;

    //Запоминает перетаскиваемый элемент 
    list.addEventListener('dragstart', function(event) {
        dragged = event.target;
    });

    list.addEventListener('dragover', function(evt) {
        if (evt.target.classList.contains("droppable")){
            evt.preventDefault();
        }
    });

    list.addEventListener('dragend', function(){
        dragged = null;
    });

    //Сбрасывание элемента с проверкой на корректность
    list.addEventListener("drop", function(event) {
        if (event.target.classList.contains(`trash`) && dragged.dataset.type.includes("not") || 
            event.target.classList.contains(`plate`) && dragged.dataset.type.includes("is"))
        {
            time+=5;
            rightAns++;
            const dropElements = list.querySelectorAll(`.droppable`);
            changeOrd(dropElements);
        }
        else{
            time+=-5;
            wrongAns++;
        }
        dragged.remove();
        getRandElem();
    });

    //Нажатие кнопки запуска с включением таймера, вывод результатов по окончании времени
    buttonRun.addEventListener('click', function(){
            const timerShow = document.getElementById("timer");
            getRandElem();
            buttonRun.disabled = true;
            buttonEnd.disabled = false;
            let timer = setInterval(function(){
                if (time<=0){
                    clearInterval(timer);
                    alert("GAME OVER\n"+"Right answers: " + rightAns + "\nWrong answers: " + wrongAns);
                    time = 20;
                    rightAns = 0;
                    wrongAns = 0;
                    timerShow.innerHTML = time;
                    document.querySelector(`.draggable`).remove();
                    buttonEnd.disabled = true;
                    buttonRun.disabled = false;
                }
                else{
                    timerShow.innerHTML = time;
                }
                --time;
            },1000);
    });

    //Нажатие кнопки завершения
    buttonEnd.addEventListener('click',function(){
        time = 0;
    });
}

main();