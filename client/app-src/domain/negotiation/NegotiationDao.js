import { Negotiation } from './Negotiation';

export class NegotiationDao {
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    add(negotiation){
        return new Promise((resolve, reject)=> {
            const request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .add(negotiation);

            request.onsuccess = _ => resolve();

            request.onerror = e => {
                console.log(e.target.error);

                reject('Não foi possível salvar a negociação');
            }
        });
    }

    clearAll(){
        return new Promise((resolve, reject)=> {
            const request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .clear();

            request.onsuccess = e => resolve();

            request.onerror = e => {
                console.log(e.target.error);

                reject('Não foi possível salvar a negociação');
            }
        });
    }

    list(){
        return new Promise((resolve, reject)=> {
            const negotiations = [];

            const cursor = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .openCursor();

            cursor.onsuccess = e => {
                const current = e.target.result;

                if(current){
                    const negotiation = new Negotiation(
                        current.value._createdAt,
                        current.value._quantity,
                        current.value._amount);
                    
                        negotiations.push(negotiation);

                        current.continue();
                } else {
                    resolve(negotiations);
                }

                cursor.onerror = e => {
                    console.log(e.target.error);
                    
                    reject('Não foi possível listar nas negociações');
                }
            }
        });
    }
}