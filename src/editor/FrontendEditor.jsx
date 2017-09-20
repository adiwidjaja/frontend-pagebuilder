import React from "react";

import Modal from './Modal.jsx';
import EditorList from './EditorList.jsx';
import EditorSection from './EditorSection.jsx';

import Content from '../models/Content.jsx';

export default class FrontendEditor extends React.Component {
    constructor(props) {
        super(props);

        this.elementdefinitions = this.props.editorconf.elements;

        this.state = {
            content: new Content(this, this.props.content)
        };

        this.onChange = this.onChange.bind(this);
    }
    getContent() {
        return this.state.content.serializeContent();
    }
    onChange(content) {
        // console.log("FrontendEditor.onChange");
        this.setState({
            content: content
        });
    }
    render() {
        return <div>
            <EditorList sectionlist={this.state.content.getList()} defs={this.elementdefinitions} modal={this.props.modal}/>
        </div>;
    }
}
