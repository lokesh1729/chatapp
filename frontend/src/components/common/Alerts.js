import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alerts extends Component {
    componentDidUpdate(prevProps, _prevState) {
        const { errors, alert, messages } = this.props;
        if (errors !== prevProps.errors) {
            if (errors.msg.name) alert.error(`Name: ${errors.msg.name.join()}`);
            if (errors.msg.email)
                alert.error(
                    `${errors.status} : Email: ${errors.msg.email.join()}`,
                );
            if (errors.msg.non_field_errors)
                alert.error(
                    `${errors.status} : ${errors.msg.non_field_errors.join()}`,
                );
            if (errors.msg.username) alert.error(errors.msg.username.join());
            if(errors.msg.emptyMessage) alert.error(errors.msg.emptyMessage);
            if(errors.msg.error) alert.error(errors.msg.error);
        }
        if (messages !== prevProps.messages) {
            if (messages.loginSuccess) {
                alert.success(messages.loginSuccess);
            }
            if(messages.success) {
                alert.success(messages.success);
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    messages: state.messages,
});

Alerts.propTypes = {
    errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withAlert()(Alerts));
