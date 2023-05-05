import {Request, Response, Router} from "express";

let videos = [
        {
            id: 1,
            title: 'the_matrix',
            author: 'wachowski',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            createdAt: "1999-03-31T14:09:09.441Z",
            publicationDate: "1999-04-01T14:09:09.441Z",
            availableResolutions: ['P144']
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