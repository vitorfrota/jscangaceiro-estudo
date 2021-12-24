export class Negotiations {
    constructor(){
        this._negotiations = [];

        Object.freeze(this);
    }

    add(negotiation){
        this._negotiations.push(negotiation);
    }

    clear(){
        this._negotiations.length = 0;
    }

    toArray(){
        return [].concat(this._negotiations);
    }

    get sizeTotal(){
        return this._negotiations
        .reduce((acc, { size })=> acc += size, 0);
    }
}