import React, { Component } from "react";
import authRequired from "../common/AuthLayer";
import { Section } from "bloomer/lib/layout/Section";
import { Container } from "bloomer/lib/layout/Container";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Button } from "bloomer/lib/elements/Button";

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            chatLog: [],
            message: "",
        };
    }
    componentDidMount() {
        let socket = new WebSocket(
            `ws://localhost:5000/ws/chat/${this.props.match.params.roomName}/`,
        );
        let self = this;
        socket.onopen = (e) => {
            console.log("opened connection...");
            this.state.socket.send(JSON.stringify({ message: "hey" }));
        };
        socket.onmessage = function receiveMessage(e) {
            console.log(`message received : ${e.data}`);
            let data = JSON.parse(e.data);
            self.setState((prevState) => ({
                chatLog: [...prevState.chatLog, data],
            }));
        };
        socket.onerror = (err) => {
            console.log(err);
        };
        socket.onclose = (e) => {
            console.log(e);
        };
        this.setState({ socket });
    }
    sendMessage = (e) => {
        e.preventDefault();
        this.state.socket.send(JSON.stringify({ message: this.state.message }));
        this.setState((_) => ({ message: "" }));
    };
    render() {
        const chatlog = this.state.chatLog;
        return (
            <Section className="bg-purple-400 h-screen">
                <Container>
                    <div className="text-3xl">
                        Room Name : {this.props.match.params.roomName}
                    </div>
                    <div className="chat_log">
                        {chatlog.map((message) => (
                            <div key={message.key}>{message.message}</div>
                        ))}
                    </div>
                </Container>
                <Container>
                    <Field>
                        <Input
                            type="text"
                            placeholder="Enter message"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.setState((_) => ({
                                    message: val,
                                }));
                            }}
                            className="shadow rounded border max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={this.state.message}
                        />
                    </Field>
                    <Field>
                        <Control>
                            <Button
                                isColor="primary"
                                onClick={this.sendMessage}
                            >
                                Submit
                            </Button>
                        </Control>
                    </Field>
                </Container>
            </Section>
        );
    }
}

export default authRequired(Room);
