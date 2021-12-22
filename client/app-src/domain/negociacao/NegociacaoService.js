import { HttpService, ApplicationException } from '../../util/index.js'; 
import { Negociacao } from './Negociacao.js';

const URL = 'http://localhost:3000/';

export class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return this._http.get(`${URL}negociacoes/semana`)
        .then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor))
        , err => {
            throw new ApplicationException('Não foi possível obter as negociações!');
        }
        );
    }

    obterNegociacoesDaSemanaAnterior(){
        return this._http.get(`${URL}negociacoes/anterior`)
        .then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor))
        , err => {
            throw new ApplicationException('Não foi possível obter as negociações!');
        }
        );
    }

    obterNegociacoesDaSemanaRetrasada(){
        return this._http.get(`${URL}negociacoes/retrasada`)
        .then(dados => dados.map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor))
        , err => {
            throw new ApplicationException('Não foi possível obter as negociações!');
        }
        );
    }

    async obterNegociacoesDoPeriodo(){
        try {
            let periodo = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]);

            return periodo.reduce((novoArray, item)=> novoArray.concat(item), [])
                .sort((a,b)=> b.data.getTime() - a.data.getTime());
        }catch(err){      
            throw new ApplicationException('Não foi possível obter as negociações do período');
        }
    }
}