System.register([], function (_export, _context) {
    "use strict";

    function debounce(fn, ms) {
        let timer = 0;

        return () => {
            clearTimeout(timer);

            timer = setTimeout(() => fn(), ms);
        };
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map