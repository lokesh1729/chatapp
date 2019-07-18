import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Control, Field, Input, Label, Section, Button, Help } from "bloomer";
import { connect } from "react-redux";
import { signup } from "../../actions/signup.actions";
import { Redirect } from "react-router";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
      security_question1: "",
      security_question2: "",
      security_answer1: "",
      security_answer2: "",
      formErrors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitSignup = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      return this.setState({ formErrors: { passwordMismatch: "Password and Confirm Password must match" } });
    }
    return this.props.signup(this.state.username, this.state.password, this.state.first_name,
      this.state.last_name, this.state.security_question1, this.state.security_answer1, this.state.security_question2, this.state.security_answer2);
  };


  render() {
    const isSignupSuccess = this.props.state.signupSuccess;
    const isPasswordMismatched = "passwordMismatch" in this.state.formErrors;
    return (
      <Fragment>
        {isSignupSuccess ? (<Redirect to={"/login/"}/>) :
          <Section
            className={
              this.props.state.isLoading ? "opacity-25" : ""
            }>
            <form onSubmit={this.submitSignup}>
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
                <Label>Confirm Password</Label>
                <Control>
                  <Input
                    type="password"
                    onChange={this.onChange}
                    name="password2"
                    placeholder="Re-Enter password"
                    required={true}
                    isColor={isPasswordMismatched ? "danger" : ""}
                  />
                </Control>
                <Help className={isPasswordMismatched ? "block" : "hidden"}
                      isColor={isPasswordMismatched ? "danger" : ""}>Password and Confirm Password
                  must match</Help>
              </Field>
              <Field>
                <Label>First Name</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="first_name"
                    placeholder="Enter First Name"
                    required={true}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Last Name</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="last_name"
                    placeholder="Enter Last Name"
                    required={true}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Security Question 1</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="security_question1"
                    placeholder="Enter Security Question"
                    required={true}
                  />
                </Control>
                <Help isColor={"info"}>Since we are not taking your email, we recommend you
                  to set
                  security questions and remember the answers</Help>
              </Field>
              <Field>
                <Label>Security Answer 1</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="security_answer1"
                    placeholder="Enter Answer"
                    required={true}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Security Question 2</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="security_question2"
                    placeholder="Enter Security Question"
                    required={true}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Security Answer 2</Label>
                <Control>
                  <Input
                    type="text"
                    onChange={this.onChange}
                    name="security_answer2"
                    placeholder="Enter Answer"
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

          </Section>
        }
      </Fragment>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state: state.login,
});

export default connect(mapStateToProps, { signup })(Signup);
