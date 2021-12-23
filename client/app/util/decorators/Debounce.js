System.register([], function (_export, _context) {
    "use strict";

    function debounce(ms = 500) {
        return function (target, key, descriptor) {
            const metodoOriginal = descriptor.value;

            let timer = 0;

            descriptor.value = function (...args) {
                if (event) event.preventDefault();

                clearInterval(timer);

                timer = setTimeout(() => metodoOriginal.apply(this, args), ms);
            };
            return descriptor;
        };
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map