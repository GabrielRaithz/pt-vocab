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
let listaV = [];
let listaSubM = [];
let listaSubF = [];

//GET JUST THE ADJ / VERB / SUBS FEM / SUBS MASC
for(i = 0; i < splitString.length; i = i + 2){
	if(splitString[i].startsWith('_*')){
		let retorno = splitString[i];
		retorno = retorno.replace('_*', '');
		retorno = retorno.substr(0, retorno.search(","));
		retorno = retorno.replace('*', '');
		if (splitString[i+1].startsWith('_adj')) {
			listaAdj[listaAdj.length] = retorno;
		}
		if(splitString[i+1].startsWith('_v.')){
			listaV[listaV.length] = retorno;
		}
		if(splitString[i+1].startsWith('_f.')){
			listaSubM[listaSubM.length] = retorno;
		}
		if(splitString[i+1].startsWith('_m.')){
			listaSubF[listaSubF.length] = retorno;
		}
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

let totalWords = listaAdj.length + listaSubF.length + listaSubM.length + listaV.length;

//CALC &
let adjAverage = (100 / totalWords) * listaAdj.length;
let sufixoAnteAverage = (100 / listaAdj.length) * sufixoAnte.length
let sufixoAlAverage = (100 / listaAdj.length) * sufixoAl.length;
let sufixoAdoAverage = (100 / listaAdj.length) * sufixoAdo.length;
let sufixoVelAverage = (100 / listaAdj.length) * sufixoVel.length;
let sufixoOsoAverage = (100 / listaAdj.length) * sufixoOso.length;

ptAdjVocab = {
    'totalPalavras': {'total': totalWords, 'average': 'undefined'},
    'totalAdj': {'total': listaAdj.length, 'average': adjAverage},
    'sufixoAnde': {'total': sufixoAnte.length, 'average': sufixoAnteAverage},
    'sufixoAl': {'total': sufixoAl.length, 'average': sufixoAlAverage},
    'sufixoAdo': {'total': sufixoAdo.length, 'average': sufixoAdoAverage},
    'sufixoVel': {'total': sufixoVel.length, 'average': sufixoVelAverage},
    'sufixoOso': {'total': sufixoOso.length, 'average': sufixoOsoAverage}
}

console.log(listaV.length);
console.log(listaSubM.length);
console.log(listaSubF.length);
console.log(ptAdjVocab);