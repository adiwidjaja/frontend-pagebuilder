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
        const groups = [];
        for(let groupname in this.props.groups) {
            const groupdata = this.props.groups[groupname];
            let elements = [];
            for(let i in groupdata.elements) {
                const elementtype=groupdata.elements[i];
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
            groups.push(
                <div className="fpb-addlist_group" key={groupname}>
                    <div className="fpb-addlist_groupname">
                        {groupdata.name}
                    </div>
                    <Sortable
                        options={{
                            group: {
                                name: groupname,
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
)
        }
        // for(let elementtype in this.props.elements) {
        //     const elementdef = this.props.elements[elementtype];
        // }
        return (
            <div className={"fpb-addlist fpb " + (this.state.open?"fpb-addlist--open":"")}>
                <div className="fpb-addlist_handle" onClick={this.toggle}>
                    <span></span>
                </div>
                {groups}
            </div>
        );
    }
}
