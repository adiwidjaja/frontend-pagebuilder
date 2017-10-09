import SectionList from "./SectionList.jsx";

export default class Section {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;

        this.getData = this.getData.bind(this);
        this.getType = this.getType.bind(this);
        this.getContent = this.getContent.bind(this);
        this.setContent = this.setContent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.mergeContent = this.mergeContent.bind(this);
        this.delete = this.delete.bind(this);
    }
    getData() {
        return this.data;
    }

    getType() {
        return this.data.type;
    }

    getContent() {
        return this.data.content;
    }

    getChildList(name) {
        // console.log("subsection");
        // console.log(this.data);
        if(this.data.content[name] !== undefined)
            return new SectionList(name, this, this.data.content[name]);
        else
            return new SectionList(name, []);
    }

    //TODO: Rename!
    setContent(name, content) {
        this.data.content[name] = content;
        this.onChange(this.data.content, true);
    }

    mergeContent(content) {
        this.data.content = Object.assign(this.data.content, content);
        this.onChange(this.data.content, true);
    }

    delete() {
        this.parent.remove(this);
    }

    onChange(content, rerender) {
        // console.log("Section.onChange");
        this.parent.onChange(this, rerender);
    }

    onChildrenChange(name, sectionlist, rerender) {
        if(rerender)
            this.data.content[name] = sectionlist.getData();
        // console.log(this.data);
        this.onChange(this, rerender);
    }
}
