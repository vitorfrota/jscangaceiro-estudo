export class ProxyFactory {
    static create(object, props, trap){
        return new Proxy(object, {
            get(target, prop, receiver){
                if(ProxyFactory._isFunction(target[prop]) 
                && props.includes(prop)){
                    return function(){
                        target[prop].apply(target, arguments);
                        
                        trap(target);
                    }
                }else{
                    return target[prop];
                }
            },
            set(target, prop, value, receiver){
                const updated = Reflect.set(target, prop, value);

                if(props.includes(prop)) trap(target); return updated;
            }
        });
    }

    static _isFunction(fn){
        return typeof(fn) == typeof(Function);
    }
}