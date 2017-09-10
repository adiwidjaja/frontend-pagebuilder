import React from 'react';

export default class EditorSection extends React.Component {
    constructor(props) {
        super(props);
        this.editForm = this.editForm.bind(this);
    }
    editForm() {
        this.props.modal.showForm(this.props.elementdef.formdef, this.props.data);
    }
    render() {
        const buttonrow = <ul className="fpb-tools">
            <li className="fpb-tools_handle"></li>
            <li className="fpb-tools_edit" onClick={this.editForm}></li>
            <li className="fpb-tools_trash"></li>
            <li className="fpb-tools_show"></li>
        </ul>;
        const overlay = <div className="fpb-overlay"><span></span><span></span><span></span><span></span></div>;
        return (
            <div data-fpb-section>
                {buttonrow}
                {overlay}
                {this.props.children}
            </div>
        );
    }
}
