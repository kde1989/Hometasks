import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {videosRouter} from "./routes/videos-router";

const app = express();
const port = process.env.PORT || 3000;
const parserMiddleware = bodyParser({});
const corsMiddleware = cors();

app.use(parserMiddleware);
app.use(corsMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Online cinema "Platinum"')
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    res.send(204)
})

app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})