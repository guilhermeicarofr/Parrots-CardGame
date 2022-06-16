//funcao copiada do Notion
function comparador() { 
	return Math.random() - 0.5; 
}

//array com todos os tipos de papagaio
const types = ['bobrossparrot' , 'explodyparrot' , 'fiestaparrot' , 'metalparrot' , 'revertitparrot' , 'tripletsparrot' , 'unicornparrot'];

//funcoes de criação das cartas
function createRandomPairsList (number) {
    let list = [];
    let j = 0;
    for (let i=0;i<number;i=list.length) {
        list.push(types[j]);
        list.push(types[j]);
        j++
    }
    return list.sort(comparador);
}
function createCards (cards) {
    
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

//funcao que inicializa o jogo perguntando numero de cartas
function initGame (number) {
    if (number%2 != 0 || number < 4 || number > 14 || isNaN(number))
        initGame (prompt('Quantidade de cartas (Par de 4 a 14)'));
    
    let cards = createRandomPairsList(number);
    createCards(cards);
}

let selected = [];
//funcao chamada pelo clique em uma carta
function selectCard (card) {
    if (selected[0]==null)
        selected[0] = card.classList;

    else {
        selected [1] = card.classList;
        alert(selected);
        if (selected [0] === selected[1])
            card.remove();






        selected = [];
    }
}

initGame (prompt('Quantidade de cartas (Par de 4 a 14)'));