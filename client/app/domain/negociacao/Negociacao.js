class Negociacao {
    constructor(_data, _quantidade, _valor){
        Object.assign(this, {_quantidade, _valor });
        this._data = new Date(_data.getTime()),
        // underline é convenção para evitar q esses dados sejam alterados
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