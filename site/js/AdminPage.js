class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "Root",
      token: localStorage.getItem("access_token")
    };
  }
  async componentDidMount() {
    this.state.token = document.cookie.split("=")[1];
    this.setState({
      text: this.props.post_text,
      writer: this.props.writer,
      creation_date: this.props.creation_date
    });
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(TopBar, { classNane: "tobBar", user_name: this.state.user_name, secure_with_token: true })
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(NavBar, { classNane: "navbar" }),
        React.createElement(
          "div",
          { className: "approveRequests" },
          React.createElement(ApproveRequests, { request: "join request", token: this.state.token })
        ),
        React.createElement(
          "div",
          { className: "activateUsers" },
          React.createElement(ActivateUsers, { className: "activateUsers", request: "suspended users", token: this.state.token })
        ),
        React.createElement(
          "div",
          { className: "suspendOrDeleteUsers" },
          React.createElement(DeleteOrSuspend, { className: "suspendOrDeleteUsers", request: "suspend or delete", token: this.state.token })
        ),
        React.createElement(
          "div",
          { className: "messageToAllUsers" },
          React.createElement(MessageToAllUsers, { className: "messageToAllUsers", token: this.state.token })
        )
      )
    );
  }
}