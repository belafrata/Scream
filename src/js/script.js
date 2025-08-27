const arrow = document.querySelectorAll(".arrow");
const listaFilme = document.querySelectorAll(".lista-filme");

arrow.forEach((arrow, i) => {
    const itemNumero = listaFilme[i].querySelectorAll("img").length;
    let clickContador = 0;
    arrow.addEventListener("click", () => {
        clickContador++;
        if(itemNumero - (4+clickContador) > 0) {
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