const controller = new NegociacaoController();

// salvar negociação
document
.querySelector('.form')
.addEventListener('submit', controller.adiciona.bind(controller));

// apagar lista de negociações
document
.querySelector('#botao-apaga')
.addEventListener('click', controller.apaga.bind(controller));