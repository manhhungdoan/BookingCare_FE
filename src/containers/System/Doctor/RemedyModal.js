import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import './RemedyModal.scss';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        };
    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size="lg" centered>
                <ModalHeader toggle={closeRemedyModal}>Gửi hóa đơn khám bệnh thành công</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Email bệnh nhân</label>
                            <input
                                type="email "
                                value={this.state.email}
                                className="form-control"
                                onChange={(e) => this.handleOnChangeEmail(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Chọn file đơn thuốc</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>
                    <Button color="secondary" className="px-3" onClick={closeRemedyModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
