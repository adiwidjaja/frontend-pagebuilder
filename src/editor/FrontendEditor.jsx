import React from "react";
import EditorSection from './EditorSection.jsx';
import Sortable from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';
import Modal from './Modal.jsx';

var tinymce = window.tinymce; //BAD

export default class FrontendEditor extends React.Component {
    constructor(props) {
        super(props);
        this.sort = this.sort.bind(this);

        this.elementdefinitions = this.props.editorconf.elements;
        this.content = this.props.content;
    }
    /*
     * Callback for sortable
     */
    sort(order, sortable, evt) {
        console.log(order);
    }
    componentDidMount() {
        tinymce.init({
            selector: '[data-fpb-valuetype="string"]',
            inline: true,
            toolbar: 'undo redo',
            menubar: false
        });
    }
    render() {
        const output = [];
        this.content.sections.forEach((section) => {
            const elementdef = this.elementdefinitions[section.type];
            const template = elementdef.template;
            output.push(<EditorSection key={uniqueId()} data={section.content} elementdef={elementdef} modal={this.props.modal}>
            </EditorSection>); // component={Editable}
        });
        return <div>
        <Sortable
            options={{
                handle: '.fpb-tools_handle'
            }}
            onChange={this.sort}
            >{output}
        </Sortable></div>;
    }
}