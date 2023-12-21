//Seleciona os elementos do HTML para serem manipulados
const tabEncriptar = document.getElementById("encriptar");
const tabDesencriptar = document.getElementById("desencriptar");
const tabFuncionamento = document.getElementById("funcionamento");
const sectionEncriptar = document.getElementById("sectionEncriptar");
const sectionDesencriptar = document.getElementById("sectionDesencriptar");
const sectionFuncionamento = document.getElementById("sectionFuncionamento");
const btnDefinir = document.getElementById("btn-Definir");
const h4One = document.getElementById("h4-1");
const h4Two = document.getElementById("h4-2");
const inputCypher = document.getElementById("input");
const textarea1 = document.getElementById("textarea1");
const btnRun1 = document.getElementById("btn-run1");
const btnRun2 = document.getElementById("btn-run2");
const textarea2 = document.getElementById("textarea2");
const textarea3 = document.getElementById("textarea3");
const textarea4 = document.getElementById("textarea4");
const tds = document.querySelectorAll("td");
const btnCopy1 = document.getElementById("btn-copy1");
const btnClear = document.getElementById("btn-clear");
const alerta = document.getElementById("container-alerta");

const numeroLetras = 25; //Tamnho da tabela da cifra
const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; //Alfabeto
/* let matriz = Array(5).fill( Array(5).fill("none") ); //Declara matriz vazia */
const matriz = [[], [], [], [], []]; //Declara matriz vazia

//Clique no botão encriptar
tabEncriptar.addEventListener("click", () => {
    //Troca para a section de encriptar
    try {
        tabDesencriptar.classList.add("deactive");
        tabEncriptar.classList.remove("deactive");
        tabFuncionamento.classList.add("deactive");
        sectionDesencriptar.classList.add("hide");
        sectionFuncionamento.classList.add("hide");
        sectionEncriptar.classList.remove("hide");
        sectionLogica.classList.remove("hide");
    }catch(e) {
    }
});

//Clique no botão desencriptar
tabDesencriptar.addEventListener("click", () => {
    //Troca para a section de desencriptar
    try {
        tabEncriptar.classList.add("deactive");
        tabDesencriptar.classList.remove("deactive");
        tabFuncionamento.classList.add("deactive");
        sectionDesencriptar.classList.remove("hide");
        sectionEncriptar.classList.add("hide");
        sectionFuncionamento.classList.add("hide");
        sectionLogica.classList.remove("hide");
    }catch(e) {
    }
});

//Clique no botão funcionamento
tabFuncionamento.addEventListener("click", () => {
    //Troca para a section de desencriptar
    try {
        tabEncriptar.classList.add("deactive");
        tabDesencriptar.classList.add("deactive");
        tabFuncionamento.classList.remove("deactive");
        sectionDesencriptar.classList.add("hide");
        sectionEncriptar.classList.add("hide");
        sectionFuncionamento.classList.remove("hide");
        sectionLogica.classList.add("hide");
    }catch(e) {
    }
});

//Clique no botão limpar
btnClear.addEventListener("click", () => {
    //Limpa todas as caixas de texto
    inputCypher.value = "";
    textarea1.value = "";
    textarea2.value = "";
    textarea3.value = "";
    textarea4.value = "";

    //Limpa a tabela da cifra
    tds.forEach((td) => {
        td.innerHTML = "";
    });

    //Limpa a tabela da cifra
    for(let x = 0; x < 5; x++) {
        for(let y = 0; y < 5; y++) {
            matriz[x][y] = undefined;
        }
    }

    ConfiguracaoAlerta("Tudo Limpo", "fa-circle-check", "verde"); //Mostra o alerta
});

//Clique no botão Copiar Texto
btnCopy1.addEventListener("click", () => {
    if(textarea2.value != "") {
        //Copia o texto para o cilpboard
        const text = textarea2.value;
        console.log(text);
        navigator.clipboard.writeText(text);

        ConfiguracaoAlerta("Texto copiado com sucesso", "fa-copy", "verde"); //Mostra o alerta
    }else {
        ConfiguracaoAlerta("Não é possível copiar o texto", "fa-triangle-exclamation", "laranja"); //Mostra o alerta
    }
});

//Clique no botão definir a chave da cifra
btnDefinir.addEventListener("click", () => {
    preencheTabelaCifra(); //Preenche a tabela da cifra
});

