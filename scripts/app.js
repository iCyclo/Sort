const btnGenerate = document.querySelector('#generate');
const btnSort = document.querySelector('#sort');
const container = document.querySelector('.numbers')
const MAXNUMBERS = 5;

let generated = false;
let numbers = []

const timeline1 = gsap.timeline({ onComplete: drawBoxes });
const timeline2 = gsap.timeline();

function randomNumber() {
    const number = Math.floor(Math.random() * (999 - 1) + 1);
    return number
}

function generateNumbers() {
    if (generated === true) {
        numbers = [];
    }
    for (let i = 0; i < MAXNUMBERS; i++) {
        numbers.push(randomNumber());
    }
}

function drawBoxes() {
    let i = 0;
    if (generated === true) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    numbers.forEach(number => {
        const box = document.createElement("DIV");
        box.textContent = number;
        box.className = 'number';
        box.id = "number" + i;
        container.appendChild(box)
        i++;
    });
    generated = true;
}

function swap(actual, next) {

    let idActual = `#number${actual}`;
    let idNext = `#number${next}`;
    let divActual = document.querySelector(idActual);
    let rectActual = divActual.getBoundingClientRect();
    let divNext = document.querySelector(idNext);
    let rectNext = divNext.getBoundingClientRect();
    let distance = rectNext.x - rectActual.x;
    timeline1.to(idActual, {
        duration: 1,
        x: distance
    })
    timeline2.to(idNext, {
        duration: 1,
        x: -distance,
    })
    let aux = numbers[actual];
    numbers[actual] = numbers[next];
    numbers[next] = aux;
    console.log(numbers);
}


function bubbleSort() {

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (numbers[j] > numbers[j + 1]) {
                swap(j, j + 1)
            }
        }
    }
}

btnGenerate.addEventListener('click', e => {
    if (generated === true) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    generateNumbers()
    drawBoxes();
});

btnSort.addEventListener('click', e => {

    bubbleSort();
});
