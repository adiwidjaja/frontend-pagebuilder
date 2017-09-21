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
    setContent(content) {
        // this.state.content.setContent(content);
        this.setState({
            content: new Content(this, content)
        });
    }
    onChange(content, rerender) {
        // console.log("FrontendEditor.onChange");

        if(rerender) {
            this.setState({
                content: content
            });
        }

        if(this.props.callback) {
            this.props.callback(this.getContent(), rerender);
        }
    }
    render() {
        return <div>
            <EditorList sectionlist={this.state.content.getList()} defs={this.elementdefinitions} modal={this.props.modal}/>
        </div>;
    }
}
