import Section from "./Section.jsx";

export default class SectionList {
    constructor(parent, sections) {
        this.parent = parent;
        this.sections = sections.map( sectiondata => new Section(this, sectiondata) );

        this.getChildren = this.getChildren.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setOrder = this.setOrder.bind(this);
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
        // newsections = this.sections.map(
        //     (section) => section.getData()
        // );
        this.parent.onChange(
            this, rerender
        );
    }
}
