import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hogan from 'hogan.js';
import htmltoreact from 'html-to-react';
import TinyMCE from 'react-tinymce';

const isValidNode = function () {
    return true;
};

const processNodeDefinitions = new htmltoreact.ProcessNodeDefinitions(React);

export default class EditorSection extends React.Component {
    constructor(props) {
        super(props);
        // this.section = this.props.section;
        this.processingInstructions = [
            {
                // This is REQUIRED, it tells the parser
                // that we want to insert our React
                // component as a child
                replaceChildren: true,
                shouldProcessNode: (node) => {
                    // return true;
                    return node.attribs && node.attribs['data-sfb-valuetype'] === 'string';
                },
                processNode: (node, children, index) => {
                    // console.log(children);
                    var name = node.attribs['data-sfb-value'];
                    return React.createElement(TinyMCE, {
                        content: children.join(),
                        config: {
                            inline: true,
                            plugins: 'code',
                            toolbar: 'undo redo code',
                            menubar: false,
                            forced_root_block : "",
                            force_br_newlines : true,
                            force_p_newlines : false,
                        },
                        onChange: e => { this.handleEditorChange(e, name) }
                    }, null);
                }
            },
            {
                // This is REQUIRED, it tells the parser
                // that we want to insert our React
                // component as a child
                replaceChildren: true,
                shouldProcessNode: (node) => {
                    // return true;
                    return node.attribs && node.attribs['data-sfb-valuetype'] === 'rich';
                },
                processNode: (node, children, index) => {
                    //Process to react obj
                    const reactobj = processNodeDefinitions.processDefaultNode(node, children, index);
                    let content = "";
                    //Render children to html
                    let reactobjchildren = reactobj.props.children;
                    // console.log(reactobjchildren);

                    //After editing, children are a string?
                    if(typeof(reactobjchildren) == "string") {
                        content += reactobjchildren;
                    } else {
                        reactobjchildren.forEach(obj => {
                            if(typeof(obj) == "string")
                                content += obj;
                            else
                                content += ReactDOMServer.renderToStaticMarkup(obj);
                        });
                    }
                    var name = node.attribs['data-sfb-value'];
                    return React.createElement(TinyMCE, {
                        content: content,
                        config: {
                            inline: true,
                            menubar: false
                        },
                        onChange: e => { this.handleEditorChange(e, name) }
                    }, null);
                }
            },
            {
                // Anything else
                shouldProcessNode: (node) => {
                    return true;
                },
                processNode: processNodeDefinitions.processDefaultNode,
            },
        ];

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.editForm = this.editForm.bind(this);
        this.buildTemplate = this.buildTemplate.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.trash = this.trash.bind(this);
        this.doTrash = this.doTrash.bind(this);

        this.buildTemplate();
    }
    handleEditorChange(e, name) {
        // console.log("handleEditorChange: "+name);
        this.props.section.setContent(name, e.target.getContent());
    }
    editForm() {
        this.props.modal.showForm(this.props.elementdef.formdef, this.props.section.getContent(), "Element bearbeiten", this.saveForm);
    }
    saveForm(data) {
        this.props.section.mergeContent(data);
    }
    trash() {
        this.props.modal.showConfirm("Element wirklich löschen?", "Element löschen", this.doTrash)
    }
    doTrash() {
        this.props.section.delete();
    }
    buildTemplate() {
        this.buttonrow = <ul className="fpb-tools">
            <li className="fpb-tools_handle"></li>
            <li className="fpb-tools_edit" onClick={this.editForm}></li>
            <li className="fpb-tools_trash" onClick={this.trash}></li>
        </ul>; //<li className="fpb-tools_show"></li>

        this.overlay = <div className="fpb-overlay"><span></span><span></span><span></span><span></span></div>;

        //Mustache template
        const templatesrc = this.props.elementdef.template;

        //Compile template
        this.template = hogan.compile(templatesrc);
    }
    render() {
        //Render data
        const html = this.template.render(this.props.section.getContent());

        //Parse into react component
        const parser = new htmltoreact.Parser();
        const contentcomponent = parser.parseWithInstructions(html, isValidNode, this.processingInstructions);

        return (
            <div className="fpb-section" data-id={this.props.id} data-fpb-section>
                {this.buttonrow}
                {this.overlay}
                {contentcomponent}
            </div>
        );
    }
}
