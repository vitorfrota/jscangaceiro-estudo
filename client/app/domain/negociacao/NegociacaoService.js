System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {

            const URL = 'http://localhost:3000/';

            class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }

                obterNegociacoesDaSemana() {
                    return this._http.get(`${URL}negociacoes/semana`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new Error('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDaSemanaAnterior() {
                    return this._http.get(`${URL}negociacoes/anterior`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new Error('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDaSemanaRetrasada() {
                    return this._http.get(`${URL}negociacoes/retrasada`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new Error('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDoPeriodo() {
                    return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((a, b) => b.data.getTime() - a.data.getTime())).catch(err => {
                        console.log(err);
                        throw new Error('Não foi possível obter as negociações do período.');
                    });
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map