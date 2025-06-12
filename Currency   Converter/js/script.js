let numEnglish = [
  ['zero'],
  ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
  ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], ['hundred'],
  ['', 'thousand', 'million', 'billion']
];

let currencyEnglish = [['dollar', 'euro', 'pound', 'ruble'], ['cent', 'cent', 'cent', 'kopeika']];


let mistakes = [['incorrect value']];


// text validation 
let validateNumber= function(str){
  return ((/^[0-9,.\\s]+$/).test(str));    
};

// text publishing
let publishWordsNumber = function(strEn, strRu){
  $('.num-to-word-converter-english span').eq(1).text(strEn);
}

// en prepare number for hundreds
let enHundredsPrepare = function(str){
  let txt= '';

  // prepare num more than 100
  if(+str>99){
     txt = numEnglish[1][Math.floor((+str)/100)] +" " + numEnglish[4][0]+ " ";
    str = str.substring(1);
  }
  // prepare num more than 19 and less than 100
   if((+str)>19){
    txt += numEnglish[3][Math.floor((+str)/10)] + " ";
    str = str.substring(1);
  }
  // prepare num more than 9 and less than 20
  if((+str)<20&(+str)>9){
    txt += numEnglish[2][+str-10];
  }
  
  // prepare num less than 10
  if(+str<10 & +str!=0){
    txt += numEnglish[1][str];
  }
  
  return txt;
};

// en prepare threes
let enThreesPrepare = function(str){
  let txt='';
  
// split string to three numbers from end to start
  let charsLength = str.length;
  let chunks = [];  
 for (let i = charsLength ; i > 0; i -= 3) {
    chunks.push(str.substring(i - 3, i));
}
  
// add three numbers place ()  
  charsLength = chunks.length;
  for(let j = 0; j < charsLength; j++){
    txt = enHundredsPrepare(chunks[j]) + " " + numEnglish[5][j] + " " + txt;
  }
   
  return txt;
  
}

// en prepare dollars
let enDollarPrepare = function(str){
  
   if(+str == 0){
    return (numEnglish[0][0]+' '+ currencyEnglish[0][$('input:radio:checked').val()]);
  }
  
    let endOfString = '';
  if (+str>1){
    endOfString ='s';
  }
  
    let txt = enThreesPrepare(str);
  
  return ('' +txt+' '+ currencyEnglish[0][$('input:radio:checked').val()] + endOfString);
}

// en prepare sums of cents
let enCentsPrepare = function(str){

  let endOfString = '';
  if (+str>1){
    endOfString ='s';
  }
  return ('' +str+' '+ currencyEnglish[1][$('input:radio:checked').val()] + endOfString);

};


// getting answer 
let numGetting = function (){
  
    str = $('#num').val();
  if (!validateNumber(str) || str.length >12){
//     if there are any unexpected symbols - return mistake
    answerEn = mistakes[0][0];
  }else{
    
 // clear superfluous symbols
    str = str.replace(/\\s/g,"");
    str = str.replace(/,/g,".");
    str = str.replace(/(.*)\\./, x => x.replace(/\\./g,'')+'.');
    str = Math.round(((+str)*100))/100;
    
    let valueCurrency = (""+str).split('.');
    if (valueCurrency.length<2){
      valueCurrency[1] = '00'
    } else if (valueCurrency[1].length<2){
      valueCurrency[1] = "" + valueCurrency[1] + "0";
    } 
    str = ''+valueCurrency[0]+"."+valueCurrency[1];

// update input 
    $('#num').val(str);
    
// answers here
  answerEn = enDollarPrepare(valueCurrency[0]) + " " + enCentsPrepare(valueCurrency[1]);

    
    answerEn = answerEn[0].toUpperCase() + answerEn.slice(1);
     

  }
  
  publishWordsNumber(answerEn);
  
};

// update after inputs of number
$('#num').change(function(){
    numGetting();
});

// update after inputs of currency
$('.currency').change(function(){
    numGetting();
  
});


// add text to clipBoard
let addToClipBoard = function(str){
  const clpBoard = document.createElement('textarea');
  clpBoard.value = str;
  clpBoard.setAttribute('readonly', '');
  clpBoard.style.position = 'absolute';
  clpBoard.style.left = '-9999px';
  document.body.appendChild(clpBoard);
  clpBoard.select();
  document.execCommand('copy');
  document.body.removeChild(clpBoard);
}

// select English text for coping to clipboard
$('.num-to-word-converter-copy-english').click(function(){
  addToClipBoard($('.num-to-word-converter-english span').eq(1).text());
});

