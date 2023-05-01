"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const videos = {
    "id": 0,
    "title": "string",
    "author": "string",
    "canBeDownloaded": true,
    "minAgeRestriction": null,
    "createdAt": "string",
    "publicationDate": "string",
    "availableResolutions": [
        "P144"
    ]
};
app.get('/videos', (req, res) => {
    res.send(videos);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
