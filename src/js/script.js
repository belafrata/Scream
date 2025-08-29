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
        pergunta: "Você está sozinho(a) em casa e o telefone toca. A voz do outro lado é estranha e pergunta seu filme de terror favorito. O que você faz?",
        respostas: [
            { id: 1, text: "Brinco e respondo numa boa, vai que é trote.", correct:1},
            { id: 2, text: "Ignoro e continuo assistindo TV.", correct:0},
            { id: 3, text: "Desligo o telefone, fecho portas e chamo a polícia.", correct:2},
            { id: 4, text: "Respondo 'não gosto de terror' e saio pra caminhar.", correct:0},
        ]
    },
    {
        pergunta: "Durante uma festa, as luzes se apagam repentinamente e começam a aparecer mensagens ameaçadoras nas paredes. Qual a sua reação?",
        respostas: [
            { id: 1, text: "Encaro a situação com coragem e vou atrás do culpado.", correct:0},
            { id: 2, text: "Procuro a saída mais próxima em silêncio.", correct:2},
            { id: 3, text: "Fico parado, assustado.", correct:0},
            { id: 4, text: "Procuro meus amigos e sugiro irmos embora.", correct:1},
        ]
    },
    {
        pergunta: "Ghostface aparece na sua frente com uma faca. Qual a melhor reação?",
        respostas: [
            { id: 1, text: "Tento bater de frente, com o que tiver na mão.", correct:1},
            { id: 2, text: "Fico paralisado de medo.", correct:0},
            { id: 3, text: "Pergunto o que ele quer.", correct:0},
            { id: 4, text: "Corro o mais rápido que puder.", correct:2},
        ]
    },
    {
        pergunta: "O assassino diz que vai poupar sua vida se você entregar um amigo. O que você faz?",
        respostas: [
            { id: 1, text: "Tento enganar o assassino pra ganhar tempo.", correct:2},
            { id: 2, text: "Entrego na hora, quero viver.", correct:0},
            { id: 3, text: "Me sacrifico pra salvar o outro.", correct:1},
            { id: 4, text: "Entro em pânico e fico mudo.", correct:0},
        ]
    },
    {
        pergunta: "Você escapa do assassino, mas ele está desacordado no chão. O que faz?",
        respostas: [
            { id: 2, text: "Dou as costas e corro pra pedir ajuda.", correct:0},
            { id: 3, text: "Grito “tá morto!” e abraço meus amigos.", correct:0},
            { id: 4, text: "Confisco a arma dele e fico atento.", correct:2},
            { id: 1, text: "Chuto mais umas 3 vezes só pra garantir.", correct:1},
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

    if (pontuacao >= 8) {
        resultadoTexto = "Você vai pro próximo filme!";
    } else if (pontuacao >= 5) {
        resultadoTexto = "Você está meio machucado, né?";
    } else {
        resultadoTexto = "Você foi a primeira cena do filme...";
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