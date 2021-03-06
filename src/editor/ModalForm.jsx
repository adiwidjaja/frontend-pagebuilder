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
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            showmodal: false,
            showok: true,
            formdef: null,
            formdata: null,
            callback: data => {},
            title: '',
            content: null
        };
    }
    showModal(content, title, showok=true) {
        this.setState({
            showmodal: true,
            content,
            title: title,
            showok: showok
        });
    }
    showConfirm(content, title, callback) {
        this.setState({
            showmodal: true,
            showok: true,
            content: content,
            title: title,
            callback: callback
        });
    }
    showForm(formdef, formdata, title, callback) {
        this.setState({
            showmodal: true,
            showok: false,
            formdef: formdef,
            formdata: formdata,
            title: title,
            callback: callback
        });
    }
    hideModal(e) {
        this.setState({
            showmodal: false,
            showok: false,
            formdef: null,
            formdata: null,
            title: '',
            callback: data => {},
            content: null
        });
    }
    onOk() {
        if(this.state.formdef) {
            this.button.click();
        } else {
            this.state.callback();
            this.hideModal();
        }
    }
    submitForm(formdata) {
        this.state.callback(formdata.formData);
        this.hideModal();
    }
    getContent() {
        // console.log(this.state.content);
        return {__html: this.state.content};
    }
    render() {
        if(this.state.showmodal)
            return (
                <Modal title={this.state.title} hideModal={this.hideModal} showOk={this.state.showok} onOk={this.onOk}>
                    {this.state.content?<div dangerouslySetInnerHTML={this.getContent()}></div>:null}
                    {this.state.formdef?<Form schema={this.state.formdef} formData={this.state.formdata} onSubmit={this.submitForm} >
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary"  ref={(button) => { this.button = button; }}>Speichern</button>
                        </div>
                    </Form>:null}
                </Modal>
            );
        else return <div></div>;
    }
}
