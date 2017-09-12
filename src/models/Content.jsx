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
}
