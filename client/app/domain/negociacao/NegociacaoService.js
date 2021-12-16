class NegociacaoService {
    obterNegociacoesDaSemana(cb){
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    const negociacoes = JSON.parse(xhr.responseText)
                    .map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor));

                    cb(null, negociacoes);
                }else {
                    console.log(xhr.responseText);

                    cb('Não foi possível obter as negociações da semana', null);
                }
            }
        }
        xhr.send();
    }
}