import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import { CommonUtils } from '../../../utils';
import { createNewClinic, getAllClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import { Button, Collapse, Popconfirm, Space, Spin, Table } from 'antd';
import { DeleteOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            listClinic: [],
            processing: false
        };
    }

    componentDidMount() {
        this.fetchListClinic()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    fetchListClinic = async () => {
        this.setState({
            processing: true
        })
        try {
            let res = await getAllClinic()
            if (res?.errCode == 0) {
                this.setState({
                    listClinic: res?.data
                })
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({
            processing: false
        })
    }
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

    handleSaveNewClinic = async () => {
        this.setState({
            processing: true
        })
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Thêm cơ sở y tế thành công!');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
            this.fetchListClinic();
        } else {
            toast.error('Something wrong');
            console.log('check error', res);
        }
        this.setState({
            processing: false
        })
    };

    render() {
        let data = this.state.listClinic
        console.log('', data)
        const columns = [
            {
                title: 'STT',
                dataIndex: 'STT',
                key: 'STT',
                render: (_, item, index) => index + 1,
                with: 20
            },
            {
                title: 'Tên cơ sở y tế',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Hành động',
                dataIndex: 'action',
                key: 'action',
                render: (_, item) => {
                    return (
                        <>
                            <Space>
                                <Popconfirm
                                    title="Xoá"
                                    description="Bạn có chắc chắn muốn xoá?"
                                    okText="Xoá"
                                    cancelText="Huỷ bỏ"
                                >
                                    <Button
                                        icon={<DeleteTwoTone twoToneColor='red' />}
                                    >
                                    </Button>
                                </Popconfirm>
                                <Button
                                    icon={<EditTwoTone></EditTwoTone>}
                                >

                                </Button>
                            </Space>
                        </>
                    )
                }
            }
        ];
        return (
            <div className="manage-specialty-container container">
                <div className="ms-title text-primary">Quản lý phòng khám</div>
                <Collapse >
                    <Collapse.Panel className='font-weight-bold' header='Thêm phòng khám' key={1}>
                        <div className="add-new-specialty row">
                            <div className="col-6 form-group">
                                <label htmlFor="">Tên phòng khám</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={(e) => this.handleOnChangeInput(e, 'name')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Ảnh phòng khám</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Địa chỉ phòng khám</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
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
                            <div className="col-12 mt-3">
                                <Button
                                    type='primary'
                                    onClick={() => this.handleSaveNewClinic()}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </Collapse.Panel>
                </Collapse>
                <Spin spinning={this.state.processing}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        className='mt-3'
                    ></Table>
                </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
