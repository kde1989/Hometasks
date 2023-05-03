import {Request, Response, Router} from "express";

const videos = [
    {
        id: 1,
        title: 'matrix',
        author: 'wachowski',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-05-02T14:09:09.441Z",
        publicationDate: "2023-05-02T14:09:09.441Z",
        availableResolutions: [
            "P144"
        ]
    },
]
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {
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
videosRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        res.send(video)
    } else {
        res.send(404)
    }
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        video.title = req.body.title
        res.send(video)
    } else {
        res.send(404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if(videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})