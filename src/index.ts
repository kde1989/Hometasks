import express, {Request, Response} from 'express'

const app = express()
const port = 3000

let videos = [
    {
        id: 1,
        title: "The Matrix",
        author: "Laurence and Andrew Paul Wachowski",
        canBeDownloaded: true,
        minAgeRestriction: 16,
        createdAt: "1999-03-31T10:22:30.993Z",
        publicationDate: "1999-04-01T10:22:30.993Z",
        availableResolutions: [
            "720"
        ]
    }
]

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Online cinema "Platinum"</h1>')
})
app.get('/videos', (req: Request, res: Response) => {
    res.json(videos)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(videos => videos.id === +req.params.id);

    if (!foundVideo) {
        res.sendStatus(404);
        return;
    }

    res.json(foundVideo)
})
app.post('/videos', (req: Request, res: Response) => {
    const createdVideo = {
        id: 3,
        title: "The Matrix Revolutions",
        author: "Laurence and Andrew Paul Wachowski",
        canBeDownloaded: true,
        minAgeRestriction: 16,
        createdAt: "2003-11-05T10:22:30.993Z",
        publicationDate: "2003-11-06T10:22:30.993Z",
        availableResolutions: [
            "1080"
        ]
    }
    videos.push(createdVideo)
    res.status(201).json(createdVideo);

    if (!req.body.title) {
        res.sendStatus(400)
        return;
    }
})
app.put('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(videos => videos.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(404)
        return;
    }
    foundVideo.title = req.body.title;
    res.sendStatus(204)

    if (!req.body.title) {
        res.sendStatus(400)
        return;
    }
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const newVideos = videos.filter(videos => videos.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    const noVideos = []
    res.sendStatus(204)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
