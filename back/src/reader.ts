import fs from 'fs';


interface Listas {
    listaAdjetivo: string[];
    listaVerbo: string[];
    listaSubstantivoMasculino: string[];
    listaSubstantivoFeminino: string[];
}

interface InfosExtraction {
    sufixoOso: string[];
    sufixoAdo: string[];
    sufixoAnte: string[];
    sufixoVel: string[];
    sufixoAl: string[];
}

interface todos {
    total: {
        total: number;
        totalSubstantivo: {
            total: number;
            average: number;
            totalsubstantivoFeminino: {
                total: number;
            };
            totalSubstantivoMasculino: {
                total: number;
            };
        }

        totalVerbo: {};
        totalAdjetivo: {
            total: number;
            average: number;
            sufixo: {};
        };
    };
}

class PtVocab {
    private putFileInTheString(): string {
        let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        var data: string = "";
        try {
            for (let i = 0; i < 26; i++) {
                data = data + fs.readFileSync(__dirname + '/alf/' + alfabeto[i] + '.txt', 'utf8');
            }
        } catch (e) {
            console.log('Error:', e.stack);
        }
        return data;
    }

    private separeteAllTheWordInAArray(): Listas {
        const data = this.putFileInTheString();
        let splitString = data.split("\n");
        let listaAdjetivo = [];
        let listaVerbo = [];
        let listaSubM = [];
        let listaSubF = [];

        //GET JUST THE ADJ / VERB / SUBS FEM / SUBS MASC
        for (let i = 0; i < splitString.length; i = i + 2) {
            if (splitString[i].startsWith('_*')) {
                let retorno = splitString[i];
                retorno = retorno.replace('_*', '');
                retorno = retorno.substr(0, retorno.search(","));
                retorno = retorno.replace('*', '');
                if (splitString[i + 1].startsWith('_adj')) {
                    listaAdjetivo[listaAdjetivo.length] = retorno;
                }
                if (splitString[i + 1].startsWith('_v.')) {
                    listaVerbo[listaVerbo.length] = retorno;
                }
                if (splitString[i + 1].startsWith('_f.')) {
                    listaSubM[listaSubM.length] = retorno;
                }
                if (splitString[i + 1].startsWith('_m.')) {
                    listaSubF[listaSubF.length] = retorno;
                }
            }
        }

        return { listaAdjetivo, listaVerbo, listaSubstantivoMasculino: listaSubM, listaSubstantivoFeminino: listaSubF }

    }

    private extractinInfos(): InfosExtraction {
        const listas = this.separeteAllTheWordInAArray();

        let sufixoOso = [];
        let sufixoAdo = [];
        let sufixoAnte = [];
        let sufixoVel = [];
        let sufixoAl = [];

        for (let i = 0; i < listas.listaAdjetivo.length; i++) {
            if (listas.listaAdjetivo[i].endsWith('oso') || listas.listaAdjetivo[i].endsWith('osa')) {
                sufixoOso[sufixoOso.length] = listas.listaAdjetivo[i];
            }
            if (listas.listaAdjetivo[i].endsWith('ante') || listas.listaAdjetivo[i].endsWith('ente')) {
                sufixoAnte[sufixoAnte.length] = listas.listaAdjetivo[i];
            }
            if (listas.listaAdjetivo[i].endsWith('ado') || listas.listaAdjetivo[i].endsWith('edo') || listas.listaAdjetivo[i].endsWith('ido')) {
                sufixoAdo[sufixoAdo.length] = listas.listaAdjetivo[i];
            }
            if (listas.listaAdjetivo[i].endsWith('vel')) {
                sufixoVel[sufixoVel.length] = listas.listaAdjetivo[i];
            }
            if (listas.listaAdjetivo[i].endsWith('al')) {
                sufixoAl[sufixoAl.length] = listas.listaAdjetivo[i];
            }
        }

        return { sufixoOso, sufixoAdo, sufixoAnte, sufixoVel, sufixoAl }
    }

    private understandinInfos(): todos {
        const { listaAdjetivo, listaSubstantivoFeminino: listaSubF, listaSubstantivoMasculino: listaSubM, listaVerbo } = this.separeteAllTheWordInAArray();
        const { sufixoAnte, sufixoAl, sufixoAdo, sufixoVel, sufixoOso } = this.extractinInfos();

        const adjetivoLength = listaAdjetivo.length;
        const substantivoFemininoLength = listaSubF.length;
        const substantivoMasculinoLength = listaSubM.length;
        const verboLength = listaVerbo.length

        let totalWords = adjetivoLength
            + substantivoFemininoLength
            + substantivoMasculinoLength
            + verboLength;

        const totalSubstantivo = substantivoFemininoLength + substantivoMasculinoLength;
        const substantivoFemininoAverage = (100 / totalSubstantivo) * substantivoFemininoLength;
        const substantivoMasculinoAverage = (100 / totalSubstantivo) * substantivoMasculinoLength;

        const adjetivoAverage = (100 / totalWords) * adjetivoLength;
        const verboAverage = (100 / totalWords) * verboLength;
        const substantivoAverage = (100 / totalWords) * totalSubstantivo;

        let sufixoAnteAverage = (100 / adjetivoLength) * sufixoAnte.length
        let sufixoAlAverage = (100 / adjetivoLength) * sufixoAl.length;
        let sufixoAdoAverage = (100 / adjetivoLength) * sufixoAdo.length;
        let sufixoVelAverage = (100 / adjetivoLength) * sufixoVel.length;
        let sufixoOsoAverage = (100 / adjetivoLength) * sufixoOso.length;

        let ptAdjVocab = {
            total: {
                total: totalWords,
                totalSubstantivo: {
                    total: totalSubstantivo,
                    average: substantivoAverage,
                    totalsubstantivoFeminino: {
                        total: substantivoFemininoLength,
                        average: substantivoFemininoAverage
                    },
                    totalSubstantivoMasculino: {
                        total: substantivoMasculinoLength,
                        average: substantivoMasculinoAverage
                    }
                },
                totalVerbo: {
                    total: verboLength,
                    average: verboAverage
                },
                totalAdjetivo: {
                    total: adjetivoLength,
                    average: adjetivoAverage,
                    sufixo: {
                        sufixoAnde: { total: sufixoAnte.length, average: sufixoAnteAverage },
                        sufixoAl: { total: sufixoAl.length, average: sufixoAlAverage },
                        sufixoAdo: { total: sufixoAdo.length, average: sufixoAdoAverage },
                        sufixoVel: { total: sufixoVel.length, average: sufixoVelAverage },
                        sufixoOso: { total: sufixoOso.length, average: sufixoOsoAverage }
                    }
                },

            },
        }

        return ptAdjVocab;
    }

    private tods: todos;

    constructor() {
        this.tods = this.understandinInfos();
    }

    public getTods() {
        var json = JSON.stringify(this.tods);
        fs.writeFile('src/accuratedInfos.json', json, 'utf8', () => { });

        return json;
    }

}

export default PtVocab;
