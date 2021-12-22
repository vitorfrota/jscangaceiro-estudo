System.register(['../domain/negociacao/NegociacaoDao.js', './ConnectionFactory.js'], function (_export, _context) {
    "use strict";

    var NegociacaoDao, ConnectionFactory;
    async function getNegociacaoDao() {
        let conn = await ConnectionFactory.getConnection();

        return new NegociacaoDao(conn);
    }

    _export('getNegociacaoDao', getNegociacaoDao);

    return {
        setters: [function (_domainNegociacaoNegociacaoDaoJs) {
            NegociacaoDao = _domainNegociacaoNegociacaoDaoJs.NegociacaoDao;
        }, function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=DaoFactory.js.map