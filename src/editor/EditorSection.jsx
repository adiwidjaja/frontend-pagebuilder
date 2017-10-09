import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hogan from 'hogan.js';
import htmltoreact from 'html-to-react';
import TinyMCE from 'react-tinymce';
import EditorList from './EditorList.jsx';

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
                replaceChildren: false,
                shouldProcessNode: (node) => {
                    // return true;
                    return node.attribs && node.attribs['data-sfb-childgroup'];
                },
                processNode: (node, children, index) => {
                    // console.log(children);
                    var name = node.attribs['data-sfb-value'];
                    var group = node.attribs['data-sfb-childgroup'];
                    var extraclasses = node.attribs['class'];
                    return <EditorList group={group} sectionlist={this.props.section.getChildList(name)} defs={this.props.defs} modal={this.props.modal} extraclasses={extraclasses}/>;
                }
            },
            {
                replaceChildren: true,
                shouldProcessNode: (node) => {
                    // return true;
                    return node.attribs && node.attribs['data-sfb-valuetype'] === 'string';
                },
                processNode: (node, children, index) => {
                    // console.log(children);
                    const reactobj = processNodeDefinitions.processDefaultNode(node, children, index);
                    let content = "";
                    //Render children to html
                    let reactobjchildren = reactobj.props.children;
                    // console.log(reactobjchildren);

                    //After editing, children are a string?
                    if(typeof(reactobjchildren) == "string") {
                        content += reactobjchildren;
                    } else {
                        // console.log(reactobjchildren);
                        if(typeof(reactobjchildren) == "array") {
                            reactobjchildren.forEach(obj => {
                                if(typeof(obj) == "string")
                                    content += obj;
                                else
                                    content += ReactDOMServer.renderToStaticMarkup(obj);
                            });
                        } else {
                            //Node
                            if(typeof(reactobjchildren) == "object" && reactobjchildren[0]) {
                                for(var name in reactobjchildren) {
                                    var obj = reactobjchildren[name];
                                    if(typeof(obj) == "string")
                                        content += obj;
                                    else
                                        content += ReactDOMServer.renderToStaticMarkup(obj);
                                }
                            } else {
                                content += ReactDOMServer.renderToStaticMarkup(reactobjchildren);
                            }
                        }
                    }

                    var name = node.attribs['data-sfb-value'];
                    let editor = null;
                    return React.createElement(TinyMCE, {
                        content: content,
                        config: {
                            inline: true,
                            plugins: 'code',
                            toolbar: 'undo redo | bold italic subscript superscript | code',
                            menubar: false,
                            forced_root_block : "",
                            paste_as_text: true,
                            force_br_newlines : true,
                            force_p_newlines : false,
                            setup: function(ref) {
                                editor = ref;
                            }
                        },
                        onChange: e => { this.handleEditorChange(editor, name); },
                        onFocus: e => { this.handleEditorFocus(editor, name); },
                        onBlur: e => { this.handleEditorBlur(editor, name); },
                        onKeyup: e => { this.handleEditorChange(editor, name); }
                    }, null);
                }
            },
            {
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
                    let editor = null;
                    const reditor = React.createElement(TinyMCE, {
                        content: content,
                        config: {
                            inline: true,
                            menubar: false,
                            paste_as_text: true,
                            plugins: "paste lists link code",
                            language: 'de',
                            toolbar: "undo redo | styleselect | bold italic subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | code",
                            setup: function(ref) {
                                editor = ref;
                            }
                        },
                        onChange: e => { this.handleEditorChange(editor, name); },
                        onFocus: e => { this.handleEditorFocus(editor, name); },
                        onBlur: e => { this.handleEditorBlur(editor, name); },
                        onKeyup: e => { this.handleEditorChange(editor, name); }
                    }, null);
                    return reditor;
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
        this.handleEditorFocus = this.handleEditorFocus.bind(this);
        this.handleEditorBlur = this.handleEditorBlur.bind(this);
        this.editForm = this.editForm.bind(this);
        this.buildTemplate = this.buildTemplate.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.trash = this.trash.bind(this);
        this.doTrash = this.doTrash.bind(this);

        this.buildTemplate();
    }
    handleEditorChange(editor, name) {
        // console.log("handleEditorChange: "+name);
        // this.props.section.setContent(name, editor.getContent());
        //Don't set content, just notify
        // this.props.section.onChange(editor.getContent(), false);
    }
    handleEditorBlur(editor, name) {
        console.log("handleEditorBlur: "+name);
        this.props.section.setContent(name, editor.getContent());
    }
    handleEditorFocus(editor, name) {
        console.log("handleEditorFocus: "+name);
        this.props.section.onChange(editor.getContent(), false);
    }
    editForm() {
        this.props.modal.showForm(this.props.elementdef.formdef, this.props.section.getContent(), "Element bearbeiten", this.saveForm);
    }
    saveForm(data) {
        this.props.section.mergeContent(data);
    }
    trash() {
        const name = this.props.elementdef.name;
        this.props.modal.showConfirm("Element "+name+" wirklich löschen?", "Element löschen", this.doTrash)
    }
    doTrash() {
        this.props.section.delete();
    }
    buildTemplate() {
        this.buttonrow = <ul className="fpb-tools">
            <li className="fpb-tools_handle" title={this.props.elementdef.name}></li>
            {this.props.elementdef.formdef?<li className="fpb-tools_edit" onClick={this.editForm}></li>:''}
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
