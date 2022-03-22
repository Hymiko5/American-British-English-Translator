const chai = require('chai');
const assert = chai.assert;

const server = require('../server')

suite('Unit Tests', () => {
  
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

    test('Translate I ate yogurt for breakfast. to British English', (done) => {
    const input = 'I ate yogurt for breakfast.';
    const locale = 'american-to-british';
    const expect =  'I ate <span class="highlight">yoghurt</span> for breakfast.';
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
  
  test("Translate We had a party at my friend's condo. to British English", (done) => {
    const input = "We had a party at my friend's condo.";
    const locale = 'american-to-british';
    const expect =  `We had a party at my friend's <span class="highlight">flat</span>.`;
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

  test("Translate Can you toss this in the trashcan for me? to British English", (done) => {
    const input = "Can you toss this in the trashcan for me?";
    const locale = 'american-to-british';
    const expect =  `Can you toss this in the <span class="highlight">bin</span> for me?`;
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

  test("Translate The parking lot was full. to British English", (done) => {
      const input = "The parking lot was full.";
      const locale = 'american-to-british';
      const expect =  `The <span class="highlight">car park</span> was full.`;
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

    test("Translate Like a high tech Rube Goldberg machine. to British English", (done) => {
      const input = "Like a high tech Rube Goldberg machine.";
      const locale = 'american-to-british';
      const expect =  `Like a high tech <span class="highlight">Heath Robinson device</span>.`;
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

    test("Translate To play hooky means to skip class or work. to British English", (done) => {
      const input = "To play hooky means to skip class or work.";
      const locale = 'american-to-british';
      const expect =  `To <span class="highlight">bunk off</span> means to skip class or work.`;
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

    test("Translate No Mr. Bond, I expect you to die. to British English", (done) => {
      const input = "No Mr. Bond, I expect you to die.";
      const locale = 'american-to-british';
      const expect =  `No <span class="highlight">Mr</span> Bond, I expect you to die.`;
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

    test("Translate Dr. Grosh will see you now. to British English", (done) => {
      const input = "Dr. Grosh will see you now.";
      const locale = 'american-to-british';
      const expect =  `<span class="highlight">Dr</span> Grosh will see you now.`;
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

    test("Translate Lunch is at 12:15 today. to British English", (done) => {
      const input = "Lunch is at 12:15 today.";
      const locale = 'american-to-british';
      const expect =  `Lunch is at <span class="highlight">12.15</span> today.`;
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

    test("Translate We watched the footie match for a while. to American English", (done) => {
      const input = "We watched the footie match for a while.";
      const locale = 'british-to-american';
      const expect =  `We watched the <span class="highlight">Soccer</span> match for a while.`;
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

    test("Translate Paracetamol takes up to an hour to work. to American English", (done) => {
      const input = "Paracetamol takes up to an hour to work.";
      const locale = 'british-to-american';
      const expect =  `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
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

    test("Translate First, caramelise the onions. to American English", (done) => {
      const input = "First, caramelise the onions.";
      const locale = 'british-to-american';
      const expect =  `First, <span class="highlight">caramelize</span> the onions.`;
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

    test("Translate I spent the bank holiday at the funfair. to American English", (done) => {
      const input = "I spent the bank holiday at the funfair.";
      const locale = 'british-to-american';
      const expect =  `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">Carnival</span>.`;
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

    test("Translate I had a bicky then went to the chippy. to American English", (done) => {
      const input = "I had a bicky then went to the chippy.";
      const locale = 'british-to-american';
      const expect =  `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`;
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

    test("Translate I've just got bits and bobs in my bum bag. to American English", (done) => {
          const input = "I've just got bits and bobs in my bum bag.";
          const locale = 'british-to-american';
          const expect =  `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`;
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

    test("Translate The car boot sale at Boxted Airfield was called off. to American English", (done) => {
          const input = "The car boot sale at Boxted Airfield was called off.";
          const locale = 'british-to-american';
          const expect =  `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`;
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
    test("Translate Have you met Mrs Kalyani? to American English", (done) => {
          const input = "Have you met Mrs Kalyani?";
          const locale = 'british-to-american';
          const expect =  `Have you met <span class="highlight">Mrs.</span> Kalyani?`;
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
    test("Translate Prof Joyner of King's College, London. to American English", (done) => {
          const input = "Prof Joyner of King's College, London.";
          const locale = 'british-to-american';
          const expect =  `<span class="highlight">Prof.</span> Joyner of King's College, London.`;
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

    test("Translate Tea time is usually around 4 or 4.30. to American English", (done) => {
          const input = "Tea time is usually around 4 or 4.30.";
          const locale = 'british-to-american';
          const expect =  `Tea time is usually around 4 or <span class="highlight">4:30</span>.`;
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

    test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
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
    
    test('Highlight translation in I ate yogurt for breakfast.', (done) => {
    const input = 'I ate yogurt for breakfast.';
    const locale = 'american-to-british';
    const expect =  'I ate <span class="highlight">yoghurt</span> for breakfast.';
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

    test("Highlight translation in We watched the footie match for a while.", (done) => {
      const input = "We watched the footie match for a while.";
      const locale = 'british-to-american';
      const expect =  `We watched the <span class="highlight">Soccer</span> match for a while.`;
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

    test("Highlight translation in Paracetamol takes up to an hour to work.", (done) => {
      const input = "Paracetamol takes up to an hour to work.";
      const locale = 'british-to-american';
      const expect =  `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
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
    
});
