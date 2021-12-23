System.register(['./controllers/NegociacaoController.js', './util/index.js'], function (_export, _context) {
  "use strict";

  var NegociacaoController, debounce;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
    }, function (_utilIndexJs) {
      debounce = _utilIndexJs.debounce;
    }],
    execute: function () {

      const controller = new NegociacaoController();

      const $ = document.querySelector.bind(document);

      // salvar negociação
      $('.form').addEventListener('submit', controller.adiciona.bind(controller));

      // apagar lista de negociações
      $('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));

      // importa negociacoes de fomra assíncrona
      $('#botao-importa').addEventListener('click', debounce(() => controller.importaNegociacoes(), 1000));
    }
  };
});
//# sourceMappingURL=app.js.map