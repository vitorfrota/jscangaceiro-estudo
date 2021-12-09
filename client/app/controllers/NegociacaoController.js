class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }
    adiciona(event){
        event.preventDefault();

        let converter = new DateConverter();

        let data = new Date(converter.paraData(this._inputData.value));

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
        
        console.log(negociacao);
    }
}