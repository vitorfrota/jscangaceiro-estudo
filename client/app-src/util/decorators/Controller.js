export function controller(...seletores){
    const elementos = seletores
                        .map(seletor => document.querySelector(seletor));

    return function(constructor){
        const constructorOriginal = constructor;

        const constructorNovo = function(){

            return new constructorOriginal(...elementos);
        }

        constructorNovo.prototype = constructorOriginal.prototype;

        return constructorNovo;
    }
}