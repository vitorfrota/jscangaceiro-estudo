export function debounce(ms = 500){
    return function (target, key, descriptor){
        const currentFunction = descriptor.value;

        let timer = 0;

        descriptor.value = function(...args){
            if(event) event.preventDefault();
            
            clearInterval(timer);

            timer = setTimeout(()=> currentFunction.apply(this, args), ms);
        }
        return descriptor;
    }
}