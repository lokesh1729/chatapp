import React, { Fragment } from "react";
import { instanceOf } from 'prop-types';
import { connect } from "react-redux";
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

export default function authRequired(WrappedComponent) {
    const innerClass = class extends React.Component {
        static propTypes = {
            cookies: instanceOf(Cookies).isRequired
        };
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
    )(withCookies(innerClass));
}
