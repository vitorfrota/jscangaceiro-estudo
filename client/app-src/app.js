import { NegociacaoController } from './controllers/NegociacaoController.js';
import { debounce } from './util/index.js';

const controller = new NegociacaoController();

const $ = document.querySelector.bind(document);

// salvar negociação
$('.form')
.addEventListener('submit', controller.adiciona.bind(controller));

// apagar lista de negociações
$('#botao-apaga')
.addEventListener('click', controller.apaga.bind(controller));

// importa negociacoes de fomra assíncrona
$('#botao-importa')
.addEventListener('click', debounce(()=> controller.importaNegociacoes(), 1000));