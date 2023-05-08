import express, {Request, Response} from 'express'

const app = express()
const port = 3000

type videoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}
let videos: videoType[] = [
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
    },
    {
        id: 2,
        title: "The Matrix Reloaded",
        author: "Laurence and Andrew Paul Wachowski",
        canBeDownloaded: true,
        minAgeRestriction: 16,
        createdAt: "2003-05-15T10:22:30.993Z",
        publicationDate: "2003-05-16T10:22:30.993Z",
        availableResolutions: [
            "1080"
        ]
    }
]

enum availableResolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

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
    const createdAt = new Date()
    const publicationDate = new Date(createdAt.getTime() + 86400000)
    let createdVideo:videoType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: ['availableResolutions']
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
