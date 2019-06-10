import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function authRequired(WrappedComponent) {
    const innerClass = class extends React.Component {
        render() {
            const isAuthenticated = this.props.state.isAuthenticated;
            return (
                <Fragment>
                    {!isAuthenticated ? (
                        <Redirect to={"/login"} />
                    ) : (
                        <WrappedComponent {...this.props} />
                    )}
                </Fragment>
            );
        }
    };

    const mapStateToProps = (state) => ({
        state: state.login,
    });
    return connect(
        mapStateToProps,
        null,
    )(innerClass);
}
