
//o objetivo dessa função específica é, exatamente, não fazer nada, quando o usuário digita enter no formulário, não terá ação alguma, precisará clicar em consultar
function doNothing() {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}
//realiza a pesquisa no endpoint da API com base no nome recebido da função createList
async function loadRepositories(nome) {
    var script = 'https://pokeapi.co/api/v2/pokemon/' + nome;
    const response = await fetch(script);
    const repositories = response.json();
    
    if (response.status == 200){
        //retorna todas informações daquele endpoint cm uma variável repositories para utilizar na função createList
        return repositories;
    } else {
        //caso não seja 200 o status da resposta, indicará que o nome do pokemon não foi localizado
        alertError.innerHTML = "";
        alertError.innerHTML += `<h1><center> POKEMON NÃO LOCALIZADO </center></h1>`;
    }
}

async function createList(nome) {
    //apaga os valores que já foram acrescentados
    atributoHP.innerHTML = "";
    atributoImagem.innerHTML = "";
    atributoAtaqueEspecial.innerHTML = "";
    atributoAtaque.innerHTML = "";
    atributoDefesaEspecial.innerHTML = "";
    atributoVelocidade.innerHTML = "";
    atributoDefesa.innerHTML = "";
    atributoNome.innerHTML = "";
    alertError.innerHTML = "";
    
    //coloca o nome digitado pelo usuário todo em letra minúscula para API reconhecer
    nome = nome.toLowerCase();

    //faz a busca no repositório e atribui um json completo na variável repositoriesList
    let repositoriesList = await loadRepositories(nome);
  
    //com base na busca do repositório, inclui nos campos da tabela específica, os dados pré-selecionados
    atributoNome.innerHTML += `<h1><center><div id="pokemonAtual">${repositoriesList.forms[0].name.toUpperCase()}</div></center></h1>`;
    atributoHP.innerHTML += `<center> HP: ${repositoriesList.stats[0].base_stat}</center>`;
    atributoAtaque.innerHTML += `<center> ATAQUE: ${repositoriesList.stats[1].base_stat}</center>`;
    atributoDefesa.innerHTML += `<center> DEFESA: ${repositoriesList.stats[2].base_stat}</center>`;
    atributoAtaqueEspecial.innerHTML += `<center> ATAQUE ESPECIAL: ${repositoriesList.stats[3].base_stat}</center>`;
    atributoDefesaEspecial.innerHTML += `<center> DEFESA ESPECIAL: ${repositoriesList.stats[4].base_stat}</center>`;
    atributoVelocidade.innerHTML += `<center> VELOCIDADE: ${repositoriesList.stats[5].base_stat}</center>`;
    atributoImagem.innerHTML += `<img src="${repositoriesList.sprites.other.home.front_default}">`
}

async function next() {
    var pokemonAtual = document.getElementById("pokemonAtual");
    if (pokemonAtual == null){
        alertError.innerHTML = "";
        alertError.innerHTML += `<h1><center> PRIMEIRO CONSULTE UM POKEMON </center></h1>`;
    } else {
        pokemonAtual = pokemonAtual.innerText
        pokemonAtual = pokemonAtual.toLowerCase();
        let getNumberID = await loadRepositories(pokemonAtual);
        if (getNumberID.id == 898){
            getNumberID.id = 0;
        }
        let nextLoadName = await loadRepositories(getNumberID.id+1);
        nextLoadName = nextLoadName.forms[0].name
        createList(nextLoadName)
    }
}

async function previous(nome) {
    var pokemonAtual = document.getElementById("pokemonAtual");
    if (pokemonAtual == null){
        alertError.innerHTML = "";
        alertError.innerHTML += `<h1><center> PRIMEIRO CONSULTE UM POKEMON </center></h1>`;
    } else {
        pokemonAtual = pokemonAtual.innerText
        pokemonAtual = pokemonAtual.toLowerCase();
        let getNumberID = await loadRepositories(pokemonAtual);
        if (getNumberID.id == 1){
            getNumberID.id = 899;
        }
        let nextLoadName = await loadRepositories(getNumberID.id-1);
        nextLoadName = nextLoadName.forms[0].name
        createList(nextLoadName)
    }
}

async function save() {
    var pokemonAtual = document.getElementById("pokemonAtual");
    var collection = document.getElementById("atualCollection");
    alertError.innerHTML = "";
    if (pokemonAtual == null){
        alertError.innerHTML += `<h1><center> PRIMEIRO CONSULTE UM POKEMON </center></h1>`;
    }
    if (collection == null){
        alertError.innerHTML += `<h1><center> INSIRA UM NOME PARA O SEU ALBUM </center></h1>`;
    } 
}

function defAlbum(collectionName) {
    if (collectionName != ""){
        collectionName = collectionName.toUpperCase();
        atualAlbum.innerHTML = "";
        atualAlbum.innerHTML += `SEU ALBUM ATUAL É "<span id="atualCollection">${collectionName}</span>"`;
    }    
}

function save() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "{\r\n    \"nomePokemon\": \"Digimon\",\r\n    \"numeroPokemon\": 1024,\r\n    \"velocidade\": 222,\r\n    \"hp\": 222,\r\n    \"ataque\": 222,\r\n    \"defesa\": 222,\r\n    \"ataqueEspecial\": 222,\r\n    \"defesaEspecial\": 222,\r\n    \"linkDaFoto\": \"https://www.google.com\",\r\n}";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/pokemons/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}