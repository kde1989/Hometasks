import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000
const videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-05-02T14:09:09.441Z",
        "publicationDate": "2023-05-02T14:09:09.441Z",
        "availableResolutions": [
            "P144"
        ]
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Online cinema "Platinum"')
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})