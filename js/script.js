var api = `https://fakestoreapi.com/products`;
var carrinho = [];
var stars = 0;
var carrinhoAberto = true;
var respJson;
//mapa
var map = L.map('map').setView([-12.97791518403115, -38.50249779043481], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var markerUserPosition = L.marker();
var markerSalvador = L.marker().setLatLng([-12.97791518403115, -38.50249779043481]).addTo(map);
var hasClicked = false;
var pontos = [];
var linha = L.polyline(pontos, {color: 'red'}).addTo(map);
var locStr = "";

function onMapClick(e){
    var latlngs = [[-12.97791518403115, -38.50249779043481], e.latlng];
    locStr = `${e.latlng}`;
    locStr = locStr.replaceAll("LatLng", "");
    locStr = locStr.replaceAll("(", "lat=");
    locStr = locStr.replaceAll(")", "");
    locStr = locStr.replaceAll(", ", "&lon=");
    localEntrega();
    markerUserPosition.setLatLng(e.latlng).addTo(map);
    pontos = [];
    pontos.push(latlngs);
    linha.setLatLngs(pontos);
}

map.on('click', onMapClick);    
async function localEntrega(){
    
    let api = `https://nominatim.openstreetmap.org/reverse?format=json&${locStr}`;
    const textCidade = document.getElementById("cidade");
    const textEstado = document.getElementById("estado");
    const textBairro = document.getElementById("bairro");
    const textRua = document.getElementById("rua");

    var res = await fetch(api);
    var resjson = await res.json();
    textCidade.innerHTML = `Cidade: ${resjson.address.city}`;
    textEstado.innerHTML = `Estado: ${resjson.address.state}`;
    textBairro.innerHTML = `Bairro: ${resjson.address.suburb}`;
    textRua.innerHTML = `Rua: ${resjson.address.road}`;
}
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
    let comprarCarrinho = document.getElementById("comprarCarrinho");

    if(carrinho.length === 0){
        textCarrinho.innerHTML = "Está vazio!";
        comprarCarrinho.style.display = "none";
    }else{
        textCarrinho.innerHTML = "";
        for (let index = 0; index < carrinho.length; index++) {
            textCarrinho.innerHTML += `${index + 1} | ${carrinho[index]} <button onclick="removerProd(${index})">Remover</button><br>`;
            comprarCarrinho.style.display = "block";
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
function comprar(){
    if (carrinho.length != 0){
        let resposta = window.confirm("Quer realizar a compra?");
        if (resposta == true){
            window.location.reload();
        }
    }else{
        alert("O carrinho está vazio.")
    }
}
function prepCompra(){
    var prepCompra = document.getElementById("preparandoCompra").scrollIntoView({behavior: "smooth"});
}