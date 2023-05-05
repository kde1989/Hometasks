import {Request, Response, Router} from "express";

let videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-05-05T08:54:39.348Z",
        "publicationDate": "2023-05-05T08:54:39.348Z",
        "availableResolutions": [
            "P144"
        ]
    }
]
const HTTPResponseStatusCodes = {
    OK_200: 200,
    Created_201: 201,
    No_Content_204: 204,
    Bad_Request_400: 400,
    Not_Found_404: 404
}
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos).send(HTTPResponseStatusCodes.OK_200)
})
videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.send(HTTPResponseStatusCodes.Bad_Request_400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect title!",
                    "field": "title"
                }
            ]})
        return;
    }
    const newVideo = {
        id: 2,
        title: 'the_matrix_revolutions',
        author: "wachowski",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2003-11-05T14:09:09.441Z",
        publicationDate: "2003-11-06T14:09:09.441Z",
        availableResolutions: ['P144']
    }
    videos.push(newVideo)
    res.send(newVideo).send(HTTPResponseStatusCodes.Created_201)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        res.send(video).send(HTTPResponseStatusCodes.OK_200)
    } else {
        res.send(HTTPResponseStatusCodes.Not_Found_404)
    }
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.send(HTTPResponseStatusCodes.Bad_Request_400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect title!",
                    "field": "title"
                }
            ]})
        return;
    }
    let video = videos.find(v => v.id === +req.params.id)
    if(video) {
        video.title = req.body.title
        res.send(HTTPResponseStatusCodes.No_Content_204)
    } else {
        res.send(HTTPResponseStatusCodes.Not_Found_404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newVideo = videos.filter(v => v.id !== id)
    if(newVideo.length < videos.length) {
            videos = newVideo
            res.send(HTTPResponseStatusCodes.No_Content_204)
        } else {
        res.send(HTTPResponseStatusCodes.Not_Found_404)
        }
})