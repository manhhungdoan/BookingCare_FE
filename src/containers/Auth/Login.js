import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { Button } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }
    //handle
    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login succeed');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeydown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="text-login col-12">Đăng nhập</div>
                        <div className="login-input col-12 form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập email"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className="login-input col-12 form-group">
                            <label>Mật khẩu:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Nhập mật khẩu"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={(e) => this.handleKeydown(e)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => this.handleLogin()}>
                                Đăng nhập
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Quên mật khẩu?</span>
                        </div>
                        <div className="col-12 back-to-home">
                            <Button
                                type='primary'
                                className="mt-3" onClick={() => this.props.navigate('/home')}
                                ghost
                            >
                                Trở về
                            </Button>
                        </div>
                        {/* <div className="col-12 text-center mt-4">
                            <span className="text-other-login">Or login with:</span>
                        </div>
                        <div className="social-login col-12">
                            <i className="fab fa-google-plus google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div> */}
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
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
