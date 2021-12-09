class Negociacao {
    constructor(data, quantidade, valor){
        // underline é convenção para evitar q esses dados sejam alterados
        this._data = new Date(data.getTime()); // data atual
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    get volume(){
        return this._quantidade * this._valor;
    }

    get data(){
        return this._data;
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}