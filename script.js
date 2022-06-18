const types = [ //array com todos os tipos de parrot possíveis
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];
let number = 0; //numero de cartas declarado pelo player
let selected = []; //array duas posicoes contendo as cartas viradas na jogada atual
let plays = 0; //numero de jogadas, vezes que se virou uma carta
let points = 0; //numero de pares já encontrados
let time = 0; //contador de tempo do bonus
let timerId = 0; //identificador para reset do timer de jogo


//funcao copiada do Notion para aleatoriedade
function comparador() { 
	return Math.random() - 0.5; 
}
//cria array de pares de parrot embaralhados usado para gerar as cartas já embaralhadas
function createRandomPairList(number) {
    let list = [];
    let j = 0;
    for (let i=0;i<number;i=list.length) {
        list.push(types[j]);
        list.push(types[j]);
        j++
    }
    return list.sort(comparador);
}
//usa array de pares embaralhados para gerar as cartas no DOM e reseta o timer
function createCards(cards) {
    document.querySelector("div.timer").innerHTML = '0';
    document.querySelector(".game").innerHTML = '';
    for (let i=0;i<cards.length;i++) {
        document.querySelector(".game").innerHTML += `
            <div class="${cards[i]}" onclick="selectCard(this);" data-identifier="card">
                <div class="back" data-identifier="back-face">
                    <img src="images/back.png">
                </div>
                <div class="front" data-identifier="front-face">
                    <img src="images/${cards[i]}.gif">
                </div>
            </div>        
        `;
    }
}

//desvira as cartas no caso de par errado
function unturnWrongCards() {
    selected[0].classList.remove('turned');
    selected[1].classList.remove('turned');
    selected = [];
}

//contador de tempo de jogo
function addTime() {
    document.querySelector("div.timer").innerHTML = '0';
    time++;
    document.querySelector("div.timer").innerHTML = `${time}`;
}


//funcao que inicializa o jogo perguntando numero de cartas
function initGame() { 
    number = prompt('Quantidade de cartas (Número par de 4 a 14):');
    if (number%2 != 0 || number < 4 || number > 14 || isNaN(number))
        initGame();
    
    selected = [];
    plays = 0;
    points = 0;
    time = 0;

    let cards = createRandomPairList(number);
    createCards(cards);
    timerId = setInterval(addTime,1000);
}
//funcao que finaliza o jogo e reseta para o novo inicio caso desejado
function endGame () {
    clearInterval(timerId);
    alert(`Você ganhou em ${plays} jogadas depois de ${time}s!`);
    let reset = prompt("Reiniciar a partida? (sim ou não)");
    if (reset === 'sim')
        initGame();
    else if (reset === 'não')
        alert("Que peninha... ;)");
    else
        endGame();
}


//funcao chamada pelo clique em uma carta, vira as cartas, compara os pares e monitora fim de jogo
function selectCard (card) {

    if (selected [1] == null) { //impede que uma carta seja selecionada antes que um par errado seja virado de volta a posicao inicial
        if (!card.classList.contains("turned")) { //impede o duplo click na mesma carta ou em alguma já virada de um par correto
            card.classList.add('turned');
            plays++;

            if (selected[0] == null) //verifica se a selecionada é a primeira carta virada da jogada ou a segunda carta
                selected[0] = card;

            else { // no caso de já ser a segunda carta inicia as comparacoes
                selected [1] = card;

                if (selected[0].classList.value === selected[1].classList.value) { //verifica se as viradas são um par ou não
                    selected = [];
                    points++;
                } else {
                    setTimeout(unturnWrongCards, 1000);
                }

                if (points == number/2) //verifica se todos os pares já foram encontrados
                    setTimeout(endGame,500);
            }
        }
    }
}

initGame();