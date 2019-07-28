import React, { Component } from "react";
import axios from "axios";
import { Section } from "bloomer/lib/layout/Section";
import { Container } from "bloomer/lib/layout/Container";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { TextArea } from "bloomer/lib/elements/Form/TextArea";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Button } from "bloomer/lib/elements/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { alert } from "../../actions/message.actions";
import authRequired from "../common/AuthLayer";

class P2P extends Component {
  constructor(props) {
    super(props);
    const peerName = this.props.match.params.peerName;
    this.state = {
      socket: null,
      chatLog: [],
      message: "",
      peerName: peerName,
      users: []
    };
  }
  componentDidMount() {
    const token = this.props.cookies.get("authToken");
    const protocolPrefix = window.location.protocol === "https:" ? "wss:" : "ws:";
    let { host } = window.location;
    let socket = new WebSocket(
      `${protocolPrefix}//${host}/ws/p2p/${this.state.peerName}/`
    );
    let self = this;
    socket.onopen = e => {
      console.log("opened connection...");
    };
    socket.onmessage = function receiveMessage(e) {
      // console.log(`message received : ${e.data}`);
      let data = JSON.parse(e.data);
      if(data.type === "INITIAL_STATUS") {
        self.setState({
          users: data.data
        });
      }
      else if(data.type === "MESSAGE") {
        self.setState(prevState => ({
          chatLog: [...prevState.chatLog, data.data],
        }));
      }
      else if(data.type === "ONLINE") {
        if(data.data.username !== self.props.state.currentUser.username) {
          let users = self.state.users;
          users = users.filter((val) => val.username !== data.data.username);
          users.push(data.data);
          self.setState({ users });
        }
      }
      else if(data.type === "OFFLINE") {
        if(data.data.username !== self.props.state.currentUser.username) {
          let users = self.state.users;
          users = users.filter((val) => val.username !== data.data.username);
          self.setState({ users });
        }
      }

    };
    socket.onerror = err => {
      console.log(`socket connection closed unexcpectedly`);
      console.error(err);
    };
    socket.onclose = e => {
      console.log("closing connection...");
    };
    this.setState({ socket });
    axios.get(`/api/message/room/${this.state.roomName}/`, {
      headers: {"Authorization": `Token ${token}`}
    }).then(res => {
      const result = [];
      for(let val of res.data) {
        result.push({key: val["id"], message: val["text"], username: val["sender_name"], created: val["created_on"]})
      }
      self.setState((prevState) => ({
        chatLog: [...prevState.chatLog, ...result]
      }))
    }).catch(err => {
      // console.log(`response: ${JSON.stringify(err.response)}`);
      if(err.response && err.response.status !== 404) {
        console.log(err.response.statusText, err.response.statusMessage);
      }
    })
  }

  sendMessage = e => {
    e.preventDefault();
    if(!this.state.message) {
      this.props.alert("ERROR", {emptyMessage: "please enter a message"});
      return;
    }
    this.state.socket.send(JSON.stringify({ message: this.state.message, room_name: this.state.roomName }));
    this.setState(_ => ({ message: "" }));
  };

  keyDownHandler = event => {
    if (event.keyCode === 13) {
      this.sendMessage(event);
    }
  };

  render() {
    const chatlog = this.state.chatLog;
    return (
      <Section className="bg-purple-800 h-screen">
        <Container className="h-full">
          <div className="flex flex-col h-full">
            <div className="text-3xl text-center p-2 flex-auto room__name w-full border-solid border-2 border-white-500 flex-auto">
              Room Name : {this.props.match.params.roomName}
            </div>
            <div className="chat_log__flex flex-auto flex flex-row w-full border-solid border-2 border-t-0 border-white-500 flex-auto">
              <div className="chat_log w-10/12 p-2 border-solid border-r-2 border-white-500 flex-auto flex flex-col overflow-y-scroll">
                {chatlog.map(message => (
                  <div key={message.key} className="p-1">
                    <span className="message__username has-text-primary">{message.username} : </span>
                    <span className="message__message break-words">{message.message}</span>
                  </div>
                ))}
              </div>
              <div className="user_list w-2/12 flex-auto flex flex-col">
                <span className="has-text-primary text-center">Online Users</span>
                <ul>
                  {this.state.users.map(user => (
                    <div key={user.username} className={"flex"}>
                      <span className={"rounded-full h-3 w-3 mt-2 ml-3 " + (user.status === "ONLINE" ? "bg-red-500": "bg-green-500")} />
                      <li className="text-center has-text-info tooltip room__name ml-4"
                              data-tooltip={`Last Seen at ${user.last_seen}`}>{user.username}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <Container className="mt-4">
              <Field>
                <TextArea
                  isSize={"medium"}
                  placeholder="Enter message"
                  onChange={e => {
                    let val = e.target.value;
                    this.setState(_ => ({
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
                  <Button isColor="primary" onClick={this.sendMessage}>
                    <span className="has-text-info"> Submit </span>
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

P2P.propTypes = {
  alert: PropTypes.func.isRequired
};

export default connect(null, {alert})(authRequired(P2P));
