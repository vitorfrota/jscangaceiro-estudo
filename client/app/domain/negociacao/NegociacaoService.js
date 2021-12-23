System.register(['../../util/index.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, ApplicationException, Negociacao;
    return {
        setters: [function (_utilIndexJs) {
            HttpService = _utilIndexJs.HttpService;
            ApplicationException = _utilIndexJs.ApplicationException;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            function _asyncToGenerator(fn) {
                return function () {
                    var gen = fn.apply(this, arguments);
                    return new Promise(function (resolve, reject) {
                        function step(key, arg) {
                            try {
                                var info = gen[key](arg);
                                var value = info.value;
                            } catch (error) {
                                reject(error);
                                return;
                            }

                            if (info.done) {
                                resolve(value);
                            } else {
                                return Promise.resolve(value).then(function (value) {
                                    step("next", value);
                                }, function (err) {
                                    step("throw", err);
                                });
                            }
                        }

                        return step("next");
                    });
                };
            }

            const URL = 'http://localhost:3000/';

            let NegociacaoService = class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }

                obterNegociacoesDaSemana() {
                    return this._http.get(`${URL}negociacoes/semana`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDaSemanaAnterior() {
                    return this._http.get(`${URL}negociacoes/anterior`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDaSemanaRetrasada() {
                    return this._http.get(`${URL}negociacoes/retrasada`).then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações!');
                    });
                }

                obterNegociacoesDoPeriodo() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            let periodo = yield Promise.all([_this.obterNegociacoesDaSemana(), _this.obterNegociacoesDaSemanaAnterior(), _this.obterNegociacoesDaSemanaRetrasada()]);

                            return periodo.reduce(function (novoArray, item) {
                                return novoArray.concat(item);
                            }, []).sort(function (a, b) {
                                return b.data.getTime() - a.data.getTime();
                            });
                        } catch (err) {
                            throw new ApplicationException('Não foi possível obter as negociações do período');
                        }
                    })();
                }
            };

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map