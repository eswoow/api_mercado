var api = `https://fakestoreapi.com/products`;
var carrinho = [];
var stars = 0;
var carrinhoAberto = false;
var respJson;

async function onLoad(){
    let productsCount = 20;
    let products = [];

    var resp = await fetch(api);
    respJson = await resp.json();
    var nomeProd;
    for (let i = 0; i < 20; i++) {
        let produto = respJson[i];
        criarDivs(produto);
    }
}
function criarDivs(info){
    const div_prod = document.querySelector(".produtos");

    const produto_div = document.createElement("div");
    const produto_nome = document.createElement("h4");
    const produto_img = document.createElement("img");
    const preco = document.createElement("p");
    const descript_prod = document.createElement("p");
    const button_carrinho = document.createElement("button");

    const classif_div = document.createElement("div");
    const nota_div = document.createElement("div");
    const aval = document.createElement("p");


    let roundRate = parseInt(info.rating.rate);

    for (let i = 1; i <= 5; i++) {
        if (i <= roundRate){
            let rating = document.createElement("i");
            rating.className = "bi bi-star-fill";
            classif_div.appendChild(rating);
        }else{
            let notRated = document.createElement("i");
            notRated.className = "bi bi-star";
            classif_div.appendChild(notRated)
        }
    }


    produto_div.className = "div-produto";

    produto_nome.innerHTML = info.title;
    produto_img.src = info.image;
    preco.innerHTML = `R$${info.price}`;
    descript_prod.innerHTML = info.description;
    aval.innerHTML = `Avaliações: ${info.rating.count}`;
    button_carrinho.innerHTML = "Adicionar ao carrinho";
    button_carrinho.addEventListener('click', function(){
        adicionarAoCarrinho(info.title, info.price);
    });

    produto_div.appendChild(produto_nome);
    produto_div.appendChild(produto_img);
    produto_div.appendChild(produto_nome);
    produto_div.appendChild(classif_div);
    produto_div.appendChild(preco);
    produto_div.appendChild(descript_prod);
    produto_div.appendChild(button_carrinho);

    classif_div.appendChild(aval);

    div_prod.appendChild(produto_div);
}
function abrirCarrinho(){
    carrinhoAberto = !carrinhoAberto;
    if(carrinhoAberto === true){
        document.getElementById("carrinho").style.display = "none";
    }else{
        document.getElementById("carrinho").style.display = "block";
    }
}
function atualizarCarrinho(){
    let textCarrinho = document.getElementById("textCarrinho");
    if(carrinho.length === 0){
        textCarrinho.innerHTML = "Está vazio!";
    }else{
        textCarrinho.innerHTML = "";
        for (let index = 0; index < carrinho.length; index++) {
            textCarrinho.innerHTML += `${index + 1} | ${carrinho[index]} | <button onclick="removerProd(${index})">Remover</button><br>`;
        }
    }
}
function adicionarAoCarrinho(nome, preco){
    carrinho.push(`${nome} | R$${preco}`);
    atualizarCarrinho();
}
function removerProd(id){
    carrinho.splice(id, 1);
    atualizarCarrinho();
}