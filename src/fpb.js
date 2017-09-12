require("./scss/fpb-styles.scss");
import Sortable from "sortablejs";

import React from 'react';
import ReactDOM from 'react-dom';
import FrontendEditor from "./editor/FrontendEditor.jsx";
import ModalForm from "./editor/ModalForm.jsx";

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
    constructor() {
        this.init = this.init.bind(this);
    }
    init(selector, content, editorconf) {
        const modalelem = document.body.appendChild(document.createElement("div", {id:'fpb-modal-container'}));
        ReactDOM.render(<ModalForm ref={(modal) => { this.modal = modal; }}/>, modalelem);

        const modal = this.modal;
        // ready(function() {
            var areas = document.querySelectorAll("[data-fpb-content]");
            forEach(areas, function(i, area){
                ReactDOM.render(<FrontendEditor content={content} editorconf={editorconf} modal={modal}/>, area);
            });
        // });
    }
}

export default FrontendPageBuilder;
