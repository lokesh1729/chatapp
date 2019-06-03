import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/login.actions";
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
    submitLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Section>
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
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Button isColor="primary" type="submit">
                                    Submit
                                </Button>
                            </Control>
                        </Field>
                    </form>
                </Container>
            </Section>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(
    null,
    { login },
)(Login);
