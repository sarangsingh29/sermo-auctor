import * as fs from "fs";

//const fs = require("fs")
export class FileSaveResource {

    public handleFileSave(req, res) {
        const filePath = req.body.filePath
        const newContent = req.body.content
        fs.writeFileSync(filePath, newContent, "utf-8")

        res.send({
            "content": fs.readFileSync(filePath, "utf-8").toString()
        })
    }

    public handleReadFile(req, res) {

        const file = req.query.filePath
        res.send({
            "content": fs.readFileSync(file, "utf-8")
        })
    }
}
