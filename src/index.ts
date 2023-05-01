import express, {Request, Response} from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
const videos = {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "string",
        "publicationDate": "string",
        "availableResolutions": [
            "P144"
        ]
    }

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