//Clique no botão encriptar
btnRun1.addEventListener("click", () => {
    const texto = textarea1.value; //Texto a ser encriptado

    //Mostra o alerta se o texto para encriptar estiver vazio
    if(!texto) {
        ConfiguracaoAlerta("Preencha o campo Texto para Encriptar", "fa-triangle-exclamation", "laranja");
        return;
    }

    const tabela = verificaTabela(); //Verifica se a tabela da cifra está preenchida

    //Mostra o alerta se a tabela da cifra estiver vazia
    if(tabela == false) {
        ConfiguracaoAlerta("Erro! A tabela da cifra está vazia", "fa-circle-exclamation", "vermelho");
        return;
    }

    let textoEncriptado = encriptar(texto); //Chama a função encriptar
    textoEncriptado = textoEncriptado.toString().replace(/,/g, ""); //Remove as virgulas
    textarea2.value = textoEncriptado; //Mostra o texto encriptado

    ConfiguracaoAlerta("Texto encriptado com sucesso", "fa-circle-check", "verde"); //Mostra o alerta
});

//Clique no botão desencriptar
btnRun2.addEventListener("click", () => {
    const texto = textarea3.value; //Texto a ser encriptado

    //Mostra o alerta se o texto para encriptar estiver vazio
    if(!texto) {
        ConfiguracaoAlerta("Preencha o campo Texto para Encriptar", "fa-triangle-exclamation", "laranja");
        return;
    }

    const tabela = verificaTabela(); //Verifica se a tabela da cifra está preenchida

    //Mostra o alerta se a tabela da cifra estiver vazia
    if(tabela == false) {
        ConfiguracaoAlerta("Erro! A tabela da cifra está vazia", "fa-circle-exclamation", "vermelho");
        return;
    }

    let textoDesencriptado = desencriptar(texto); //Chama a função encriptar
    textoDesencriptado = textoDesencriptado.toString().replace(/,/g, ""); //Remove as virgulas
    textarea4.value = textoDesencriptado; //Mostra o texto encriptado

    ConfiguracaoAlerta("Texto desencriptado com sucesso", "fa-circle-check", "verde"); //Mostra o alerta
});

//Função para preencher a tabela da cifra
function preencheTabelaCifra() {
    chaveCifra = input.value.replace(/(\s*)/g, ""); //Remove os espaços
    chaveCifra = chaveCifra.toUpperCase(); //Converte para letras maiúsculas
    chaveCifra = chaveCifra.replace(/J/g, ""); //Remove as letras J
    chaveCifra = removeDuplicados(chaveCifra); //Remove as letras duplicadas

    //Mostra o alerta se a chave da cifra estiver vazia
    if(!chaveCifra) {
        ConfiguracaoAlerta("Preencha o campo Chave de Cifra", "fa-triangle-exclamation", "laranja");
        return;
    }

    //Verifica se tem caracteres especiais
    for(let i = 0; i < chaveCifra.length; i++) {
        if(!alfabeto.includes(chaveCifra[i])) {
            ConfiguracaoAlerta("Caracteres inválidos, introduza caracteres de A-Z", "fa-triangle-exclamation", "laranja");
            return;
        }
    }

    const letras = []; //Variável para armazenar o as letras da tabela da cifra

    //Preenche o array com as letras da chave
    for(let letra of chaveCifra) {
        letras.push(letra);
    }

    let numeroLetras2 = numeroLetras - letras.length; //Gurada o número de letras que falta preencher

    //Preenche o array com as letras do alfabeto restantes
    for(let i=0; i<=numeroLetras2; i++) {
        for(let letra of alfabeto) {
            if(!letras.includes(letra)) {
                //Remove a letra J
                if(letra != "J") {
                    letras.push(letra);
                }
            }
        }
    }

    let i = 0; //Variável contadora
    //Preenche a tabela da cifra
    tds.forEach((td) => {
        if(letras[i] == "I") {
            td.innerHTML = "I/J";
            i++
        }else {
            td.innerHTML = letras[i];
            i++;
        }
    });
    matrizTabelaCifra(); //Chama afunçaõ que gurada a tabela da cifra numa matriz
}

//Função para preencher a matriz com as letras da tabela da cifra
function matrizTabelaCifra() {
    let i = 0; //Variável contadora
    
    //Preenche a matriz com as letras da tabela da cifra
    for(let x = 0; x < 5; x++) {
        for(let y = 0; y < 5; y++) {
            if(tds[i].innerHTML == "I/J") {
                matriz[x][y] = "I";
                i++;
            }else {
                matriz[x][y] = tds[i].innerHTML;
                i++;
            }
        }
    }
}

//Remove as letras duplicadas
function removeDuplicados(texto) {
    let novoTexto = ""; //Variável para armazenar o texto sem letras duplicadas

    //Percorre o texto
    for(let letra of texto) {
        if(!novoTexto.includes(letra)) {
            novoTexto += letra;
        }
    }
    return novoTexto;
}

