class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            user_name: localStorage.getItem("user_name"),
            token: ""

            // localStorage.clear(); // clean the local storage after saving it in the state, cause we want
            // that the user will need to login again if he close the broswer's tab 
            //      this.fetch_token = this.fetch_token.bind(this);
            // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
            //  this.handleChange = this.handleChange.bind(this);
        };
    }

    async componentDidMount() {
        const token = document.cookie.split("=")[1];
        if (typeof token === 'undefined') {
            window.location.href = '/login.html';
            return;
        }
        this.state.token = token;
    }
    /*
        componentWillMount() {
            // Redirect to the login page if user didn't login
            if (localStorage.getItem("access_token") == null) {
                window.location.href = '/login.html'
            }
        }
    */
    handleChange(event) {}

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
                React.createElement(NavBar, { className: "navBar" }),
                React.createElement(
                    "div",
                    { className: "postsList" },
                    React.createElement(MessageIndication, { token: this.state.token }),
                    React.createElement(PostsList, { token: this.state.token }),
                    React.createElement("br", null),
                    React.createElement(CreatePost, { token: this.state.token })
                ),
                React.createElement(
                    "div",
                    { className: "userList" },
                    React.createElement(UserList, { token: this.state.token, request: "suspend or delete", active: "only_active_users" })
                )
            ),
            React.createElement("div", null)
        );
    }
}