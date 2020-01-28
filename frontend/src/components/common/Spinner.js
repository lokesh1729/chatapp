import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import spinner from "./spinner.gif";

class Spinner extends Component {
    render() {
        return (
            <Fragment>
                {this.props.isLoading && (
                    <div className="spinner">
                        <img src={spinner} alt="loading" />
                    </div>
                )}
            </Fragment>
        );
    }
}

Spinner.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading,
});

export default connect(mapStateToProps)(Spinner);
