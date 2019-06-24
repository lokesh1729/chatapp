import React, { Component } from "react";
import authRequired from "../common/AuthLayer";
import { Section } from "bloomer/lib/layout/Section";
import { Container } from "bloomer/lib/layout/Container";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Button } from "bloomer/lib/elements/Button";
import "./Room.scss";
import { TextArea } from "bloomer/lib/elements/Form/TextArea";

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
        const protocolPrefix =
            window.location.protocol === "https:" ? "wss:" : "ws:";
        let { host } = window.location;
        let socket = new WebSocket(
            `${protocolPrefix}//${host}/ws/chat/${
                this.props.match.params.roomName
            }/`,
            ["Token", `${localStorage.getItem("authToken")}`],
        );
        let self = this;
        socket.onopen = (e) => {
            console.log("opened connection...");
        };
        socket.onmessage = function receiveMessage(e) {
            console.log(`message received : ${e.data}`);
            let data = JSON.parse(e.data);
            self.setState((prevState) => ({
                chatLog: [...prevState.chatLog, data],
            }));
        };
        socket.onerror = (err) => {
            console.log(`socket connection closed unexcpectedly ${err}`);
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
    keyDownHandler = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage(event);
        }
    };
    render() {
        const chatlog = this.state.chatLog;
        return (
            <Section className="bg-purple-400 h-screen">
                <Container>
                    <div className="flex flex-col">
                        <div className="text-3xl text-center flex-auto room__name">
                            Room Name : {this.props.match.params.roomName}
                        </div>
                        <div className="w-full border-solid border border-white-500 flex-auto" />
                        <div className="chat_log__flex flex-auto flex flex-row">
                            <div className="chat_log">
                                {chatlog.map((message) => (
                                    <div key={message.key}>
                                        <span className="message__username text-white">
                                            {message.username}
                                        </span>{" "}
                                        :{" "}
                                        <span className="message__message break-words">
                                            {message.message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="user_list">
                                <ul>
                                    <li className="text-center has-text-info">
                                        user1
                                    </li>
                                    <li className="text-center has-text-info">
                                        user2
                                    </li>
                                    <li className="text-center has-text-info">
                                        user3
                                    </li>
                                    <li className="text-center has-text-info">
                                        user4
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="w-full border-solid border border-white-500 flex-auto" /> */}
                        <Container className="input__container">
                            <Field>
                                <TextArea
                                    isSize={"medium"}
                                    placeholder="Enter message"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState((_) => ({
                                            message: val,
                                        }));
                                    }}
                                    onKeyDown={this.keyDownHandler}
                                    className="resize-none shadow rounded border max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                    </div>
                </Container>
            </Section>
        );
    }
}

export default authRequired(Room);