//Prepara o texto para ser encriptado
function preparaTexto(texto) {
    texto = texto.toString().toUpperCase(); //Converte para letras maiúsculas
    texto = texto.replace(/(\s*)/g, ""); //Remove os espaços
    texto = texto.replace(/J/g, "I"); //Remove a letra J
    
    
    //Verifica se tem caracteres especiais
    for(let i = 0; i < texto.length; i++) {
        if(!alfabeto.includes(texto[i])) {
            ConfiguracaoAlerta("Caracteres inválidos, introduza caracteres de A-Z", "fa-triangle-exclamation", "laranja");
            return;
        }
    }
    
    const ArrayTexto = []; //Variável para armazenar o texto final dividido em pares
    let letra1 = ""; //Variável para armazenar a primeira letra
    let letra2 = ""; //Variável para armazenar a segunda letra

    //Divide o texto em pares de letras
    for(let i=0; i<texto.length; i++) {
        letra1 = texto[i];
        letra2 = texto[i+1];

        if(letra1 == letra2) { //Verifica se a letra2 é igual a letra1
            ArrayTexto.push(letra1 + "X"); //Adiciona a letra1 e a letra X

        }else if(letra2 == undefined) { //Verifica se a letra2 não existe
            ArrayTexto.push(letra1 + "X"); //Adiciona a letra1 e a letra X

        }else {
            ArrayTexto.push(letra1 + letra2); //Adiciona a letra1 e a letra2
            i++;
        }
    }

    console.log(ArrayTexto);
    return ArrayTexto;
}

//Encripta o texto
function encriptar(texto) {
    const textoPreparado = preparaTexto(texto); //Variável para armazenar o texto preparado
    const textoEncriptado = []; //Variável para armazenar o texto encriptado
    
    textoPreparado.forEach((parDeLetras) => {
        let letra1 = parDeLetras[0];
        let letra2 = parDeLetras[1];
        let posicaoLetra1 = [];
        let posicaoLetra2 = [];

        //Percorre a matriz para encontrar a posição das letras
        for(let x = 0; x < 5; x++) {
            for(let y = 0; y < 5; y++) {
                if(matriz[x][y] == letra1) {
                    posicaoLetra1 = [x, y]; //Guarda a posição da letra1
                    console.log("Letra: " + matriz[x][y] + " Posição: " + posicaoLetra1);
                }else if(matriz[x][y] == letra2) {
                    posicaoLetra2 = [x, y]; //Guarda a posição da letra2
                    console.log("Letra: " + matriz[x][y] + " Posição: " + posicaoLetra2);
                }
            }
        }

        let letra1Encriptada = "";
        let letra2Encriptada = "";

        if(posicaoLetra1[1] == posicaoLetra2[1]) { //Verifica se as letras estão na mesma coluna
            if(posicaoLetra1[0] == 4) { //Verifica se a letra1 está na última posição
                letra1Encriptada = matriz[posicaoLetra1[0] - 4][posicaoLetra1[1]];
                letra2Encriptada = matriz[posicaoLetra2[0] + 1][posicaoLetra2[1]];
            }else if(posicaoLetra2[0] == 4) { //Verifica se a letra2 está na última posição
                letra2Encriptada = matriz[posicaoLetra2[0] - 4][posicaoLetra2[1]];
                letra1Encriptada = matriz[posicaoLetra1[0] + 1][posicaoLetra1[1]];
            }else { //Se nenhuma das letras estiver na última posiçao, descem uma linha
                letra1Encriptada = matriz[posicaoLetra1[0] + 1][posicaoLetra1[1]];
                letra2Encriptada = matriz[posicaoLetra2[0] + 1][posicaoLetra2[1]];
            }

        }else if(posicaoLetra1[0] == posicaoLetra2[0]) { //Verifica se as letras estão na mesma linha
            if(posicaoLetra1[1] == 4) { //Verifica se a letra1 está na última posição
                letra1Encriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] - 4];
                letra2Encriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] + 1];
            }else if(posicaoLetra2[1] == 4) { //Verifica se a letra2 está na última posição
                letra2Encriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] - 4]           
                letra1Encriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] + 1];
            }else { //Se nenhuma das letras estiver na última posiçao, desce uma coluna
                letra1Encriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] + 1];
                letra2Encriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] + 1];
            }

        }else { //Se as letras não estiverem na mesma linha ou coluna
            letra1Encriptada = matriz[posicaoLetra1[0]][posicaoLetra2[1]];
            letra2Encriptada = matriz[posicaoLetra2[0]][posicaoLetra1[1]];
        }
        textoEncriptado.push(letra1Encriptada + letra2Encriptada); //Adiciona as letras encriptadas no texto encriptado
    });
    console.log(textoEncriptado);
    return textoEncriptado;
}

