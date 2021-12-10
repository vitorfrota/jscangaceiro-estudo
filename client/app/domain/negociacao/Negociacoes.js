class Negociacoes {
    constructor(contexto, armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha; // para atualização da view
        this._contexto = contexto; // armazena o this da instância (controller)

        Object.freeze(this);
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);

        this._armadilha.call(this._contexto, this);
    }

    esvazia(){
        this._negociacoes.length = 0;

        this._armadilha.call(this._contexto, this);
    }

    paraArray(){
        return [].concat(this._negociacoes);
    }

    get volumeTotal(){
        return this._negociacoes
        .reduce((acumulador, { volume })=> acumulador += volume, 0);
    }
}