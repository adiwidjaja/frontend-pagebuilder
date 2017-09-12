import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

export default class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false
        };
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const elements = [];
        for(let elementtype in this.props.elements) {
            const elementdef = this.props.elements[elementtype];
            if('preview' in elementdef) {
                elements.push(
                    <div className="fpb-addlist-type" data-type={elementtype} key={uniqueId()}>
                        <div className="fpb-addlist-type_content">
                            <img src={elementdef.preview}/>
                        </div>
                    </div>
                );
            } else {
                elements.push(
                    <div className="fpb-addlist-type" data-type={elementtype} key={uniqueId()}>
                        <div className="fpb-addlist-type_content">
                            {elementdef.name}
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className={"fpb-addlist fpb " + (this.state.open?"fpb-addlist--open":"")}>
                <div className="fpb-addlist_handle" onClick={this.toggle}>
                    <span></span>
                </div>
                <Sortable
                    options={{
                        group: {
                            name: "elements",
                            pull: true,
                            put: false
                        },
                        sort: false,
                        onClone: function (evt) {
                            // console.log(evt.item);
                            // console.log(evt.from);
                            // console.log(evt);
                        },
                    }}
                    className="fpb-addlist_typelist"
                    >
                    {elements}
                </Sortable>
            </div>
        );
    }
}
