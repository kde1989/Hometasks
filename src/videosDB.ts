type videoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

const videos = [
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
