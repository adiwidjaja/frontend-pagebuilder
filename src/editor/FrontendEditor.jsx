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
    onChange(content) {
        // console.log("FrontendEditor.onChange");
        this.setState({
            content: content
        });
    }
    render() {
        return <EditorList sectionlist={this.state.content.getList()} defs={this.elementdefinitions} modal={this.props.modal}/>;
    }
}


        // function serializeContent() {
        //     var areas = document.querySelectorAll("[data-fpb-content]");
        //     forEach(areas, function(i, area){
        //         var data = [];
        //         var sections = area.querySelectorAll("[data-fpb-section]");
        //         forEach(sections, function(i, section){
        //             var sectiondata = {};
        //             var fields = section.querySelectorAll("[data-fpb-value]");
        //             forEach(fields, function(i, field) {
        //                 var name = field.getAttribute("data-fpb-value");
        //                 var type = field.getAttribute("data-fpb-valuetype");
        //                 var value = field.innerHTML;
        //                 sectiondata[name] = value;
        //             });
        //             data.push(sectiondata);
        //         });
        //         console.log(JSON.stringify(data));
        //     });
        // }
