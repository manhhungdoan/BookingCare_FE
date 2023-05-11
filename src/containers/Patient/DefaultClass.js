import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return <div></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
