import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Something wrong');
            console.log('check error', res);
        }
    };

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label htmlFor="">Tên chuyên khoa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">Ảnh chuyên khoa</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={(e) => this.handleOnChangeImage(e)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-new-specialty" onClick={() => this.handleSaveNewSpecialty()}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
