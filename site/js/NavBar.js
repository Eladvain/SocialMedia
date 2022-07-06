class NavBar extends React.Component {
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
              { className: "nav_bar_messages_page" },
              React.createElement(
                "a",
                { href: "../messages.html", "data-toggle": "tab" },
                "Messages"
              )
            ),
            React.createElement(
              "li",
              { className: "nav_bar_about_page" },
              React.createElement(
                "a",
                { href: "../about-us.html", "data-toggle": "tab" },
                "About Us"
              )
            ),
            React.createElement(
              "li",
              { className: "nav_bar_home_page" },
              React.createElement(
                "a",
                { href: "../home-page.html", "data-toggle": "tab" },
                "Home-Page"
              )
            )
          )
        )
      )
    );
  }
}