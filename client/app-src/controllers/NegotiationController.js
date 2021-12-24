import { Negotiations, Negotiation } from '../domain';
import { NegotiationsView, MessageView, Message, DateConverter } from '../ui';

import { 
    getNegotiationDao, 
    Bind, 
    getExceptionMessage, 
    debounce, 
    bindEvent,
    controller
} from '../util';

@controller('#createdAt', '#quantity', '#amount')
export class NegotiationController {
    constructor(_inputCreatedAt, _inputQuantity, _inputAmount){  
        Object.assign(this, { _inputCreatedAt, _inputQuantity, _inputAmount });

        this._negotiations = new Bind(new Negotiations(), 
        new NegotiationsView('#negotiations'), 
        'add', 'clear');

        this._message = new Bind(new Message(), 
        new MessageView('#messageView'), 
        'text');

        this._init();
    }

    async _init(){
        try {
            const dao = await getNegotiationDao();

            const negotiations = await dao.listaTodos();
            negotiations.forEach(negotiation => this._negotiations.add(negotiation))
        }catch(err){
            this._message.text = getExceptionMessage(err);
        }
    }

    _createNegotiation(){
        return new Negotiation(
            DateConverter.toDate(this._inputCreatedAt.value),
            parseInt(this._inputQuantity.value),
            parseFloat(this._inputAmount.value)
        )
    }

    _clearInputs(){
        this._inputCreatedAt.value = "";
        this._inputQuantity.value = 1;
        this._inputAmount.value = 0.0;
        this._inputCreatedAt.focus();
    }

    @bindEvent('submit', '.form')
    @debounce()
    async add(event){
        try {
            event.preventDefault();

            const negotiation = this._createNegotiation();

            const dao = await getNegotiationDao();
            await dao.add(negotiation);

            this._negotiations.add(negotiation);

            this._message.text = "Negociação adicionada com sucesso!";
    
            this._clearInputs();

        }catch(err){
            this._message.text = getExceptionMessage(err);
        }
    }
    
    @bindEvent('click', '#botao-apaga')
    async delete(){
        try {
            const dao = await getNegotiationDao();
            await dao.clearAll();

            this._negotiations.clear();

            this._message.text = 'Negociações apagadas com sucesso!';
        }catch(err){
            this._message.text = getExceptionMessage(err);
        }
    }
    
    @bindEvent('click', '#botao-importa')
    @debounce()
    async importNegotiations(){
        try {
            const { NegotiationService } = await import('../domain/negotiation/NegotiationService');
            const service = new NegotiationService();
            
            const negotiations = await service.getAllNegotiations();

            negotiations
                .filter(negotiationFiltered => !this._negotiations.toArray()
                    .some(existsNegotiation => negotiationFiltered.equals(existsNegotiation))
                    .forEach(negotiation => this._negotiations.add(negotiation)));

            this._message.text = 'Negociações do período importadas com sucesso!';
        }catch(err){
            this._message.text = getExceptionMessage(err);
        }
    }
}