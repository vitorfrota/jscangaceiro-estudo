class DateConverter{
    paraTexto(data){
        return data.getDate()
        + '/' + (data.getMonth() + 1)
        + '/' + data.getFullYear();
    }

    paraData(texto){
        return new Date(...texto
            .split('-')
            .map((item, index)=> item - index % 2)
            );
    }
}