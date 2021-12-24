import { isRequired } from '../../util';

export function bindEvent(
    event = isRequired('event'), 
    selector = isRequired('selector'), 
    prevent = true) {
    
    return function(target, propertyKey, descriptor) {
        Reflect.defineMetadata(
            'bindEvent', 
            { event, selector, prevent, propertyKey }, 
            Object.getPrototypeOf(target), propertyKey);
            
        return descriptor;
    }
}