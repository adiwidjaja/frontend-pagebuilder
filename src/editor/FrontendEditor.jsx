import React from "react";
import Hogan from 'react-hogan';
import EditorSection from './EditorSection.jsx';
import Sortable from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';
import Modal from './Modal.jsx';

export default class FrontendEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const elementdefinitions = this.props.editorconf.elements;
        const content = this.props.content;
        const output = [];
        content.sections.forEach((section) => {
            const elementdef = elementdefinitions[section.type];
            const template = elementdef.template;
            output.push(<EditorSection key={uniqueId()} data={section.content} elementdef={elementdef} modal={this.props.modal}>
                <Hogan template={template} data={section.content}/>
            </EditorSection>);
        });
        return <div>
        <Sortable
            options={{
                handle: '.fpb-tools_handle'
            }}
            >{output}
        </Sortable></div>;
    }
}