import * as fs from "fs";

//const fs = require("fs")
export class FileSaveResource {

    constructor() {}

    public handleFileSaveRequest(req, res) {
        console.log(req.body["content"])

        const filePath = req.body.filePath
        const newContent = req.body.content
        fs.writeFileSync(filePath, newContent, "utf-8")

        res.send({
            "newContent": fs.readFileSync(filePath, "utf-8").toString()
        })
    }
}
