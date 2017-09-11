import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hogan from 'hogan.js';
import htmltoreact from 'html-to-react';
import TinyMCE from 'react-tinymce';

var isValidNode = function () {
    return true;
};

var processNodeDefinitions = new htmltoreact.ProcessNodeDefinitions(React);
var processingInstructions = [
    {
        // This is REQUIRED, it tells the parser
        // that we want to insert our React
        // component as a child
        replaceChildren: true,
        shouldProcessNode: function (node) {
            // return true;
            return node.attribs && node.attribs['data-sfb-valuetype'] === 'string';
        },
        processNode: function (node, children, index) {
            // console.log(children);
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
                }}, null);
        }
    },
    {
        // This is REQUIRED, it tells the parser
        // that we want to insert our React
        // component as a child
        replaceChildren: true,
        shouldProcessNode: function (node) {
            // return true;
            return node.attribs && node.attribs['data-sfb-valuetype'] === 'rich';
        },
        processNode: function (node, children, index) {
            //Process to react obj
            const reactobj = processNodeDefinitions.processDefaultNode(node, children, index);
            let content = "";
            //Render children to html
            reactobj.props.children.forEach(obj => {
                if(typeof(obj) == "string")
                    content += obj;
                else
                    content += ReactDOMServer.renderToStaticMarkup(obj);
            });
            return React.createElement(TinyMCE, {
                content: content,
                config: {
                    inline: true,
                    menubar: false
                }}, null);
        }
    },
    {
        // Anything else
        shouldProcessNode: function (node) {
            return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
    },
];

export default class EditorSection extends React.Component {
    constructor(props) {
        super(props);
        this.editForm = this.editForm.bind(this);
    }
    editForm() {
        this.props.modal.showForm(this.props.elementdef.formdef, this.props.data);
    }
    render() {
        const buttonrow = <ul className="fpb-tools">
            <li className="fpb-tools_handle"></li>
            <li className="fpb-tools_edit" onClick={this.editForm}></li>
            <li className="fpb-tools_trash"></li>
            <li className="fpb-tools_show"></li>
        </ul>;
        const overlay = <div className="fpb-overlay"><span></span><span></span><span></span><span></span></div>;

        //Mustache template
        const templatesrc = this.props.elementdef.template;

        //Compile template
        const template = hogan.compile(templatesrc);

        //Render data
        const html = template.render(this.props.data);

        //Parse into react component
        const parser = new htmltoreact.Parser();
        const contentcomponent = parser.parseWithInstructions(html, isValidNode, processingInstructions);

        return (
            <div data-fpb-section>
                {buttonrow}
                {overlay}
                {contentcomponent}
            </div>
        );
    }
}
