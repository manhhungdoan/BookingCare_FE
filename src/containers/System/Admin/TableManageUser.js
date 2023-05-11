import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Spin, Pagination, Divider, Link, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUserService, getAllUsers } from '../../../services/userService';
import { useEffect } from 'react';
// import Highlighter from 'react-highlight-words';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

const TableManageUser = (props) => {
    const { listUsersProps } = props;
    console.log(listUsersProps)
    const [isFetching, setFetching] = useState(false);
    const [listUsers, setlistUsers] = useState([])

    const fetchListUser = async () => {
        setFetching(true)
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            // dispatch(fetchAllUsersSuccess(res.users.reverse()));
            console.log(res)
            setlistUsers(res.users)
            setFetching(false)
        } else {
            toast.error('Fetch all users error');
        }
    }

    const handleDelete = async (record) => {
        let res = await deleteUserService(record.id);
        if (res && res.errCode === 0) {
            toast.success('Delete user succeed');
            fetchListUser();
        } else {
            toast.error('Delete user error');
        }
    }

    const handleEdit = () => {

    }

    useEffect(() => {
        fetchListUser()
    }, [listUsersProps])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            width: 100,
            render: (id, record, index) => { ++index; return index; },
        },
        {
            title: 'Họ',
            dataIndex: 'firstName',
            key: 'firstName',
            // render: (_, record) => fomartDateToDateTime(record?.timeCreate),
            align: 'left',
            width: 150,
        },
        {
            title: 'Tên',
            dataIndex: 'lastName',
            key: 'lastName',
            // render: (_, record) => fomartDateToDateTime(record?.timeCreate),
            align: 'left',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Quyền',
            dataIndex: 'roleId',
            key: 'roleId'
        },

        // {
        //     title: Hành động,
        //     dataIndex: 'writerName',
        //     key: 'writerName',
        //     width: 120,
        //     align: 'center',
        // },
        {
            title: `Hành động`,
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Space size={0} split={<Divider type='vertical' />} >
                    {/* <Link
                        to={route.POSTS_MANAGEMENT_VIEW
                            .replace(':postsId', record.id)
                            .replace(':languageCode', languageCode)
                        }
                        target='_blank'
                    >
                        <Button
                            icon={<EyeOutlined />}
                            type='link'
                        />
                    </Link> */}

                    <Popconfirm
                        onConfirm={() => handleDelete(record)}
                        placement='topRight'
                        title='Xoá'
                        okText='Xoá'
                        cancelText='Huỷ bỏ'
                    >
                        <Button
                            type='link'
                            icon={<DeleteOutlined />}
                            danger
                            size='middle'
                        />
                    </Popconfirm>

                    <Button
                        icon={<EditOutlined />}
                        type='link'
                        onClick={() => handleEdit(record)}
                    />
                </Space>
            )
        }
    ]
    return (
        <Spin spinning={isFetching}>
            <Table
                columns={columns}
                dataSource={listUsers.reverse()}
                rowKey={record => record.id}
                size='middle'
                className="table-content"
                pagination={false}
                bordered={true}
            />

            {/* <Pagination
                size='small'
                className="pagination-table"
                defaultCurrent={params.page + 1}
                defaultPageSize={params.pageSize}
                total={totalNews}
                showSizeChanger
                onChange={handleChangPage}
            /> */}
        </Spin>
    )
}
// export default TableManageUser;

// class TableManageUser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             usersRedux: [],
//         };
//     }

//     componentDidMount() {
//         this.props.fetchUserRedux();
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevProps.listUsers !== this.props.listUsers) {
//             this.setState({
//                 usersRedux: this.props.listUsers,
//             });
//         }
//     }

//     handleDeleteUser = (user) => {
//         this.props.deleteAUserRedux(user.id);
//     };

//     handleEditUser = (user) => {
//         this.props.handleEditFromParent(user);
//     };

//     render() {
//         let arrUsers = this.state.usersRedux;
//         return (
//             <>
//                 <table id="TableManageUser">
//                     <tbody>
//                         <tr>
//                             <th>Email</th>
//                             <th>firstName</th>
//                             <th>lastName</th>
//                             <th>Address</th>
//                             <th>Actions</th>
//                         </tr>
//                         {arrUsers &&
//                             arrUsers.length > 0 &&
//                             arrUsers.map((item, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <td>{item.email}</td>
//                                         <td>{item.firstName}</td>
//                                         <td>{item.lastName}</td>
//                                         <td>{item.address}</td>
//                                         <td>
//                                             <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
//                                                 <i className="fas fa-pencil-alt"></i>
//                                             </button>
//                                             <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
//                                                 <i className="fas fa-trash-alt"></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                     </tbody>
//                 </table>

//                 <MdEditor
//                     style={{ height: '500px' }}
//                     renderHTML={(text) => mdParser.render(text)}
//                     onChange={handleEditorChange}
//                 />
//             </>
//         );
//     }
// }

const mapStateToProps = (state) => {
    return {
        listUsersProps: state.admin.users,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
//         deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
//     };
// };

export default connect(mapStateToProps)(TableManageUser);
