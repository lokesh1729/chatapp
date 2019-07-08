import React, { Component } from "react";
import { Section } from "bloomer/lib/layout/Section";
import { Container } from "bloomer/lib/layout/Container";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Label } from "bloomer/lib/elements/Form/Label";
import "./RoomEnter.scss";
import { Button } from "bloomer/lib/elements/Button";

class RoomEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
    };
  }

  enterRoom = event => {
    event.preventDefault();
    this.props.history.push("/room/" + this.state.roomName);
  };

  roomNameChange = event => {
    let val = event.target.value;
    this.setState(_ => ({ roomName: val }));
  };

  keyDownHandler = event => {
    if (event.keyCode === 13) {
      this.enterRoom(event);
    }
  };

  render() {
    return (
      <Section className="room_enter__section">
        <Container className="room__container">
          <Label className="room__label">Enter a room name:</Label>
          <Input
            type={"text"}
            className="room__input"
            onChange={this.roomNameChange}
            onKeyDown={this.keyDownHandler}
          />
          <Button isColor={"primary"} className="large__btn" onClick={this.enterRoom}>
            Enter
          </Button>
        </Container>
      </Section>
    );
  }
}
export default RoomEnter;
