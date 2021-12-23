System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let HttpService = class HttpService {
                _handleErrors(response) {
                    if (!response.ok) throw new Error(response.statusText);

                    return response;
                }

                get(url) {
                    return fetch(url).then(response => this._handleErrors(response)).then(response => response.json());
                }
            };

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map