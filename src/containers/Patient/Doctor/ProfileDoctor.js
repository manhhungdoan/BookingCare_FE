import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getInfoDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                    : moment
                        .unix(+dataTime.date / 1000)
                        .locale('en')
                        .format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.price-booking" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, iShowLinkDetail, isShowPrice, doctorId } = this.props;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                    // style={{ backgroundImage: `url($)` }}
                    >
                        <div className='image'>
                            <img src={dataProfile.image ? dataProfile.image : ''} alt=''></img>
                        </div>
                        {iShowLinkDetail === true && (
                            <div className="view-detail-doctor mt-2">
                                <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                            </div>
                        )}
                    </div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <div>{dataProfile.Markdown.description}</div>
                                    )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>


                {isShowPrice === true && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        )}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'USD'}
                            />
                        )}
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
