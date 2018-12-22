const fs = require('fs');

let alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y', 'Z'];

//PUT FILE IN THE STRING
try {
    var data = [];
    for(let i = 0; i < 26; i++){
        data = data + fs.readFileSync('alf/'+ alfabeto[i] + '.txt', 'utf8')
    }
} catch(e) {
    console.log('Error:', e.stack);
}

//SEPARATE ALL THE WORDS IN A ARRAY
splitString = data.split("\n");
let listaAdj = [];

//GET JUST THE ADJ
for(i = 0; i < splitString.length; i = i + 2){
    if (splitString[i].startsWith('_*') && splitString[i+1].startsWith('_adj')) {
        let retorno = splitString[i];
        retorno = retorno.replace('*,', '');
        retorno = retorno.replace('_*', '');
        if(retorno.endsWith(')')){
            retorno = retorno.substr(0, retorno.search(' '));
        }
        listaAdj[listaAdj.length] = retorno;
    }
}

let sufixoOso = [];
let sufixoAdo = [];
let sufixoAnte = [];
let sufixoVel = [];
let sufixoAl = [];


//LOOKING FOR SOME INFOS
for( let i = 0; i < listaAdj.length; i++){
    if(listaAdj[i].endsWith('oso') || listaAdj[i].endsWith('osa')){
        sufixoOso[sufixoOso.length] = listaAdj[i];
    }
    if(listaAdj[i].endsWith('ante') || listaAdj[i].endsWith('ente')){
        sufixoAnte[sufixoAnte.length] = listaAdj[i];
    }
    if(listaAdj[i].endsWith('ado') || listaAdj[i].endsWith('edo') || listaAdj[i].endsWith('ido')){
        sufixoAdo[sufixoAdo.length] = listaAdj[i];
    }
    if(listaAdj[i].endsWith('vel')){
        sufixoVel[sufixoVel.length] = listaAdj[i];
    }
    if(listaAdj[i].endsWith('al')){
        sufixoAl[sufixoAl.length] = listaAdj[i];
    }
}


ptAdjVocab = {
    'totalPalavras': splitString.length,
    'totalAdj': listaAdj.length,
    'sufixoAnde': sufixoAnte.length,
    'sufixoAl': sufixoAl.length,
    'sufixoAdo': sufixoAdo.length,
    'sufixoVel': sufixoVel.length,
    'sufixoOso': sufixoOso.length
}

console.log(ptAdjVocab);