const Word = require('../Word');

class Translator {
  translate(req, res, next)
  {
    const { text, locale } = req.body;
    let oneWordArray;
    let threeWordArray;
    if(text){
      oneWordArray = text.split(' ');
      threeWordArray = threeWordFunction(oneWordArray);
    }
    const regex = /[^\w\s>]{1,}$/;
    const timeRegex = /\d+[:|.]\d+/g;
    const title = /[^mr\.|mrs\.|ms\.|mx\.|dr\.|prof\.|Mr\.|Mrs\.|Ms\.|Mx\.|Dr\.|Prof\.]/g
    if(text === "") {
      req.error = 'No text to translate';
      next();
    }
    else if (!text || !locale) {
      req.error = "Required field(s) missing";
      next();
    }
    
    else if(locale === 'american-to-british'){
      let marks3 = [];
      for(let i = 0; i < threeWordArray.length; i++) {
        if(regex.test(threeWordArray[i])){
          marks3.push({ mark: threeWordArray[i].match(regex), index: i});
          threeWordArray[i] = threeWordArray[i].replace(regex, '');
     }
      }
      Word.AmericanWord.find({ American: { $in: threeWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
        for(let i = 0; i < threeWordArray.length; i++) {
          for(let j = 0; j< docs.length; j++){
            if(docs[j].American === threeWordArray[i].toLowerCase()){
              if(i === 0) {
                threeWordArray[i] = highlight(firstUpper(docs[j].British));
              }
              else{
                threeWordArray[i] = highlight(docs[j].British);
              }
              
            }
          }
        }
        marks3.forEach(mark => {
        threeWordArray[mark.index] += mark.mark;
        })
        let twoWordArray = twoWordFunction(threeWordArray);
        let marks2 = [];
        for(let i = 0; i< twoWordArray.length; i++) {
          if(regex.test(twoWordArray[i])){
          marks2.push({ mark: twoWordArray[i].match(regex), index: i});
          twoWordArray[i] = twoWordArray[i].replace(regex, '');
        }
        }
          Word.AmericanWord.find({ American: { $in: twoWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
        for(let i = 0; i< twoWordArray.length; i++) {
          for(let j = 0; j< docs.length;j++){
            if(docs[j].American === twoWordArray[i].toLowerCase()){
              twoWordArray[i] = highlight(docs[j].British);
            }
          }
        }
        
        marks2.forEach(mark => {
        twoWordArray[mark.index] += mark.mark;
        })
        oneWordArray = oneWordFunction(twoWordArray);
        let marks = [];
          for(let i = 0; i< oneWordArray.length; i++){
     if(regex.test(oneWordArray[i])&&title.test(oneWordArray[i])){
          marks.push({ mark: oneWordArray[i].match(regex), index: i});
          oneWordArray[i] = oneWordArray[i].replace(regex, '');
        }
          }
        Word.AmericanWord.find({ American: { $in: oneWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
      for(let i = 0; i< oneWordArray.length; i++){ 
        if(timeRegex.test(oneWordArray[i])){
          oneWordArray[i] = highlight(oneWordArray[i].replace(/:/g, '.'))
        }
        for(let j = 0; j < docs.length; j++){
          if(docs[j].American === oneWordArray[i].toLowerCase()){
            
            if(i === 0){
              oneWordArray[i] = highlight(firstUpper(docs[j].British));
            }
            else{
              if(!title.test(oneWordArray[i])){
              oneWordArray[i] = highlight(firstUpper(docs[j].British));
              }
              else{
                oneWordArray[i] = highlight(docs[j].British);
              }
              
            }
            
          }
        }
      }
      marks.forEach(mark => {
        oneWordArray[mark.index] += mark.mark;
      })
      oneWordArray[0] = firstUpper(oneWordArray[0]);
      let result = oneWordArray.join(' ');
      if(result === text){
        result = 'Everything looks good to me!';
      }
      req.words = result;
      next();
    })
        })})
      
      
      
    }
    else if(locale === 'british-to-american'){
      let marks3 = [];
      for(let i = 0; i < threeWordArray.length; i++) {
        if(regex.test(threeWordArray[i])){
          marks3.push({ mark: threeWordArray[i].match(regex), index: i});
          threeWordArray[i] = threeWordArray[i].replace(regex, '');
     }
      }
      Word.BritishWord.find({ British: { $in: threeWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
        for(let i = 0; i < threeWordArray.length; i++) {
          for(let j = 0; j< docs.length; j++){
            if(docs[j].British === threeWordArray[i].toLowerCase()){
              if(i === 0){
                threeWordArray[i] = highlight(firstUpper(docs[j].American));
              }
              else{
                threeWordArray[i] = highlight(docs[j].American);
              }
              
            }
          }
        }
        marks3.forEach(mark => {
        threeWordArray[mark.index] += mark.mark;
        })
        let twoWordArray = twoWordFunction(threeWordArray);
         let marks2 = [];
        for(let i = 0; i< twoWordArray.length; i++) {
          if(regex.test(twoWordArray[i])){
          marks2.push({ mark: twoWordArray[i].match(regex), index: i});
          twoWordArray[i] = twoWordArray[i].replace(regex, '');
        }
        }
          Word.BritishWord.find({ British: { $in: twoWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
       
        
        for(let i = 0; i< twoWordArray.length; i++) {
          for(let j = 0; j< docs.length;j++){
            if(docs[j].British === twoWordArray[i].toLowerCase()){
              twoWordArray[i] = highlight(docs[j].American);
            }
          }
        }
        marks2.forEach(mark => {
        twoWordArray[mark.index] += mark.mark;
        })
        oneWordArray = oneWordFunction(twoWordArray);
            let marks = [];
          for(let i = 0; i< oneWordArray.length; i++){
     if(regex.test(oneWordArray[i])){
          marks.push({ mark: oneWordArray[i].match(regex), index: i});
          oneWordArray[i] = oneWordArray[i].replace(regex, '');
        }
          }
        Word.BritishWord.find({ British: { $in: oneWordArray.map(w => w.toLowerCase()) } }, function(err, docs) {
      for(let i = 0; i< oneWordArray.length; i++){
        if(timeRegex.test(oneWordArray[i])){
          oneWordArray[i] = highlight(oneWordArray[i].replace(/\./g, ':'))
        }
        for(let j = 0; j < docs.length; j++){
          if(docs[j].British === oneWordArray[i].toLowerCase()){
            const title = /^[mr|mrs|ms|mx|dr|prof|Mr|Mrs|Ms|Mx|Dr|Prof]/g
            if(title.test(docs[j].British)){
              oneWordArray[i] = highlight(firstUpper(docs[j].American));
            }
            else if(i === 0){
              oneWordArray[i] = highlight(firstUpper(docs[j].American));
            }
            else{
                oneWordArray[i] = highlight(docs[j].American);
              }
          }
        }
      }
      marks.forEach(mark => {
        oneWordArray[mark.index] += mark.mark;
      })
      oneWordArray[0] = firstUpper(oneWordArray[0]);
      let result = oneWordArray.join(' ');
      if(result === text){
        result = 'Everything looks good to me!';
      }
      req.words = result;
      next();
    })
        })})
    }
    else {
      req.error = 'Invalid value for locale field';
      next();
    } 
  }  
}

function highlight(word){
  return `<span class="highlight">${word}</span>`
}
function firstUpper(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function firstLower(word){
  return word.charAt(0).toLowerCase() + word.slice(1);
}
function twoWordFunction(threeWordArray){
  const regex = /<\/span>/;
  const twoWordArray = [];
  if(threeWordArray.length == 1&& threeWordArray[0].split(' ').length <= 2) {
    return threeWordArray;
  }
  if(regex.test(threeWordArray[0])){
    twoWordArray.push(threeWordArray[0]);
  }
  else{
    twoWordArray.push(threeWordArray[0].split(' ')[0] + " " + threeWordArray[0].split(' ')[1]);
  }
  for(let i =0;i< threeWordArray.length; i++){
    if(regex.test(threeWordArray[i])){
      twoWordArray.pop();
      twoWordArray.push(threeWordArray[i]);
    }
    else {
      twoWordArray.push(threeWordArray[i].split(' ')[1] + " " + threeWordArray[i].split(' ')[2]);
    }
  }
  return twoWordArray;
}
  function oneWordFunction(twoWordArray){
  const regex = /<\/span>/;
  const oneWordArray = [];
    if(twoWordArray.length == 1 && twoWordArray[0].split(' ').length == 1){
      return twoWordArray;
    }
   if(regex.test(twoWordArray[0])){
    twoWordArray.push(twoWordArray[0]);
  }
  else{
    oneWordArray.push(twoWordArray[0].split(' ')[0]);
  }
  for(let i = 0; i < twoWordArray.length; i++){
    if(regex.test(twoWordArray[i])){
      oneWordArray.pop();
      oneWordArray.push(twoWordArray[i]);
    }
    else{
      oneWordArray.push(twoWordArray[i].split(' ')[1]);
    }
  }
  return oneWordArray;
}
  function threeWordFunction(oneWordArray) {
    const threeWordArray = [];
    if(oneWordArray.length >=3){
      for(let i = 0; i < oneWordArray.length - 2;i++) {
        threeWordArray.push(oneWordArray[i] + " " + oneWordArray[i+1] + " " + oneWordArray[i + 2]);
    }
    return threeWordArray;
    }
      
    else {
      return oneToTwo(oneWordArray);
    }
  }
  function oneToTwo(oneWordArray) {
    const twoWordArray = [];
    if(oneWordArray.length >= 2){
      for(let i = 0;i< oneWordArray.length - 1;i++){
      twoWordArray.push(oneWordArray[i] + " " + oneWordArray[i + 1]);
    }
    return twoWordArray;
    }
    else return oneWordArray;
  }

module.exports = Translator;