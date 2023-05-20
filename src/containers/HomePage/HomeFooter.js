import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Space } from 'antd';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer py-2">
                <Space>
                    &copy; 2023 Đoàn Mạnh Hùng - Đại Học Công Nghiệp Hà Nội
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/manhhungdoan"
                    >
                        Github
                    </a>
                </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
