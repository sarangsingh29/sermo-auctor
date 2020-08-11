import React from 'react';

export interface EditingSpaceProps {


}

export class EditingSpace extends React.Component<any, any> {

    constructor(props: EditingSpaceProps) {
        super(props);
    }

    render() {
        return (
            <textarea value={this.props.content} rows={40} cols={115} onChange={this.props.onChangeHandler}/>
        )
    }
}
