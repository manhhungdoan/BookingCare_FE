import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import { Button, Collapse, FloatButton, Space } from 'antd';
import { postSearch } from '../../services/userService';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            listClinics: [],
            listSpecialty: [],
            isShowResult: false,
        };
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleSearch = async (e) => {
        if (e.key == 'Enter') {
            this.setState(
                {
                    isShowResult: true
                }
            )
            let res = await postSearch(e.target.value)
            this.setState({
                listDoctors: res.doctors,
                listClinics: res.clinics,
                listSpecialty: res.specializations,
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };
    render() {
        let language = this.props.language;
        return (
            <div>
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
                                {/* <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                </div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                </div> */}
                                <Button
                                    type='primary'
                                    className='btn-secondary-outline'
                                    onClick={() => this.props.history.push('/login')}
                                >Đăng nhập</Button>
                            </Space>


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
                                <i className="fas fa-search" onClick={() => this.setState({ isShowResult: false })}></i>
                                <input type="text" placeholder="Tìm bệnh viện, chuyên khoa, bác sĩ..." onKeyDown={this.handleSearch} />
                                <div className='result'>
                                    {
                                        this.state.isShowResult &&
                                        <Collapse defaultActiveKey={[1, 2, 3]}>
                                            <Collapse.Panel header='Bác sĩ' key={1}>
                                                {this.state.listDoctors.length > 0 ?
                                                    this.state.listDoctors.map((item, index) => {
                                                        return (
                                                            <Button
                                                                key={index}
                                                                onClick={() => this.handleViewDetailDoctor(item)}
                                                            >
                                                                {`${item.firstName} ${item.lastName}`
                                                                }</Button>
                                                        )
                                                    })
                                                    :
                                                    "Không có thông tin bác sĩ"
                                                }
                                            </Collapse.Panel>
                                            <Collapse.Panel header='Chuyên khoa' key={2}>
                                                {this.state.listSpecialty.length > 0 ?
                                                    this.state.listSpecialty.map((item, index) => {
                                                        return (
                                                            <Button key={index}>{item.name}</Button>
                                                        )
                                                    })
                                                    :
                                                    "Không có thông tin chuyên khoa"
                                                }
                                            </Collapse.Panel>
                                            <Collapse.Panel header='Cơ sở y tế' key={3}>
                                                {this.state.listClinics.length > 0 ?
                                                    this.state.listClinics.map((item, index) => {
                                                        return (
                                                            <Button key={index}>{item.name}</Button>
                                                        )
                                                    })
                                                    :
                                                    "Không có thông tin cơ sở y tế"
                                                }
                                            </Collapse.Panel>
                                        </Collapse>
                                    }
                                </div>
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
                {/* <FloatButton.BackTop /> */}
            </div>
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
