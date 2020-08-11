import React from 'react';

export interface RecentListProps {

}

export class RecentList extends React.Component<any, any> {

    constructor(props: RecentListProps) {
        super(props);
    }

    render() {
        return (
            <ul>
                <li>{this.props.recentPath}</li>
                <li>{this.props.recentPath}</li>
                <li>{this.props.recentPath}</li>
                <li>{this.props.recentPath}</li>
                <li>{this.props.recentPath}</li>
            </ul>
        )
    }
}