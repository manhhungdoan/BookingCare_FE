import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import { Button, Space } from 'antd';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    render() {
        let language = this.props.language;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="header-logo" onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <FormattedMessage id="home-header.specialty" />
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <FormattedMessage id="home-header.health-facilities" />
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <FormattedMessage id="home-header.doctor" />
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.specialty" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <FormattedMessage id="home-header.fee" />
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <Space>
                                <div className="support">
                                    <i className="fas fa-question-circle"></i>
                                    <FormattedMessage id="home-header.support" />
                                </div>
                                <Button
                                    type='primary'
                                    className='btn-secondary-outline'
                                    onClick={() => this.props.history.push('/login')}
                                >Đăng nhập</Button>
                            </Space>

                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm bệnh viện" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        {' '}
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className="text-child">
                                        {' '}
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className="text-child">
                                        {' '}
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className="text-child">
                                        {' '}
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className="text-child">
                                        {' '}
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
