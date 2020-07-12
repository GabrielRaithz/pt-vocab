import express from 'express';
import PtVocab from './src/reader';
import fs from 'fs';
const app: express.Application = express();

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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});