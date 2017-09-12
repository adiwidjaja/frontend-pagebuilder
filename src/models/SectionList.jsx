import Section from "./Section.jsx";

export default class SectionList {
    constructor(parent, sections) {
        this.parent = parent;
        this.sections = sections.map( sectiondata => new Section(this, sectiondata) );

        this.getChildren = this.getChildren.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.insertAt = this.insertAt.bind(this);
        this.remove = this.remove.bind(this);
    }

    getChildren() {
        return this.sections;
    }

    setOrder(order) {
        // console.log("SectionList setOrder");
        this.sections = order.map( index => this.sections[index] );
        this.onChange(null, true);
    }

    //Subelement changed
    onChange(content, rerender) {
        this.parent.onChange(
            this, rerender
        );
    }

    getData() {
        return this.sections.map(
            (section) => section.getData()
        );
    }

    insertAt(index, sectiondata) {
        const section = new Section(this, sectiondata);
        this.sections.splice(index, 0, section);
        // console.log(this.sections);
        this.onChange(null, true);
    }

    remove(section_to_remove) {
        this.sections = this.sections.filter( section => section != section_to_remove);
        this.onChange(null, true);
    }
}
