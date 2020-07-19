import express from 'express';
import PtVocab from './src/reader';
import fs from 'fs';
import cors from 'cors';

const app: express.Application = express();

app.use(cors());

app.get('/', async (req, res) => {
    await fs.readFile('src/accuratedInfos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ message: 'error no accuratedInfos.json found, try /gerardado end point' })
        }
        return res.json(JSON.parse(data));
    });
});

app.get('/gerardados', async function (req, res) {
    const ptVocab = new PtVocab();
    return res.json(JSON.parse(await ptVocab.getTods()));
});

app.listen(3333, function () {
    console.log('app listening on port 3333');
});