import {FileSaveResource} from "./file-save-resource.js";

import * as express from "express"
import * as path from "path"
import {DirectoryOperations} from "./directory-operations";

// const express = require("express")
// const path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static(path.resolve('build')));

const resources = {
    saveFile: "/file/write",
    readFile: "/file/read",
    list: "/list"
}

const fileSaveResource = new FileSaveResource()
app.post(resources.saveFile, async (req, res) => {
    fileSaveResource.handleFileSave(req, res)
})

app.get(resources.readFile, async (req, res) => {
    fileSaveResource.handleReadFile(req, res)
})

const listDirectoryResource = new DirectoryOperations()
app.get(resources.list, async (req, res) => {
    listDirectoryResource.listDirectory(req, res)
})

app.get('*', (req, res) => {
    console.log("going to server index.html")
    res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

