// Eu realizei diversos testes com esse código até chegar a essa versão, inicie baseado 100% no que foi desenvolvido nas aulas, mas não conseguia ativar o botão de fechar pedido, então, inicie uma fase de estudos que envolveu a visualização de diversos vídeos no youtube, leitura nos sites da MDN e w3, então esse código é uma miscelânia de instruções que recebi nos videos e na leitura dos sites.


//embora esta parta do código está no início, ela foi sendo construída passo a passo, inicie declarando as variaveis como string vazias "", porem não deu certo, ai foi na tentativa e erro, por exemplo, em let pratoEscolhido = false; meu primeiro teste foi com valor "", depois 0 e só depois de muito esforço, me lembrei que poderia iniciar com um boleano.
let pratoEscolhido = false;
let bebidaEscolhida = false;
let sobremesaEscolhida = false;

let precoPrato = 0;
let precoBebida = 0;
let precoSobremesa = 0;

let pratoSelecionadoTexto = "";
let bebidaSelecionadaTexto = "";
let sobremesaSelecionadaTexto = "";


//Esta foi a primeira função que desenvolvir, inicie copiando 100% do código apresentado na aula, eu consegui fazer as tres seleções, no entanto, quando implementei o código de ativarBotao() ele não funcionava de jeito nenhum. Então, depois de muito estudo persebi que era necessrio usar a linha 27, fazendo a declaração do pratoEscolhido e usar o .textContent para apresentar os resultados na tela de resumos
function selecionarPrato(botao) {
    const pratoSelecionado = document.querySelector(".prato-escolhido .selecionado");

    if (pratoSelecionado !== null) {
        pratoSelecionado.classList.remove("selecionado");
    }

    botao.classList.add("selecionado");
    pratoEscolhido = botao.querySelector('.titulo-item').textContent;
    precoPrato = parseFloat(botao.getAttribute('data-preco')) //o parseFloat so foi implementado em uma das versões finais, pois eu não conseguia valores flutuantes, ai depois de assisti a um vídeo implementei esse código. Com relação ao atributo 'data-preco', eu vi logo em um dos primeiros vídeos que seria uma ótima técnica para "pegar" um valor e realizar uma conta, então, utilizei desde o inicio. Não sei se é uma boa técnica, mas como deu certo, preferi não mexer.
    ativarBotao();
}

function selecionarBebida(botao) {
    const bebidaSelecionada = document.querySelector(".bebida-escolhida .selecionado");

    if (bebidaSelecionada !== null) {
        bebidaSelecionada.classList.remove("selecionado");
    }

    botao.classList.add("selecionado");
    bebidaEscolhida = botao.querySelector('.titulo-item').textContent;
    precoBebida = parseFloat(botao.getAttribute('data-preco'))
    ativarBotao();
}

function selecionarSobremesa(botao) {
    const sobremesaSelecionada = document.querySelector(".sobremesa-escolhida .selecionado");

    if (sobremesaSelecionada !== null) {
        sobremesaSelecionada.classList.remove("selecionado");
    }

    botao.classList.add("selecionado");
    sobremesaEscolhida = botao.querySelector('.titulo-item').textContent;
    precoSobremesa = parseFloat(botao.getAttribute('data-preco'))
    ativarBotao();
}

function ativarBotao() { // Para construção dessa função, me baseie na função selecionarJogo() que foi criada na aula. Utilizando a classe não dava certo, como disse acima, selecionava os 3 pratos mas o botão não funcionava (gastei um tempo enorme nessa fase), então, me veio a cabeça usar um id, uma vez que o id é único, ai ainda assim dava erro, foi quando li em algum forum que usar "disabled" no botão e fazer a ativação dele na função poderia dar certo, e deu, mas somente após mexer no css indicando o id e classe funcionou plenamente. Essa parte foi a mais demorada do projeto, pq demorei muito assistindo videos que não me levava a lugar algum, li muito nos sites de estudo, mas somente quando comece a ler os foruns é que consegui fazer.
    const fecharPedido = document.getElementById('fechar-pedido');

    if (pratoEscolhido && bebidaEscolhida && sobremesaEscolhida) {
        fecharPedido.disabled = false;
        fecharPedido.classList.add('ativo');
        fecharPedido.textContent = "Fechar pedido";
    } else {
        fecharPedido.disabled = true;
        fecharPedido.classList.remove('ativo');
    }
}

function mostrarResumo() {//depois que aprendi o caminho dos foruns eu conseguir finalizar o projeto mais rapido, novamente me baseie na aula para fazer essa função acontecer. 
    const overlay = document.getElementById('resumo-overlay');

    document.getElementById('resumo-prato').textContent = `Prato: ${pratoEscolhido}`;
    document.getElementById('resumo-bebida').textContent = `Prato: ${bebidaEscolhida}`;
    document.getElementById('resumo-sobremesa').textContent = `Prato: ${sobremesaEscolhida}`;

    const totalPedido = precoPrato + precoBebida + precoSobremesa;
    document.getElementById('resumo-total').textContent = `TOTAL: ${totalPedido.toFixed(2)}`;

    overlay.style.display = 'flex'; //optei por mudar o style por meio de função e no html, eu sei que seria melhor alterar o css, mas eu não consegui fazer de um jeito satisfatório, e assim como eu fiz com cada parte do código, quando deu certo, eu não mexi mais para não dar erro
}


function fecharResumo() {
    const overlay = document.getElementById('resumo-overlay');
    overlay.style.display = 'none';
}

function confirmarPedido() {

}

function confirmarPedido() { //Essa parte do código tbm levou bastante tempo, eu tentei fazer essa funcionalidade no html, mas não dava certo, ai eu li num forum que alguem tinha realizado a função parecida com essa, ai eu tentei e deu certo, depois fui só mexendo na estrutura para ficar um pouco mais parecido com o Briefing
    const whatsappNumber = "5531997736049";

    const mensagem = `Olá, gostaria de fazer o pedido: \n\n` +
                    `${pratoEscolhido}\n-` +
                    `${bebidaEscolhida}\n-` +
                    `${sobremesaEscolhida}\n\n-` + 
                    `Total: R$ ${ (precoPrato + precoBebida + precoSobremesa).toFixed(2) }`;

    const mensagemCodificada = encodeURIComponent(mensagem);

    const url = `https://wa.me/${5531997736049}?text=${mensagemCodificada}`;

    window.open(url, '_blank');
}


