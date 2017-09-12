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
        if(event.keyCode == 13 && this.props.onOk){
            this.onOk();
        }
    }
    handleBackgroundClick(e) {
        this.props.hideModal();
        // if (e.target === e.currentTarget) this.props.hideModal();
    }
    onOk() {
        this.props.onOk();
        this.props.hideModal();
    }
    render() {
        const okButton = this.props.showOk ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOk}
            disabled={this.props.okDisabled}
          >
            {this.props.okText}
          </button>
        ) : null;

        const buttons = okButton ? <div className="modal-footer">{okButton}</div> : null;

        return (
            <div className="fpb-modal-component fpb">
                <div className="fpb-modal-overlay" onClick={this.handleBackgroundClick}></div>
                <div className="fpb-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.props.hideModal} aria-label="Close">
                                <span>&times;</span>
                            </button>
                            <h5 className="modal-title">{this.props.title}</h5>
                        </div>
                      <div className="modal-body">
                        {this.props.children}
                      </div>
                      {buttons}
                  </div>
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
