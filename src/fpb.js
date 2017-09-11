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


        // tinymce.init({
        //     selector: '[data-fpb-valuetype="string"]',
        //     inline: true,
        //     toolbar: 'undo redo',
        //     menubar: false
        // });

        // tinymce.init({
        //     selector: '[data-fpb-valuetype="rich"]',
        //     inline: true,
        //     // toolbar: 'undo redo',
        //     menubar: false
        // });

        // function serializeContent() {
        //     var areas = document.querySelectorAll("[data-fpb-content]");
        //     forEach(areas, function(i, area){
        //         var data = [];
        //         var sections = area.querySelectorAll("[data-fpb-section]");
        //         forEach(sections, function(i, section){
        //             var sectiondata = {};
        //             var fields = section.querySelectorAll("[data-fpb-value]");
        //             forEach(fields, function(i, field) {
        //                 var name = field.getAttribute("data-fpb-value");
        //                 var type = field.getAttribute("data-fpb-valuetype");
        //                 var value = field.innerHTML;
        //                 sectiondata[name] = value;
        //             });
        //             data.push(sectiondata);
        //         });
        //         console.log(JSON.stringify(data));
        //     });
        // }

        // var buttonrow = '<ul class="fpb-tools"><li class="fpb-tools_handle"></li><li class="fpb-tools_edit"></li><li class="fpb-tools_trash"></li><li class="fpb-tools_show"></li></ul><div class="fpb-overlay"><span></span><span></span><span></span><span></span></div>'

        // ready(function() {

        //     var areas = document.querySelectorAll("[data-fpb-content]");
        //     forEach(areas, function(i, area){
        //         Sortable.create(area, {
        //             animation: 150,
        //             // draggable: "[data-fpb-section]",
        //             handle: ".fpb-tools_handle"
        //         });
        //         var sections = area.querySelectorAll("[data-fpb-section]");
        //         forEach(sections, function(i, section){
        //             section.insertAdjacentHTML('afterbegin', buttonrow);
        //             // section.classList.add("fpb-draggable");
        //         });
        //     });

        //     document.getElementById("fpb-save").addEventListener("click", function(e) {
        //         serializeContent();
        //     });
        // });
