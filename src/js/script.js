const arrow = document.querySelectorAll(".arrow");
const listaFilme = document.querySelectorAll(".lista-filme");

arrow.forEach((arrow, i) => {
    const itemNumero = listaFilme[i].querySelectorAll("img").length;
    let clickContador = 0;
    arrow.addEventListener("click", () => {
        clickContador++;
        if(itemNumero - (3+clickContador) > 0) {
            listaFilme[i].style.transform = `translateX(${
                listaFilme[i].computedStyleMap().get("transform")[0].x.value - 300
            }px)`;
        }
        else {
            listaFilme[i].style.transform = "translateX(0)";
            clickContador = 0;
        }
    });

    console.log(listaFilme[i].querySelectorAll("img").length);
});

/* LOGICA DO QUIZ */

const perguntas = [
    {
        pergunta: "Você está em casa e o telefone toca. Uma voz mascarada começa a fazer perguntas bizarras e ameaçadoras. O que você faz?",
        respostas: [
            { id: 1, text: "Tenta conversar para ganhar tempo.", correct:1},
            { id: 2, text: "Desliga e vai atrás de armas.", correct:0},
            { id: 3, text: "Desliga imediatamente e chama a polícia.", correct:2},
            { id: 4, text: "Ignora e acha que é brincadeira.", correct:0},
        ]
    },
    {
        pergunta: "Durante uma festa, as luzes se apagam repentinamente e começam a aparecer mensagens ameaçadoras nas paredes. Qual a sua reação?",
        respostas: [
            { id: 1, text: "Encaro a situação com coragem e vou atrás do culpado.", correct:0},
            { id: 2, text: "Procuro a saída mais próxima em silêncio.", correct:2},
            { id: 3, text: "Fico parado, assustado.", correct:0},
            { id: 4, text: "Tento juntar um grupo para se proteger.", correct:1},
        ]
    },
    {
        pergunta: "Alguém está te seguindo até sua casa à noite e você percebe que está com o celular sem bateria. O que você faz?",
        respostas: [
            { id: 1, text: "Tento encontrar um lugar seguro na vizinhança.", correct:1},
            { id: 2, text: "Chamo ajuda gritando.", correct:0},
            { id: 3, text: "Enfrento o perseguidor.", correct:0},
            { id: 4, text: "Corro para dentro e tranco todas as portas.", correct:2},
        ]
    },
]

const perguntaElemento = document.getElementById("pergunta");
const botaoResposta = document.getElementById("botoes-resposta");
const botaoProximo = document.getElementById("proximo")

let perguntaAtuaIndex = 0;
let pontuacao = 0;

function startQuiz() {
    perguntaAtuaIndex = 0;
    pontuacao = 0;
    botaoProximo.innerHTML = "Próxima";
    mostrarPergunta();
}

function resetState() {
    botaoProximo.style.display = "none";
    while (botaoResposta.firstChild) {
        botaoResposta.removeChild(botaoResposta.firstChild);
    }
}

function mostrarPergunta() {
    resetState();
    let perguntaAtual = perguntas[perguntaAtuaIndex];
    let perguntaNo = perguntaAtuaIndex + 1;
    perguntaElemento.innerHTML = perguntaNo + ". " + perguntaAtual.pergunta;

    perguntaAtual.respostas.forEach((resposta) => {
        const botao = document.createElement("button");
        botao.innerHTML = resposta.text;
        botao.dataset.id = resposta.id;
        botao.classList.add("btn");
        botao.addEventListener("click", selectAnswer);
        botaoResposta.appendChild(botao);
    })
}

function selectAnswer(e) {
    const respostas = perguntas[perguntaAtuaIndex].respostas;
    const selectedBtn = e.target;
    const selectedId = Number(selectedBtn.dataset.id);
    const respostaSelecionada = respostas.find(r => r.id === selectedId);
    if (respostaSelecionada.correct === 2) {
        selectedBtn.classList.add("correto");
        pontuacao += 2;
    } 
    else if (respostaSelecionada.correct === 1) {
        selectedBtn.classList.add("meio-correto");
        pontuacao += 1;
    } 
    else {
        selectedBtn.classList.add("incorreto");
    }

    Array.from(botaoResposta.children).forEach((botao) => {
        botao.disabled = true;
    });

    botaoProximo.style.display = "block";
}


function mostrarPontuacao() {
    resetState();
    let resultadoTexto = "";

    if (pontuacao === perguntas.length * 2) {
        resultadoTexto = "Parabéns! Você não seria uma vítima!";
    } else if (pontuacao >= 2 && pontuacao < perguntas.length * 2) {
        resultadoTexto = "Cuidado! Talvez você fosse uma vítima…";
    } else {
        resultadoTexto = "Infelizmente, você seria a próxima vítima!";
    }

    perguntaElemento.innerHTML = resultadoTexto;
    botaoProximo.innerHTML = "Jogar novamente";
    botaoProximo.style.display = "block";
}

function handleNextButton() {
    perguntaAtuaIndex++;
    if (perguntaAtuaIndex < perguntas.length) {
        mostrarPergunta();
    }
    else {
        mostrarPontuacao();
    }
}

botaoProximo.addEventListener("click", () => {
    if (perguntaAtuaIndex < perguntas.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();