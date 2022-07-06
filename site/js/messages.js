class Messages extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            user_name: localStorage.getItem("user_name"),
            token: document.cookie.split("=")[1],
            my_messages: [],
            messages_counter_diff: 0,
            messages_counter: 0,
            new_messages: false
        };
        this.check_for_new_messages = this.check_for_new_messages.bind(this);
        this.fetch_messages = this.fetch_messages.bind(this);
        this.handle_new_message_recived = this.handle_new_message_recived.bind(this);
    }

    async check_for_new_messages() {
        console.log("check for new messages");

        const all_my_new_messages_counter = await this.fetch_messages();
        if (all_my_new_messages_counter.length > this.state.messages_counter) {
            const diff_count_messages = all_my_new_messages_counter - this.state.messages_counter;
            this.setState({
                messages_counter_diff: diff_count_messages,
                new_messages: true
            });
        }
    }

    async handle_new_message_recived() {
        console.log("handle_new_message_recived");
        if (this.state.new_messages) {

            this.SetState({
                new_messages: false,
                diff_count_messages: 0,
                new_messages: false
            });
        }
    }

    async componentDidMount() {
        const all_my_messages_counter = await this.fetch_messages();
        this.state.messages_counter_diff = all_my_messages_counter.length;
        this.state.messages_counter = all_my_messages_counter.length;

        this.intervalId = setInterval(() => {
            this.check_for_new_messages();
        }, 3000);
    }

    async fetch_messages() {
        let response;
        try {
            response = await fetch('/message/my-message', {
                method: 'GET',
                headers: {
                    credentials: 'include'
                }
            });
        } catch (error) {
            console.log('error');
        }
        const all_my_messages_parsed = await response.json();
        return all_my_messages_parsed.all_messages;
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(TopBar, { classNane: "tobBar", user_name: this.state.user_name, secure_with_token: true }),
            React.createElement(
                "div",
                { className: "verticalContainer" },
                React.createElement(
                    "div",
                    { className: "navBar" },
                    React.createElement(NavBar, null)
                ),
                React.createElement(
                    "div",
                    { className: "messageList" },
                    React.createElement(MessagesList, { token: this.state.token, userName: this.state.user_name })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(SendMessage, null)
                )
            ),
            React.createElement("div", { className: "MessagesList" })
        );
    }
}