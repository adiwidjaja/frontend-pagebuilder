import React from 'react';
import EditorSection from './EditorSection.jsx';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

export default class EditorList extends React.Component {
    constructor(props) {
        super(props);
        this.elementdefinitions = this.props.defs;
        // this.state = {
        //     sectionlist: this.props.content
        // };

        this.onSort = this.onSort.bind(this);
    }

    /*
     * Callback for sortable
     */
    onSort(order, sortable, evt) {
        // console.log(order);
        this.props.sectionlist.setOrder(order);
    }

    render() {
        // console.log("Rerender EditorList");
        const output = [];
        let i = 0;
        this.props.sectionlist.getChildren().forEach((section) => {

            const elementdef = this.elementdefinitions[section.getType()];
            const template = elementdef.template;

            // console.log(section);

            output.push(<EditorSection key={uniqueId()} id={i} section={section} elementdef={elementdef} modal={this.props.modal}>
            </EditorSection>); // component={Editable}
            i++;
        });

        return <Sortable
            options={{
                handle: '.fpb-tools_handle'
            }}
            onChange={this.onSort}
            >{output}
        </Sortable>;
    }
}
