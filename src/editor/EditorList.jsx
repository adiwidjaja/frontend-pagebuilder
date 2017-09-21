import React from 'react';
import EditorSection from './EditorSection.jsx';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

export default class EditorList extends React.Component {
    constructor(props) {
        super(props);
        this.elementdefinitions = this.props.defs;

        this.onSort = this.onSort.bind(this);
    }

    /*
     * Callback for sortable
     */
    onSort(order, sortable, evt) {
        // console.log(order);
        // console.log(sortable);
        // console.log(evt);
        if(evt.type == "add") {
            //TODO Do something
            const elementtype = evt.item.getAttribute("data-type");
            const index = evt.newIndex;
            const elementdef = this.elementdefinitions[elementtype];
            this.props.sectionlist.insertAt(index, {
                type: elementtype,
                content: {} //Todo: Defaults
            });
        } else {
            this.props.sectionlist.setOrder(order);
        }
    }

    render() {
        // console.log("Rerender EditorList");
        const output = [];
        let i = 0;
        const sections = this.props.sectionlist.getChildren();
        sections.forEach((section) => {

            const elementdef = this.elementdefinitions[section.getType()];
            const template = elementdef.template;

            // console.log(section);

            output.push(<EditorSection key={uniqueId()} id={i} section={section} elementdef={elementdef} defs={this.elementdefinitions} modal={this.props.modal}>
            </EditorSection>); // component={Editable}
            i++;
        });

        const group = this.props.group?this.props.group:'default';

        let classnames = this.props.extraclasses?this.props.extraclasses+" fpb-list":"fpb-list";

        return <Sortable
            options={{
                handle: '.fpb-tools_handle',
                group: group
            }}
            className={classnames}
            onChange={this.onSort}
            >{output}
        </Sortable>;
    }
}
