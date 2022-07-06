class AdminNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    /*this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    */
  }
  handleChange(event) {}

  async handleLoginSubmit(event) {}

  render() {
    return React.createElement(
      "div",
      { className: "sidebar" },
      React.createElement(
        "div",
        { className: "sidebarWrapper" },
        React.createElement(
          "div",
          { className: "sidebarMenu" },
          React.createElement(
            "h3",
            { className: "sidebarTitle" },
            "Navigation Bar"
          ),
          React.createElement(
            "ul",
            { className: "sidebarList" },
            React.createElement(
              "li",
              { className: "sidebarListItem active" },
              React.createElement(
                "a",
                { href: "/messages" },
                "Messages"
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "li",
              { className: "sidebarListItem active" },
              React.createElement(
                "a",
                { href: "../approveRequests.html" },
                "Approve join requests"
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "li",
              { className: "sidebarListItem active" },
              React.createElement(
                "a",
                { href: "/DeleteOrSuspUsers" },
                "Delete/Suspend users"
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "li",
              { className: "sidebarListItem active" },
              React.createElement(
                "a",
                { href: "/ActivateUser" },
                "Activate a suspended user"
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "li",
              { className: "sidebarListItem" },
              React.createElement(
                "a",
                { href: "/about-us" },
                "About Us"
              )
            )
          )
        )
      )
    );
  }
}