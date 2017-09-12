export default class Section {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;

        this.getData = this.getData.bind(this);
        this.getType = this.getType.bind(this);
        this.getContent = this.getContent.bind(this);
        this.setContent = this.setContent.bind(this);
        this.onChange = this.onChange.bind(this);
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

    setContent(name, content) {
        this.data.content[name] = content;
        this.onChange(this.data.content, false);
    }

    onChange(content, rerender) {
        // console.log("Section.onChange");
        this.parent.onChange(this, rerender);
    }
}
