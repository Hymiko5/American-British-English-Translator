const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translate Mangoes are my favorite fruit. to British English', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const locale = 'american-to-british';
      const expect =  'Mangoes are my <span class="highlight">favourite</span> fruit.';
      chai.request(server)
        .post('/api/translate')
        .send({ text: input, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, input);
          assert.equal(res.body.translation, expect);
          done();
        })
    })
    
    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const locale = 'whatever';
      const expect =  { error: 'Invalid value for locale field' };
      chai.request(server)
        .post('/api/translate')
        .send({ text: input, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, expect.error);
          done();
        })
    })

  test('Translation with missing text field: POST request to /api/translate', (done) => {
      const locale = 'american-to-british';
      const expect =  { error: 'Required field(s) missing' };
      chai.request(server)
        .post('/api/translate')
        .send({ locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, expect.error);
          done();
        })
    })

  test('Translation with missing locale field: POST request to /api/translate', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const expect =  { error: 'Required field(s) missing' };
      chai.request(server)
        .post('/api/translate')
        .send({ text: input })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, expect.error);
          done();
        })
    })

  test('Translation with empty text: POST request to /api/translate', (done) => {
      const input = '';
      const locale = 'american-to-british';
      const expect =  { error: 'No text to translate' };
      chai.request(server)
        .post('/api/translate')
        .send({ text: input, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, expect.error);
          done();
        })
    })

  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
      const input = 'Everything looks good to me!';
      const locale = 'american-to-british';
      const expect =  'Everything looks good to me!';
      chai.request(server)
        .post('/api/translate')
        .send({ text: input, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, expect);
          done();
        })
    })
  
});
