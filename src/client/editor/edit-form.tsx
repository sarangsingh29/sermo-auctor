import React from 'react';
import {EditingSpace} from "./editing-space";


import {Form, FormInput} from "shards-react";


export interface EditFormProps {

}

export class EditForm extends React.Component<any, any> {

    constructor(props: EditFormProps) {
        super(props);

        this.state = {
            validPath: false
        }
    }

    render() {
        return (


            <div className={"jumbotron p-4"}>
                <Form onSubmit={this.props.handleFormSubmit}>

                    <EditingSpace content={this.props.content}
                                  onChangeHandler={this.props.handleChange}/>

                    <p className="lead"></p>

                    <div className={"row justify-content-end"}>

                        <div className={"col-2 custom-file"}>
                            <input type={"file"} className={"custom-file-input"} onChange={this.props.handleFileSelection}/>
                            <label className={"custom-file-label"}>Load File</label>
                        </div>

                        <div className={"col-7"}>
                            <FormInput valid={this.props.validPath}
                                       invalid={!this.props.validPath}
                                       type="text" value={this.props.filePath}
                                       onChange={this.props.handleFileNameInput}/>
                        </div>

                        <div className={"col-2"}>
                            <button type={"submit"} value={"Save"}
                                    className={"btn btn-primary btn-success btn-block"}>Save
                            </button>
                        </div>
                    </div>
                </Form>
            </div>


        )
    }
}