//Desencripta o texto
function desencriptar(texto) {
    const textoPreparado = preparaTexto(texto); //Variável para armazenar o texto preparado
    const textoDesencriptado = []; //Variável para armazenar o texto desencriptado

    textoPreparado.forEach((parDeLetras) => {
        let letra1 = parDeLetras[0];
        let letra2 = parDeLetras[1];
        let posicaoLetra1 = [];
        let posicaoLetra2 = [];

        //Percorre a matriz para encontrar a posição das letras
        for(let x = 0; x < 5; x++) {
            for(let y = 0; y < 5; y++) {
                if(matriz[x][y] == letra1) {
                    posicaoLetra1 = [x, y]; //Guarda a posição da letra1
                    console.log("Letra: " + matriz[x][y] + " Posição: " + posicaoLetra1);
                }else if(matriz[x][y] == letra2) {
                    posicaoLetra2 = [x, y]; //Guarda a posição da letra2
                    console.log("Letra: " + matriz[x][y] + " Posição: " + posicaoLetra2);
                }
            }
        }

        let letra1Desencriptada = "";
        let letra2Desencriptada = "";

        if(posicaoLetra1[1] == posicaoLetra2[1]) { //Verifica se as letras estão na mesma coluna
            if(posicaoLetra1[0] == 0) { //Verifica se a letra1 está na última posição
                letra1Desencriptada = matriz[posicaoLetra1[0] + 4][posicaoLetra1[1]];
                letra2Desencriptada = matriz[posicaoLetra2[0] - 1][posicaoLetra2[1]];
            }else if(posicaoLetra2[0] == 0) { //Verifica se a letra2 está na última posição
                letra2Desencriptada = matriz[posicaoLetra2[0] + 4][posicaoLetra2[1]];
                letra1Desencriptada = matriz[posicaoLetra1[0] - 1][posicaoLetra1[1]];
            }else { //Se nenhuma das letras estiver na última posiçao, descem uma linha
                letra1Desencriptada = matriz[posicaoLetra1[0] - 1][posicaoLetra1[1]];
                letra2Desencriptada = matriz[posicaoLetra2[0] - 1][posicaoLetra2[1]];
            }

        }else if(posicaoLetra1[0] == posicaoLetra2[0]) { //Verifica se as letras estão na mesma linha
            if(posicaoLetra1[1] == 0) { //Verifica se a letra1 está na última posição
                letra1Desencriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] + 4];
                letra2Desencriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] - 1];
            }else if(posicaoLetra2[1] == 0) { //Verifica se a letra2 está na última posição
                letra2Desencriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] + 4]           
                letra1Desencriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] - 1];
            }else { //Se nenhuma das letras estiver na última posiçao, desce uma coluna
                letra1Desencriptada = matriz[posicaoLetra1[0]][posicaoLetra1[1] - 1];
                letra2Desencriptada = matriz[posicaoLetra2[0]][posicaoLetra2[1] - 1];
            }

        }else { //Se as letras não estiverem na mesma linha ou coluna
            letra1Desencriptada = matriz[posicaoLetra1[0]][posicaoLetra2[1]];
            letra2Desencriptada = matriz[posicaoLetra2[0]][posicaoLetra1[1]];
        }
        textoDesencriptado.push(letra1Desencriptada + letra2Desencriptada); //Adiciona as letras encriptadas no texto encriptado
    });
    console.log(textoDesencriptado);
    return textoDesencriptado;
}

//Função para verificar se a tabela da cifra está preenchida
function verificaTabela() {
    let tabelaPreenchida = true;

    for(let x = 0; x < 5; x++) {
        for(let y = 0; y < 5; y++) {
            if(matriz[x][y] == undefined) {
                tabelaPreenchida = false;
                break;
            }else {
                console.log("Conteúdo: " + matriz[x][y]);
            }
        }
    }

    return tabelaPreenchida;
}

//Função para criar um alerta
function ConfiguracaoAlerta(paragrafoTexto, iconTexto, cor) {
    alerta.innerHTML = ""; //limpa o alerta

    //Cor do alerta
    if(cor === "verde") {
        alerta.style.backgroundColor = "#C7E2D6cc";
        alerta.style.border = "3px solid #41b341";
    }else if(cor === "vermelho") {
        alerta.style.backgroundColor = "#F6CCD1cc";
        alerta.style.border = "3px solid #c62222";
    }else {
        alerta.style.backgroundColor = "#FFF1C2cc";
        alerta.style.border = "3px solid #de9324";
    }

    //Icon do alerta
    let icon = `<i class="fa-solid ${iconTexto}"></i>`;
    alerta.innerHTML += icon;

    //Texto do alerta
    let texto = `<p id="alertaTexto" style="color: #111;">${paragrafoTexto}</p>`
    alerta.innerHTML += texto;
    
    alerta.classList.add("visible"); //Mostra o alerta

    //Esconde o alerta
    setTimeout(() => {
        alerta.classList.remove("visible");
    }, 2000);
}