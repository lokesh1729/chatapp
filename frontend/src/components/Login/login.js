import queryString from 'query-string'
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/login.actions";
import { Redirect } from "react-router-dom";
import {
    Container,
    Section,
    Field,
    Label,
    Control,
    Input,
    Button,
} from "bloomer";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    // componentDidMount() {
    //     console.log(`Login component CDM : ${JSON.stringify(this.props)}`);
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(`Login Component prevProps : ${JSON.stringify(prevProps)}`);
    //     console.log(`Login Component prevState : ${JSON.stringify(prevState)}`);
    //     console.log(`Login Component props : ${JSON.stringify(this.props)}`);
    //     console.log(`Login Component state : ${JSON.stringify(this.state)}`);
    // }

    // componentWillUnmount() {
    //     console.log(`Login component CWU : ${JSON.stringify(this.props)}`);
    // }

    submitLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const isAuthenticated = this.props.state.isAuthenticated && this.props.state.currentUser;
        const queryParams = queryString.parse(this.props.location.search);
        const next = queryParams.next;
        return (
            <Fragment>
                {isAuthenticated ? (
                    <Redirect to={next} />
                ) : (
                    <Section
                        className={
                            this.props.state.isLoading ? "opacity-25" : ""
                        }
                    >
                        <Container>
                            <form onSubmit={this.submitLogin}>
                                <Field>
                                    <Label>Username</Label>
                                    <Control>
                                        <Input
                                            type="text"
                                            onChange={this.onChange}
                                            name="username"
                                            placeholder="Enter username"
                                            required={true}
                                        />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Control>
                                        <Input
                                            type="password"
                                            onChange={this.onChange}
                                            name="password"
                                            placeholder="Enter password"
                                            required={true}
                                        />
                                    </Control>
                                </Field>
                                <Field>
                                    <Control>
                                        <Button isColor="info" type="submit">
                                            Submit
                                        </Button>
                                    </Control>
                                </Field>
                            </form>
                        </Container>
                    </Section>
                )}
            </Fragment>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    state: state.login,
});
export default connect(
    mapStateToProps,
    { login },
)(Login);
