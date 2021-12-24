export class Negotiation {
    constructor(_createdAt, _quantity, _amount){
        Object.assign(this, {_quantity, _amount });
        this._createdAt = new Date(_createdAt.getTime()),
        Object.freeze(this);
    }

    get size(){
        return this._quantity * this._amount;
    }

    get createdAt(){
        return this._createdAt;
    }

    get quantity(){
        return this._quantity;
    }

    get amount(){
        return this._amount;
    }
    
    equals(negotiation){
        return JSON.stringify(this) == JSON.stringify(negotiation)
    }
}