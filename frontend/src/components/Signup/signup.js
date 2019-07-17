import React, { Component } from "react";
import { Control, Field, Input, Label, Section } from "bloomer";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      securityQuestion1: "",
      securityQuestion2: "",
      securityAnswer1: "",
      securityAnswer2: "",
    };
  }

  render() {

    return (
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
        </form>

      </Section>
    );
  }
}

export default Signup;
