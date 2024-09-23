let pratoSelecionado = false;
let bebidaSelecionada = false;
let sobremesaSelecionada = false;

let pratoSelecionadoTexto = "";
let bebidaSelecionadaTexto = "";
let sobremesaSelecionadaTexto = "";

let precoPrato = 0;
let precoBebida = 0;
let precoSobremesa = 0;

function selecionar(tipo, elemento) {
    const botoes = document.querySelectorAll(`#${tipo}s .opcao`);

    botoes.forEach(botao => botao.classList.remove('selecionado'));

    elemento.classList.add('selecionado');

    if (tipo === 'prato') {
        pratoSelecionado = true;
        pratoSelecionadoTexto = elemento.textContent;
        precoPrato = parseFloat(elemento.getAttribute("data-preco"));
    }

    if (tipo === 'bebida') {
        bebidaSelecionada = true;
        bebidaSelecionadaTexto = elemento.textContent;
        precoBebida = parseFloat(elemento.getAttribute("data-preco"));
    }

    if (tipo === 'sobremesa') {
        sobremesaSelecionada = true;
        sobremesaSelecionadaTexto = elemento.textContent;
        precoSobremesa = parseFloat(elemento.getAttribute("data-preco"));
    }

    ativarBotao()

}

function ativarBotao() {
    const botao = document.getElementById('fechar-pedido');

    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        botao.disabled = false;
        botao.classList.add('ativo');
        botao.textContent = "Fechar pedido"
    } else {
        botao.disabled = true;
        botao.classList.remove('ativo');
    }
}

function mostrarResumo() {
    const overlay = document.getElementById('resumo-overlay');

    document.getElementById('resumo-prato').textContent = `Prato: ${pratoSelecionadoTexto}`;
    document.getElementById('resumo-bebida').textContent = `Bebida: ${bebidaSelecionadaTexto}`;
    document.getElementById('resumo-sobremesa').textContent = `Sobremesa: ${sobremesaSelecionadaTexto}`;

    const total = precoPrato + precoBebida + precoSobremesa;
    document.getElementById('resumo-total').textContent = `TOTAL: ${total.toFixed(2)}`;

    overlay.style.display = 'flex';
}

function fecharResumo() {
    const overlay = document.getElementById('resumo-overlay');
    overlay.style.display = 'none';
}

function confirmarPedido() {
    resetarSelecoes();

    fecharResumo();
}

function confirmarPedido() {
    const whatsappNumber = "5531997736049";

    const mensagem = `Olá, gostaria de fazer o seguinte pedido: \n\n` +
                    `${pratoSelecionadoTexto}\n` +
                    `${bebidaSelecionadaTexto}\n` +
                    `${sobremesaSelecionadaTexto}\n\n` + 
                    `Total: R$ ${ (precoPrato + precoBebida + precoSobremesa).toFixed(2) }`;

    const mensagemCodificada = encodeURIComponent(mensagem);

    const url = `https://wa.me/${5531997736049}?text=${mensagemCodificada}`;

    window.open(url, '_blank');

    resetarSelecoes();
    fecharSelecoes();
}

function resetarSelecoes() {
    pratoSelecionado = false;
    bebidaSelecionada = false;
    sobremesaSelecionada = false;

    pratoSelecionadoTexto = "";
    bebidaSelecionadaTexto = "";
    sobremesaSelecionadaTexto = "";

    precoPrato = 0;
    precoBebida = 0;
    precoSobremesa = 0;

    const botoes = document.querySelectorAll('.opcao');
    botoes.forEach(botao => botao.classList.remove('selecionado'));

    ativarBotao();
}