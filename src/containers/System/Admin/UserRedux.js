import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { reverse } from 'lodash';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',
            action: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            });
        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        console.log('action', action)
        // if (action === CRUD_ACTIONS.CREATE) {
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar,
        });
        // }

        // if (action === CRUD_ACTIONS.EDIT) {
        //     this.props.editAUserRedux({
        //         id: this.state.userEditId,
        //         email: this.state.email,
        //         password: this.state.password,
        //         firstName: this.state.firstName,
        //         lastName: this.state.lastName,
        //         address: this.state.address,
        //         phoneNumber: this.state.phoneNumber,
        //         gender: this.state.gender,
        //         roleId: this.state.role,
        //         positionId: this.state.position,
        //         avatar: this.state.avatar,
        //     });
        // }
    };

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleEditFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">Quản lý người dùng</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12">{isGetGenders === true ? 'Loading gender' : ''}</div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => this.onChangeInput(e, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => this.onChangeInput(e, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => this.onChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => this.onChangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => this.onChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'gender')}
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'position')}
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'role')}
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.filter(item => item.keyMap !== 'R3').reverse().map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                    <label htmlFor="previewImg" className="label-upload">
                                        Tải ảnh <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-img"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    Lưu
                                    {/* {this.state.action === CRUD_ACTIONS.CREATE ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )} */}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditFromParent={this.handleEditFromParent}
                                    action={this.state.action}
                                    listUsersProps={this.listUsers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
