const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
    },
}

//escole o quadrado aleatorio para sortear o inimigo
function randomSquare() {
    state.view.squares.forEach((square) => {
        //remove a classe enemy 
        square.classList.remove("enemy")
    });
    //gera 9 numero aleatorios inteiros de 1 a 9
    let randomNumber = Math.floor(Math.random() * 9);
    //pega o numero aleatorio e escolhe o quadrado corresnpondente ao numero
    let randomSquare = state.view.squares[randomNumber];
    //adiciona a classe enemy no quadrado aleatorio
    randomSquare.classList.add("enemy")
    //guarda a posicao do quadrado aleatorio
    state.values.hitPosition = randomSquare.id
}
//move o enemy para o quadrado aleatorio
function moveEnemy() {
    //define um intervalo para mover o enemy
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

// Verifica se o quadrado que estamos clicando eh o mesmo quadrado que tem um inimigo
function addListenerHitBox() {
    state.view.squares.forEach((square)=> {
        //define um evento para quando o mouse ser clicado
        square.addEventListener("mousedown", () => {
            //verifica se o lugar clicado tem um enemy
            if(square.id === state.values.hitPosition){
                //adiciona +1 no resultado
                state.values.result++
                //altera a visualisacao do score
                state.view.score.textContent = state.values.result;
                //nao deixa o usuario clicar mais de uma vez na caixa 
                state.values.hitPosition = null;
            }
        })
    })
}

//modo que inicio o programa
function init() {

    moveEnemy();
    addListenerHitBox();
}

init()