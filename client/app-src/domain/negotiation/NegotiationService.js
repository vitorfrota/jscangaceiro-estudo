import { HttpService, ApplicationException } from '../../util'; 
import { Negotiation } from './Negotiation';

const URL = 'http://localhost:3000/';

export class NegotiationService {
    constructor(){
        this._http = new HttpService();
    }

    getNegotationsOfWeek(){
        return this._http.get(`${URL}negociacoes/semana`)
        .then(response => response
            .map(({ createdAt, quantity, amount }) => new Negotiation(new Date(createdAt), quantity, amount))
        , err => {
            throw new ApplicationException('Não foi possível obter as negociações!');
        }
        );
    }

    getNegotiationsOfLastWeek(){
        return this._http.get(`${URL}negociacoes/anterior`)
        .then(response => response
            .map(({ createdAt, quantity, amount }) => new Negotiation(new Date(createdAt), quantity, amount))
        , err => {
            throw new ApplicationException('Não foi possível obter as negociações!');
        }
        );
    }

    async getAllNegotiations(){
        try {
            let period = await Promise.all([
                this.getNegotiationsOfWeek(),
                this.getNegotiationsOfLasetWeek()
            ]);

            return period.reduce((listNegotiations, negotiation)=> listNegotiations.concat(negotiation), [])
                .sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime());
        }catch(err){      
            throw new ApplicationException('Não foi possível obter as negociações do período');
        }
    }
}