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
            { id: 1, text: "Tenta conversar para ganhar tempo.", correct:false},
            { id: 2, text: "Desliga e vai atrás de armas.", correct:false},
            { id: 3, text: "Desliga imediatamente e chama a polícia.", correct:true},
            { id: 4, text: "Ignora e acha que é brincadeira.", correct:false},
        ]
    },
    {
        pergunta: "Durante uma festa, as luzes se apagam repentinamente e começam a aparecer mensagens ameaçadoras nas paredes. Qual a sua reação?",
        respostas: [
            { id: 1, text: "Encaro a situação com coragem e vou atrás do culpado.", correct:false},
            { id: 2, text: "Procuro a saída mais próxima em silêncio.", correct:true},
            { id: 3, text: "Fico parado, assustado.", correct:false},
            { id: 4, text: "Tento juntar um grupo para se proteger.", correct:false},
        ]
    },
    {
        pergunta: "Alguém está te seguindo até sua casa à noite e você percebe que está com o celular sem bateria. O que você faz?",
        respostas: [
            { id: 1, text: "Tento encontrar um lugar seguro na vizinhança.", correct:false},
            { id: 2, text: "Chamo ajuda gritando.", correct:false},
            { id: 3, text: "Enfrento o perseguidor.", correct:false},
            { id: 4, text: "Corro para dentro e tranco todas as portas.", correct:true},
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
    respostas = perguntas[perguntaAtuaIndex].respostas;
    const respostaCorreta = respostas.filter((resposta) => resposta.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == respostaCorreta.id;
    if (isCorrect) {
        selectedBtn.classList.add("correto");
        pontuacao++;
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
    perguntaElemento.innerHTML = `Você acertou ${pontuacao} de ${perguntas.length}!`;
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