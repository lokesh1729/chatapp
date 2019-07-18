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
            if(errors.msg.genericError) alert.error(`${errors.msg.genericError}`);
        }
        if (messages !== prevProps.messages) {
            if (messages.msg.loginSuccess) {
                alert.success(messages.msg.loginSuccess);
            }
            if(messages.msg.genericMessage) {
                alert.success(messages.msg.genericMessage);
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
