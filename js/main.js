/* Programação da lógica do jogo */

let order = []; // ordem aleatória das cores
let clickOrder = []; // ordem das cores selecionadas pelo jogador
let score = 0;

/* 0 - green | 1 - red | 2 - blue | 3 - yellow  */

/* Selecionar os elementos no HTML para as constantes das cores do jogo */
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

/* Usando a função Math.floor e Math.random  para criar a ordem aleatória das cores */
let shufflerColorOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickOrder = [];

    for (let i in order){
        let elementColor = createColorElement(order[i]);
        showColorSelected(elementColor, Number(i) +1);
    }
}
/*  Função de selecionar a cor para alterar a propriedade de opacidade no CSS */
let showColorSelected = (element, number) => {
    number*= 500;
    setTimeout(()=>{
        element.classList.add('selected');
    }, number -250);
    setTimeout(()=>{
        element.classList.remove('selected');
    });
}
/* Função para validar se a ordem clicada pelo jogador é a mesa que foi gerada aleatoriamente pelo jogo*/
let checkColorOrder = () =>{
    for(let i in clickOrder){
        if (clickOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if (clickOrder.length == order.length){
        alert(`Pontuação : ${score}\n Você acertou! Iniciando o próximo nível!`);
        nextLevel();
    }
}
/* Função da opção clicada pelo jogador */ 
let colorClick = (color) =>{
    clickOrder[clickOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkColorOrder();
    }, 250);    
}
/* Função que seu retorno é a cor */
let createColorElement = (color) => {
    switch(color){
        case 0:
            return green;
            break;
        case 1:
            return red;
            break;
        case 2:
            return blue;
            break;
        case 3:
            return yellow;
            break;
        default:
            alert('Nenhuma cor selecionada!')
    };
};
/* Função do próximo nível do jogo */
let nextLevel = () =>{
    score++;
    shufflerColorOrder();
}
/* Função do Game Over */
let gameOver = () => {
    alert(`Sua pontuação foi: ${score}!\n Você perdeu o jogo!\n Para inicar um 
    novo jogo clique no OK`);
    order = [];
    clickOrder = [];

    playGame();
}
/* Função para iniciar o jogo */
let playGame = () => {
    alert('Bem vindo ao Genius! Iniciando novo jogo...')
    score = 0;

    nextLevel();
}
/* Funções para receber o click da cor escolhida pelo jogador */
green.onclick = () => colorClick(0);
red.onclick = () => colorClick(1);
blue.onclick = () => colorClick(2);
yellow.onclick = () => colorClick(3);
