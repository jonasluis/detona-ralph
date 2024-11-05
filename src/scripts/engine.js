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
        currentTime: 60,
    },
    actions: {
        //define um intervalo para diminuir o tempo
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    //diminui 1 segundo
    state.values.currentTime--;
    //altera a visualisacao do time
    state.view.timeLeft.textContent = state.values.currentTime;

    //alerta quando o tempo acabar
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("O tempo acabou! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioHit) {
    //pega o som
    let audio = new Audio(`./src/audios/${audioHit}.m4a`)
    //define o volume
    audio.volume = 0.1;
    //toca o audio
    audio.play()
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
                //toca o som quando o enemy for clicado
                playSound("hit")
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