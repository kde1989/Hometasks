import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3000
const videos = [
    {
        id: 1,
        title: 'matrix',
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-05-02T14:09:09.441Z",
        publicationDate: "2023-05-02T14:09:09.441Z",
        availableResolutions: [
            "P144"
        ]
    },
]
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Online cinema "Platinum"')
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
            id: 1,
            title: 'matrix',
            author: "string",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2023-05-02T14:09:09.441Z",
            publicationDate: "2023-05-02T14:09:09.441Z",
            availableResolutions: [
                "P144"
            ]
        }
    videos.push(newVideo)
    res.send(201).send(newVideo)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        res.send(video)
    } else {
        res.send(404)
    }
})
app.put('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        video.title = req.body.title
        res.send(video)
    } else {
        res.send(404)
    }
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if(videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})