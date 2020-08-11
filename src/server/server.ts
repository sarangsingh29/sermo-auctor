import {FileSaveResource} from "./file-save-resource.js";

import * as express from "express"
import * as path from "path"

// const express = require("express")
// const path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static(path.resolve('build')));

const fileSaveResource = "/api/form-submit-url"

const resource = new FileSaveResource()

app.post(fileSaveResource, async (req, res) => {
    resource.handleFileSaveRequest(req, res)
})

app.get('*', (req, res) => {
    console.log("going to server index.html")
    res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

