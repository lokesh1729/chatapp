import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Spinner extends Component {
    render() {
        return (
            <Fragment>
                {this.props.isLoading && (
                    <div className="spinner">
                        <img src="assets/spinner.gif" alt="loading" />
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
