import Modal from "./Modal.jsx";

import React from 'react';
import Form from "react-jsonschema-form";

export default class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onOk = this.onOk.bind(this);
        this.state = {
            showmodal: false,
            formdef: null,
            formdata: null,
            content: <p></p>
        };
    }
    showModal(content) {
        this.setState({
            showmodal: true,
            content
        });
    }
    showForm(formdef, formdata) {
        this.setState({
            showmodal: true,
            formdef: formdef,
            formdata: formdata
        });
    }
    hideModal(e) {
        this.setState({
            showmodal: false
        });
    }
    onOk() {
        alert("Ok!");
    }
    render() {
        if(this.state.showmodal)
            return (
                <Modal hideModal={this.hideModal} showOk={false}>
                    {this.state.content}
                    {this.state.formdef?<Form schema={this.state.formdef} formData={this.state.formdata} />:null}
                </Modal>
            );
        else return <div></div>;
    }
}
