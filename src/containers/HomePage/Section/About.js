import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền thông nói về BookingCare</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="321px"
                            src="https://www.youtube.com/embed/wQ2TN_gI3sE"
                            title="meeting valorant e-daters"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Phần mềm đặt lịch hi vọng sẽ là một cải tiến nhỏ, khắc phục hệ thống đặt lịch thủ công.
                        </p>
                        <p>
                            Phần mềm sẽ giúp cho người đặt lịch kết nối với bác sĩ, phòng khám một cách nhanh chóng, tiện lợi, người khám bệnh chủ động thời gian xếp lịch, không cần phải trực tiếp đến tận nơi đặt, đồng thời bác sĩ cũng có thể chủ động kiểm soát về mặt thời gian cũng như số lượng bệnh nhân để theo dõi cũng như chăm sóc sức khỏe người bệnh một cách hiệu quả nhất. Phần mềm sẽ là cải tiến về mặt hệ thống và quy trình làm việc đối với những nơi vẫn còn đặt lịch thủ công.
                        </p>
                    </div>
                </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
