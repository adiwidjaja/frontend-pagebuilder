import SectionList from "./SectionList.jsx";
/*
Base content model, including all others.
*/
export default class Content {
    constructor(editor, content) {
        this.sectionlist = new SectionList(this, content.sections);
        this.editor = editor;
        this.onChange = this.onChange.bind(this);
    }

    getList() {
        return this.sectionlist;
    }

    onChange(sectionlist, rerender) {
        // console.log(sectionlist);
        if(rerender) {
            this.sectionlist = sectionlist;
            this.editor.onChange(this); //Or content?
        }
    }

    serializeContent() {
        const data = this.sectionlist.getData();
        return data;
    }
}

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
