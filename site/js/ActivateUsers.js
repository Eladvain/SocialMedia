class ActivateUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: props.request,
      token: props.token
    };
  }

  async componentDidMount() {}

  render() {
    return React.createElement(
      "div",
      { className: "activate-area" },
      React.createElement(
        "div",
        { className: "suspendedUserList" },
        React.createElement(UserList, { token: this.state.token, request: this.state.request })
      )
    );
  }
}