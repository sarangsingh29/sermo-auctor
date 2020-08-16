import React from 'react'
import {DirectoryListings} from "./directory/list-directory";
import {EditForm} from "./editor/edit-form";


export interface FileEditorProps {

}

export class FileEditor extends React.Component<any, any> {

    private static FILE_SAVE_RESOURCE = "/file/write"
    private static FILE_LOAD_RESOURCE = "/file/read"

    constructor(props: FileEditorProps) {
        super(props)

        const date = new Date()
        const currentTime = date.getTime()

        this.state = {
            content: "",
            filePath: `/tmp/server.out_${currentTime}`,
            validPath: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFileLoad = this.handleFileLoad.bind(this)
        this.handleFileSelection = this.handleFileSelection.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileNameInput = this.handleFileNameInput.bind(this)
        this.handleFileNameInput = this.handleFileNameInput.bind(this)
        this.loadFileFromServer = this.loadFileFromServer.bind(this)
    }


    handleChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleFileLoad(event) {
        const content = event["target"].result
        this.setState({
            content: content
        })
    }

    handleFileSelection(event) {
        console.log(event["target"].files[0])
        let file = event["target"].files[0]
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onloadend = this.handleFileLoad
    }

    loadFileFromServer(fullPath) {
        fetch(`${FileEditor.FILE_LOAD_RESOURCE}?filePath=${fullPath}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    content: data.content,
                    filePath: fullPath,
                    validPath: true
                })
            });
    }

    handleFormSubmit(event) {
        event.preventDefault()

        fetch(FileEditor.FILE_SAVE_RESOURCE, {
            method: "POST",
            body: JSON.stringify({
                content: this.state.content,
                filePath: this.state.filePath
            }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    content: data.content
                })
            });
    }

    private handleFileNameInput(event) {
        const inputPath = event.target.value
        this.setState({
            validPath: !inputPath.endsWith("/"),
            filePath: inputPath
        })
    }

    render() {
        return (
            <div className={"container mt-5"}>
                <DirectoryListings loadContent={this.loadFileFromServer}/>
                <EditForm
                    content={this.state.content}
                    handleChange={this.handleChange}
                    handleFileSelection={this.handleFileSelection}
                    handleFormSubmit={this.handleFormSubmit}
                    handleFileNameInput={this.handleFileNameInput}
                    validPath={this.state.validPath}
                    filePath={this.state.filePath}
                />
            </div>
        )
    }
}
