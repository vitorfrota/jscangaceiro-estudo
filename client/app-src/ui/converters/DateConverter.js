import { DataInvalidaException } from './DataInvalidaException';

export class DateConverter{
    constructor(){
        throw new Error('Esta classe não pode ser instanciada!')
    }
    static toString(date){
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    static toDate(text){
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text))
            throw new DataInvalidaException();

        return new Date(...text
            .split('/')
            .reverse()
            .map((item, index)=> item - index % 2)
            );
    }
}