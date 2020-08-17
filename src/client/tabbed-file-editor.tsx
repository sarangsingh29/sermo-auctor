import React from 'react'
import {FileEditor} from "./file-editor";
import tabIcon from './icons/tab.svg';
import closeIcon from './icons/close.svg';

export class TabbedFileEditor extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.state = {
            tabs: {}
        }

        this.createNewTab = this.createNewTab.bind(this)
    }

    render() {

        let tabsArr = []
        let tabs = this.state.tabs

        for (let key in tabs) {
            tabsArr.push(tabs[key])
        }

        return (
            <div className={"container mt-5"}>

                <ul className={"nav nav-tabs"}>

                    {
                        tabsArr.map(tab => {
                            return (
                                <li className={"nav-item row"}>
                                        <a className="nav-link col-7"
                                           data-toggle="tab"
                                           href={`#${tab.key}`}>
                                            {tab.name}
                                        </a>
                                        <a className={"col-1"}
                                           onClick={() => this.onTabClick(tab.key)}>
                                            <img width={20} height={30} src={closeIcon}/>
                                        </a>
                                </li>

                            )
                        })
                    }
                    <li className={"nav-item"}>
                        <a className="nav-link" data-toggle="tab" href={"add"} onClick={this.createNewTab}>
                            <img width={50} height={30} src={tabIcon}/>
                        </a>
                    </li>
                </ul>

                <div id="tab-content" className="tab-content">
                    {
                        tabsArr.map(tab => {
                            return (
                                <div className="tab-pane fade" id={tab.key}>
                                    <FileEditor onFileSelection={
                                        fileName => this.onFileSelection(tab.key, fileName)
                                    }/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

    }

    private onTabClick(tabKey) {
        const tabs = this.state.tabs
        delete tabs[tabKey]
        this.setState({
            tabs: tabs
        })
    }

    private onFileSelection(tabKey: string, fileName: string) {
        const tabs = this.state.tabs
        const affectedTab = tabs[tabKey]
        affectedTab.name = fileName
        this.setState({
            tabs: tabs
        })
    }

    private createNewTab() {
        const tabs = this.state.tabs
        let totalTabCount = Object.keys(tabs).length
        const newTabKey = `tab_${totalTabCount++}`
        let newTab = {
            key: newTabKey,
            name: "untitled"
        }

        this.setState({
            tabs: {...tabs, [newTabKey]: newTab}
        })
    }
}