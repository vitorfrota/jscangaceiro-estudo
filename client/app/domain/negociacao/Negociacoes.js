class Negociacoes {
    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha; // para atualização da view

        Object.freeze(this);
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);

        this._armadilha(this);
    }

    esvazia(){
        this._negociacoes.length = 0;

        this._armadilha(this);
    }

    paraArray(){
        return [].concat(this._negociacoes);
    }

    get volumeTotal(){
        return this._negociacoes
        .reduce((acumulador, { volume })=> acumulador += volume, 0);
    }
}