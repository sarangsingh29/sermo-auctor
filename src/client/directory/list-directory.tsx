import React from 'react';

export interface DirectoryListingsProps {

    fileListing: string[]
}

interface BCEntry {
    readonly path: string;
    readonly name: string;
    readonly subPaths: { name: string, isDirectory: boolean }[]
}

export class DirectoryListings extends React.Component<any, any> {

    private static ROOT_DIR = "/"
    private static LIST_DIRECTORY_RESOURCE = "/list"

    constructor(props: DirectoryListingsProps) {
        super(props);

        this.displayUpdatedListings(DirectoryListings.ROOT_DIR)

        this.state = {
            listings: [{path: DirectoryListings.ROOT_DIR, name: DirectoryListings.ROOT_DIR, subPaths: []}]
        }

        this.displayUpdatedListings = this.displayUpdatedListings.bind(this)
    }


    render() {
        return (
            <div>
                <ol className={"breadcrumb nav-pills"}>
                    {
                        this.state.listings.map((entry: BCEntry) => {
                            return (
                                <li className={"breadcrumb-item nav-item dropdown"} key={entry.path}>
                                    <a className={"dropdown-toggle"}
                                       data-toggle={"dropdown"}
                                       role="button"
                                       href={"#"}>{entry.name}</a>
                                    <div className={"dropdown-menu"}>
                                        {
                                            entry.subPaths.map(subPath => {
                                                return (
                                                    <a className="dropdown-item" href={"#"}
                                                       onClick={e => {
                                                           if (subPath.isDirectory) {
                                                               //Update the BC path, if a directory.
                                                               this.displayUpdatedListings(`${entry.path}/${subPath.name}`)
                                                           } else {
                                                               //Load the file from server, if not a directory.
                                                               this.props.loadContent(`${entry.path}/${subPath.name}`)
                                                           }
                                                       }}
                                                    >{subPath.name}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }


    private displayUpdatedListings(dirPath: string) {
        console.log(dirPath)

        fetch(`${DirectoryListings.LIST_DIRECTORY_RESOURCE}?directoryPath=${dirPath}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedListings = data.listings
                this.setState({
                    listings: updatedListings
                })
            });
    }
}
