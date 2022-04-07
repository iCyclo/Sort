const btnGenerate = document.querySelector('#generate');
const btnSort = document.querySelector('#sort');
const container = document.querySelector('.numbers')
const methods = document.querySelector('#methods')
const MAXNUMBERS = 5;

let generated = false;
let numbers = []

const timeline1 = gsap.timeline();
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
        x: -distance
    })

    let aux = numbers[actual];
    numbers[actual] = numbers[next];
    numbers[next] = aux;


    let temp = divActual.id
    divActual.id  = divNext.id;
    divNext.id = temp;


    return new Promise(resolve =>{
        setTimeout(()=>{
            drawBoxes()
            resolve(numbers);
        },1000);
    })
}


async function bubbleSort() {

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (numbers[j] > numbers[j + 1]) {
                let print =await swap(j, j + 1);
                console.log(print);
            }
        }
    }
}

async function selectionSort(){
    for(let i = 0; i < numbers.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < numbers.length; j++) 
            if(numbers[j]< (numbers[min])) 
                min = j;
            await swap(min, i);
    }
}

async function insertionSort(){
    for(let i = 1; i < numbers.length; i++) {
        let itemKey = numbers[i];
        let j = i - 1;
        
        while(j >= 0 && [j]>(itemKey)) {
            numbers[j + 1] = numbers[j];
            j--;
        }
        numbers[j + 1] = itemKey;
    }   
}

function doSort() {
    quick(0, numbers.length - 1);
}

async function quick(low, high) {
    if(low < high) {
        let partition = doPartition(low, high);
        quick(low, partition - 1);
        quick(partition + 1, high);
    }
}

async function doPartition(low,high) {
    let pivot = numbers[high];
    let i = low - 1;
    for(let j = low; j <= high - 1; j++) {
        if(numbers[j]<(pivot)) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, high);
    return i + 1;
}

async function quickSort(){
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

    if(methods.value==0){
        swal({
            title: "Seleccion invalida",
            text: "Seleccione un metodo de ordenacion para continuar",
            icon: "error"
        })
        return;
    }

    if(generated===false){
        swal({
            title: "No hay numeros",
            text: "Genere numeros para ordenarlos",
            icon: "warning"
        })
        return;
    }
    if(methods.value==1){
        bubbleSort();
    }else if(methods.value==2){
        selectionSort();
    }else if(methods.value==3){
        swal({
            title: "No disponible",
            text: "Disponible proximamente",
            icon: "info"
        })
    }else{
        swal({
            title: "No disponible",
            text: "Disponible proximamente",
            icon: "info"
        })
    }
    
    
});
