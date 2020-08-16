import React from 'react';
import {FormTextarea} from 'shards-react';

export interface EditingSpaceProps {


}

export class EditingSpace extends React.Component<any, any> {

    constructor(props: EditingSpaceProps) {
        super(props);
    }

    render() {
        return (
            <FormTextarea
                value={this.props.content}
                rows={25} cols={115}
                onChange={this.props.onChangeHandler}/>
        )
    }
}
