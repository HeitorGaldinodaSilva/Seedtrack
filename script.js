// SALVAR NOVA SEMENTE
function salvarSemente() { 
    const estoque = document.getElementById("estoque").value.trim();
    const semente = document.getElementById("semente").value;
    const armazem = document.getElementById("armazem").value.trim();
    const validade = document.getElementById("validade").value;
    const quantidade = document.getElementById("quantidade").value.trim();

    // RegEx
    const apenasNumeros = /^[0-9]+$/;
    const apenasLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;

    // Valida estoque
    if (!apenasNumeros.test(estoque) || estoque <= 0) {
        alert("O número de estoque deve conter apenas números positivos.");
        return;
    }

    // Valida validade (formato de data e não pode ser no passado)
const dataValidade = new Date(validade);
const hoje = new Date();

// Zera horário para comparar apenas as datas
hoje.setHours(0,0,0,0);
dataValidade.setHours(0,0,0,0);

if (isNaN(dataValidade.getTime())) {
    alert("Selecione uma data válida.");
    return;
}

if (dataValidade < hoje) {
    alert("A data de validade não pode ser no passado.");
    return;
}

    // Valida armazém
    if (!apenasLetras.test(armazem)) {
        alert("O nome do armazém deve conter apenas letras.");
        return;
    }

    // Valida quantidade
    if (!apenasNumeros.test(quantidade) || quantidade <= 0) {
        alert("A quantidade deve conter apenas números positivos.");
        return;
    }

    if (!estoque || !semente || !armazem || !validade || !quantidade) {
        alert("Preencha todos os campos.");
        return;
    }

    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];

    lista.push({
        estoque,
        semente,
        armazem,
        validade,
        quantidade
    });

    localStorage.setItem("cadastros", JSON.stringify(lista));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "lista.html";
}



// CARREGAR TABELA NA PÁGINA LISTA
function carregarLista() {
    if (!document.getElementById("tabela-sementes")) return;

    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];
    const tabela = document.getElementById("tabela-sementes");

    tabela.innerHTML = "";

    lista.forEach((item, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.estoque}</td>
            <td>${item.semente}</td>
            <td>${item.armazem}</td>
            <td>${item.validade}</td>
            <td>${item.quantidade}</td>
            <td>
                <button class="botão1_lista" onclick="editar(${index})">Editar</button>
                <button class="botão2_lista" onclick="excluir(${index})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}




// EXCLUIR ITEM
function excluir(index) {
    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];

    if (confirm("Deseja realmente excluir este registro?")) {
        lista.splice(index, 1);
        localStorage.setItem("cadastros", JSON.stringify(lista));
        carregarLista();
    }
}




// COLOCAR DADOS NO FORMULÁRIO PARA EDITAR
function editar(index) {
    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];
    const item = lista[index];

    localStorage.setItem("editIndex", index);
    localStorage.setItem("editItem", JSON.stringify(item));

    window.location.href = "cadastrar.html";
}




// QUANDO ENTRAR NO CADASTRAR, VERIFICA SE É EDIÇÃO
window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("cadastrar.html")) {

        const data = localStorage.getItem("editItem");
        const index = localStorage.getItem("editIndex");

        if (data && index !== null) {
            const item = JSON.parse(data);

            document.getElementById("estoque").value = item.estoque;
            document.getElementById("semente").value = item.semente;
            document.getElementById("armazem").value = item.armazem;
            document.getElementById("validade").value = item.validade;
            document.getElementById("quantidade").value = item.quantidade;

            const btn = document.querySelector(".botão1_cadastrar");
            btn.textContent = "Salvar edição";
            btn.onclick = salvarEdicao;
        }
    }
});




// SALVAR EDIÇÃO
function salvarEdicao() {
    const index = localStorage.getItem("editIndex");
    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];

    lista[index] = {
        estoque: document.getElementById("estoque").value,
        semente: document.getElementById("semente").value,
        armazem: document.getElementById("armazem").value,
        validade: document.getElementById("validade").value,
        quantidade: document.getElementById("quantidade").value
    };

    localStorage.setItem("cadastros", JSON.stringify(lista));
    localStorage.removeItem("editItem");
    localStorage.removeItem("editIndex");

    alert("Edição salva com sucesso!");
    window.location.href = "lista.html";
}
