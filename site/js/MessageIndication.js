class MessageIndication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: props.token,
            new_messages: false,
            messages_counter: 0,
            messages_counter_diff: 0,
            intervalId: ''
        };
        this.fetch_messages = this.fetch_messages.bind(this);
        this.check_for_new_messages = this.check_for_new_messages.bind(this);
        this.handle_new_message_recived = this.handle_new_message_recived.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    async check_for_new_messages() {
        console.log("check for new messages");

        const all_my_new_messages_counter = await this.fetch_messages();
        if (all_my_new_messages_counter > this.state.messages_counter) {
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
            this.state.new_messages = false;
            this.state.diff_count_messages = 0;
            this.state.new_messages = false;
            window.location.href = "/messages.html";
        }
    }

    async componentDidMount() {
        const all_my_messages_counter = await this.fetch_messages();
        this.state.messages_counter_diff = all_my_messages_counter;
        this.state.messages_counter = all_my_messages_counter;
        //handle new messages checking 
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
        console.log("fetch messages: ", all_my_messages_parsed.count);
        return all_my_messages_parsed.count;
    }

    render() {
        return React.createElement(
            "div",
            { className: "new_message_label" },
            React.createElement(
                "button",
                { className: "new_message_button", onClick: this.handle_new_message_recived },
                "new Messages counter: ",
                this.state.messages_counter_diff
            )
        );
    }
}