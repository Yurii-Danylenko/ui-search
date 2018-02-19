const Nightmare = require('nightmare');
const { describe, it, before, after } = require('mocha');

module.exports.test = (context) => {
  describe('Codex Search by title', function titleSearchTest() {
    const { config, helpers: { login, logout, openApp }, meta: { testVersion } } = context;

    const nightmare = new Nightmare(config.nightmare);
    this.timeout(Number(config.test_timeout));

    describe('Login > Check app > Logout', () => {
      before(done => login(nightmare, config, done));
      after(done => logout(nightmare, config, done));
      it('should open module "Search" and find version tag', (done) => {
        nightmare
          .use(openApp(nightmare, config, done, 'search', testVersion))
          .then(result => result)
          .catch(done);
      });
      it('should find "monster comics" title', (done) => {
        nightmare
          .wait('#input-record-search-qindex')
          .select('#input-record-search-qindex', 'title')
          .click('#clickable-filter-source-Local')
          .insert('#input-record-search', 'monster')
          .wait('div[role="listitem"] div[title*="comics"]')
          .then(() => {
            done();
          })
          .catch(done);
      });
    });
  });
};
