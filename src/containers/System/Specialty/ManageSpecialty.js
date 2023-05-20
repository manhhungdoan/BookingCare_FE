import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty, getAllSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import { Button, Popconfirm, Space, Table } from 'antd';
import { Collapse } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            listSpecialty: []
        };
    }

    componentDidMount() {
        this.handleGetListSpecialty()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    handleGetListSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res?.errCode == 0) {
            this.setState({
                listSpecialty: res?.data
            })
        }
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
        this.handleGetListSpecialty()
    };

    render() {
        let data = this.state.listSpecialty
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
                title: 'Tên chuyên khoa',
                dataIndex: 'name',
                key: 'name',
            },
            // {
            //     title: 'Mô tả',
            //     dataIndex: 'descriptionHTML',
            //     key: 'descriptionHTML',
            //     render: (_, item) => {
            //         return (
            //             <div
            //                 dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
            //             ></div>
            //         )
            //     }
            // },
            {
                title: 'Hành động',
                dataIndex: 'action',
                key: 'action',
                with: 50,
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
                <div className="ms-title text-primary">Quản lý chuyên khoa</div>

                <Collapse defaultActiveKey={1}>
                    <Collapse.Panel header='Thêm chuyên khoa' key={1}>
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
                            <div className="col-12 mt-3">
                                <Button
                                    type='primary'
                                    onClick={() => this.handleSaveNewSpecialty()}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </Collapse.Panel>
                </Collapse>
                <Table
                    dataSource={data.reverse()}
                    columns={columns}
                    className='mt-3'
                ></Table>
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
