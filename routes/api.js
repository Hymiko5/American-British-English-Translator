'use strict';
const Translator = require('../components/translator.js');



module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post(translator.translate,(req, res) => {
      if(req.error){return res.send({ error: req.error })}
      else{
        const { text, locale } = req.body;
      const words = req.words;
      res.json({
        text, translation: words
      })
      }
      
    });
};
