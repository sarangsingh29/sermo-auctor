import React from 'react';
import {EditingSpace} from "./editing-space";

export interface EditFormProps {

}

export class EditForm extends React.Component<any, any> {

    private static FILE_SAVE_RESOURCE = "/api/form-submit-url"

    constructor(props: EditFormProps) {
        super(props);

        this.state = {
            content: "",
            filePath: "/Users/saarang/Desktop/node/server.out"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFileLoad = this.handleFileLoad.bind(this)
        this.handleFileSelection = this.handleFileSelection.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
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

    handleFormSubmit(event) {
        event.preventDefault()

        fetch(EditForm.FILE_SAVE_RESOURCE, {
            method: "POST",
            body: JSON.stringify({
                content: this.state.content,
                filePath: this.state.filePath
            }),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            this.setState({
                content: res.body["latestContent"]
            })
        });
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" value={this.state.filePath} size={115} onChange={event => {this.setState({filePath: event.target.value})}}/>
                <EditingSpace content={this.state.content} onChangeHandler={this.handleChange}/>
                <br/>
                <input type="file" onChange={this.handleFileSelection}/>
                <input type="submit" value="Save"/>
            </form>
        )
    }
}
