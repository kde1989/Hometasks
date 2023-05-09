import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;

const corsMiddleware = cors();
app.use(corsMiddleware);
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Online cinema "Platinum"</h1>')
});

const availableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

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
];

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length);
    res.sendStatus(204)
});

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
});
app.get('/videos/:id', (req: Request, res: Response) => {
    let foundVideo = videos.find(videos => videos.id === +req.params.id);
    if (foundVideo) {
        res.send(foundVideo)
    } else {
        res.sendStatus(404)
    }
});
app.post('/videos', (req: Request, res: Response) => {
    let createdVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: (new Date().toISOString()),
        publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
        availableResolutions: req.body.availableResolutions
    };
    let errors = [];

    if (typeof createdVideo.title !== 'string' || createdVideo.title.length > 40) {
        errors.push({message: 'error', field: 'title'})
    }
    if (typeof createdVideo.author !== 'string' || createdVideo.author.length > 20) {
        errors.push({message: 'error', field: 'author'})
    }
    if (Array.isArray(createdVideo.availableResolutions)) {
        const length = createdVideo.availableResolutions.length;
        let checking = createdVideo.availableResolutions.filter(value => {
            return availableResolutions.includes(value)
        })
        if (checking.length < length) {
            errors.push({message: 'error', field: 'availableResolutions'})
        }
    } else {
        errors.push({message: 'error', field: 'availableResolutions'})
    }
    if (typeof createdVideo.canBeDownloaded !== "boolean") {
        if (createdVideo.canBeDownloaded === undefined) {
            createdVideo.canBeDownloaded = false
        } else {
            errors.push({message: 'error', field: 'canBeDownloaded'})
        }
    }
    if (createdVideo.minAgeRestriction !== null && typeof createdVideo.minAgeRestriction !== "number") {
        if (createdVideo.minAgeRestriction === undefined) {
            createdVideo.minAgeRestriction = null
        } else {
            errors.push({message: 'error', field: 'canBeDownloaded'})
        }
    } else if (typeof createdVideo.minAgeRestriction === "number") {
        if (createdVideo.minAgeRestriction < 1 || +createdVideo.minAgeRestriction > 18) {
            errors.push({message: 'error', field: 'canBeDownloaded'})
        }
    }
    if (errors.length > 0) {
        let errorsList = {errorsMessages: errors};
        res.status(400).send(errorsList)
    } else {
        videos.push(createdVideo);
        res.status(201).json(createdVideo)
    }
});
app.put('/videos/:id', (req: Request, res: Response) => {
    let foundVideo = videos.find(videos => videos.id === +req.params.id);
    let index = videos.findIndex(videos => videos.id === +req.params.id);
    let errors = [];
    if (foundVideo) {
        const newVideo = {...foundVideo, ...req.body};
        if (typeof newVideo.title !== 'string' || newVideo.title.length > 40) {
            errors.push({message: 'error', field: 'title'})
        }
        if (typeof newVideo.author !== 'string' || newVideo.author.length > 20) {
            errors.push({message: 'error', field: 'author'})
        }
        if (Array.isArray(newVideo.availableResolutions)) {
            const length = newVideo.availableResolutions.length;
            let checking = newVideo.availableResolutions.filter((value: string) => {
                return availableResolutions.includes(value)
            })
            if (checking.length < length) {
                errors.push({message: 'error', field: 'availableResolutions'})
            }
        } else {
            errors.push({message: 'error', field: 'availableResolutions'})
        }
        if (typeof newVideo.canBeDownloaded !== "boolean") {
            errors.push({message: 'error', field: 'canBeDownloaded'})
        }
        if (newVideo.minAgeRestriction !== null && typeof newVideo.minAgeRestriction !== "number") {
            errors.push({message: 'error', field: 'canBeDownloaded'})
        } else if (typeof newVideo.minAgeRestriction === "number") {
            if (+newVideo.minAgeRestriction < 1 || +newVideo.minAgeRestriction > 18) {
                errors.push({message: 'error', field: 'canBeDownloaded'})
            }
        }
        if (typeof newVideo.publicationDate !== "string") {
            errors.push({message: 'error', field: 'publicationDate'})
        }
        if (errors.length > 0) {
            let errorsList = {errorsMessages: errors};
            res.status(400).send(errorsList)
        } else {
            videos[index] = newVideo;
            res.status(204)
        }
    } else {
        res.status(404)
    }
});
app.delete('/videos/:id', (req: Request, res: Response) => {
    let id = +req.params.id;
    let newVideos = videos.filter(videos => videos.id !== id);
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})