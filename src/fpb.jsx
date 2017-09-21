require("./scss/fpb-styles.scss");
import Sortable from "sortablejs";

import React from 'react';
import ReactDOM from 'react-dom';
import FrontendEditor from "./editor/FrontendEditor.jsx";
import ModalForm from "./editor/ModalForm.jsx";
import AddList from "./editor/AddList.jsx";

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

class FrontendPageBuilder {
    constructor(callback=null) {
        this.init = this.init.bind(this);
        this.getContent = this.getContent.bind(this);
        this.setContent = this.setContent.bind(this);
        this.callback = callback;
    }
    init(selector, content, editorconf) {
        const modalelem = document.body.appendChild(document.createElement("div", {id:'fpb-modal-container'}));
        ReactDOM.render(<ModalForm ref={(modal) => { this.modal = modal; }}/>, modalelem);

        const addelem = document.body.appendChild(document.createElement("div", {id:'fpb-addlist-container'}));
        ReactDOM.render(<AddList ref={(addlist) => { this.addlist = addlist; }} elements={editorconf.elements} groups={editorconf.groups}/>, addelem);

        const modal = this.modal;

        var areas = document.querySelectorAll("[data-fpb-content]");
        forEach(areas, (i, area) => {
            ReactDOM.render(<FrontendEditor ref={(editor) => { this.editor = editor; }} content={content} editorconf={editorconf} modal={modal} callback={this.callback}/>, area);
        });
    }

    getContent() {
        return this.editor.getContent();
    }

    setContent(content) {
        this.editor.setContent(content);
    }
}

export default FrontendPageBuilder;
