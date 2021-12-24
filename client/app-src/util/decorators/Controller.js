export function controller(...selectors){
    const elements = selectors
                        .map(selector => document.querySelector(selector));

    return function(constructor){
        const currentConstructor = constructor;

        const newConstructor = function(){
            const instance = new currentConstructor(...elements);

            Object
            .getOwnPropertyNames(currentConstructor.prototype)
            .forEach(property => {
                if(Reflect.hasMetadata('bindEvent', instance, property)){
                    associateEvent(
                        instance, 
                        Reflect.getMetadata('bindEvent', instance, property)
                    )
                }
            })
        }

        newConstructor.prototype = currentConstructor.prototype;

        return newConstructor;
    }

    function associateEvent(instance, metadata){
        document.querySelector(metadata.selector)
        .addEventListener(metadata.event, event => {
            if(metadata.prevent) event.preventDefault();
            instance[metadata.propertyKey](event);
        })
    }
}