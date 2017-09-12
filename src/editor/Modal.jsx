import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
        this.onOk = this.onOk.bind(this);
    }
    componentWillMount(){
        window.document.addEventListener("keydown", this.handleKey, false);
    }
    handleKey(event) {
        if(event.keyCode == 27){
            this.props.hideModal();
        }
    }
    handleBackgroundClick(e) {
        // if (e.target === e.currentTarget) this.props.hideModal();
    }
    onOk() {
        this.props.onOk();
        this.props.hideModal();
    }
    render() {
        const okButton = this.props.showOk ? (
          <button
            onClick={this.onOk}
            disabled={this.props.okDisabled}
          >
            {this.props.okText}
          </button>
        ) : null;

        return (
            <div className="fcb-modal-component">
                <div className="fcb-modal-overlay"></div>
                <div className="fcb-modal" onClick={this.handleBackgroundClick}>
                  <div className="fcb-modal_header">
                    <h1>{this.props.title}</h1>
                    <button onClick={this.props.hideModal}>Close</button>
                  </div>

                  {this.props.children}

                  {okButton}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

Modal.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};
