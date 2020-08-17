import * as fs from "fs";
import * as path from "path";

export interface SingleEntry {
    readonly name: string;
    readonly isDirectory: boolean;
}

export class DirectoryOperations {

    public listDirectory(req, res) {
        const directoryPath = path.resolve(req.query.directoryPath)

        const tempListings: string[] = []
        let curPath = directoryPath
        while (curPath !== "/") {
            tempListings.push(curPath)
            curPath = path.resolve(`${curPath}/..`)
        }

        tempListings.push("/")
        //TODO: Currently, order of returned paths is important. Maybe needs some better DS.
        const listings = tempListings.reverse()

        const result = listings.map(fullPath => {
            console.log(fullPath)
            return {
                path: fullPath,
                name: path.basename(fullPath),
                subPaths: this.readSingleDirectory(fullPath)
            }
        })

        res.send({
            listings: result
        })

    }

    private readSingleDirectory(dirPath: string): SingleEntry[] {
        console.log(`Listing files for: ${dirPath}`)
        return fs.readdirSync(dirPath, {withFileTypes: true})
            .map(dirent => {
                return {
                    name: dirent.name,
                    isDirectory: dirent.isDirectory()
                }
            })
        //Uncomment the next line to prevent hidden flies from being listed.
        //.filter(entry => ! entry.name.startsWith("."))
    }

}
