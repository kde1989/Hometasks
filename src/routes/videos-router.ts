import {Request, Response, Router} from "express";

type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string
    publicationDate: string
    availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
}

const db: {videos: VideosType[]} = {
    videos: [
        {
            id: 1,
            title: 'the_matrix',
            author: 'wachowski',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "1999-03-31T14:09:09.441Z",
            publicationDate: "1999-04-01T14:09:09.441Z",
            availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
        },
        {
            id: 2,
            title: 'the_matrix_reloaded',
            author: 'wachowski',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2003-05-15T14:09:09.441Z",
            publicationDate: "2003-05-16T14:09:09.441Z",
            availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
        }
    ]
}
const HTTPResponseStatusCodes = {
    OK_200: 200,
    Created_201: 201,
    No_Content_204: 204,
    Bad_Request_400: 400,
    Not_Found_404: 404
}
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(db.videos).send(HTTPResponseStatusCodes.OK_200)
})
videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== 'string' || !title.trim()) {
        res.send(HTTPResponseStatusCodes.Bad_Request_400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect title!",
                    "field": "title"
                }
            ]})
        return;
    }
    const newVideo: VideosType = {
        id: 3,
        title: 'the_matrix_revolutions',
        author: "wachowski",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2003-11-05T14:09:09.441Z",
        publicationDate: "2003-11-06T14:09:09.441Z",
        availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
    }
    db.videos.push(newVideo)
    res.send(newVideo).send(HTTPResponseStatusCodes.Created_201)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    let video = db.videos.find(v => v.id === +req.params.id)
    if(video) {
        res.send(video).send(HTTPResponseStatusCodes.OK_200)
    } else {
        res.send(HTTPResponseStatusCodes.Not_Found_404)
    }
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== 'string' || !title.trim()) {
        res.send(HTTPResponseStatusCodes.Bad_Request_400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect title!",
                    "field": "title"
                }
            ]})
        return;
    }
    let video = db.videos.find(v => v.id === +req.params.id)
    if(video) {
        video.title = req.body.title
        res.send(HTTPResponseStatusCodes.No_Content_204)
    } else {
        res.send(HTTPResponseStatusCodes.Not_Found_404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < db.videos.length; i++) {
        if(db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1);
            res.send(HTTPResponseStatusCodes.No_Content_204)
            return;
        }
    }
    res.send(HTTPResponseStatusCodes.Not_Found_404)
})