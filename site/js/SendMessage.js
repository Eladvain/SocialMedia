class SendMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            send_to: '',
            message_text: '',
            user_user_id_dict: [],
            send_to: 0,
            message_text: ""
        };
        this.handle_send_message = this.handle_send_message.bind(this);
        this.get_user_ids = this.get_user_ids.bind(this);
        this.who_am_i = this.who_am_i.bind(this);
        this.handle_choose_friend = this.handle_choose_friend.bind(this);
        this.send_message = this.send_message.bind(this);
        this.hande_message_text_change = this.hande_message_text_change.bind(this);
    }

    async componentDidMount() {
        const options = await this.get_user_ids();
        options.unshift({ user_name: "please choose", user_id: "0" });
        console.log("options", options);
        this.setState({ user_user_id_dict: options });
    }

    async get_user_ids() {
        let response;
        try {
            response = await fetch('/users/users', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        let user_id_dict = [];
        const my_user_id = await this.who_am_i();
        if (response.status === 200) {
            const parsed_response = await response.json();
            const users_list = parsed_response.active_users;
            const other_users = await users_list.filter(user => user.id !== my_user_id);

            if (typeof other_users !== 'undefined' && other_users.length > 0) {
                user_id_dict = other_users.map((user, index) => {
                    return { user_name: user.name, user_id: user.id };
                });

                console.log("user_ids_dict", user_id_dict);
            }

            return user_id_dict;
        }
    }

    async who_am_i() {
        let response;
        try {
            response = await fetch('/users//whoami', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        if (response.status === 200) {
            const my_user_parsed = await response.json();
            console.log("id from who_am_i:", my_user_parsed.my_user.id);
            return my_user_parsed.my_user.id;
        } else {
            console.log("failed to check who am i in SendMEssage Component");
        }
    }

    async send_message(send_to, text) {
        const body = { "send_to": send_to, "text": text };
        let response;
        try {
            response = await fetch('/message/send', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    credentials: 'include'
                },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log('error');
        }
        if (response.status === 200) {
            window.confirm("Message send succesffuly");
            this.setState({
                send_to: 0,
                message_text: ""
            });
        } else {
            window.confirm("failed to send message, please try again later");
        }
    }

    async handle_send_message(event) {
        event.preventDefault();
        if (this.state.send_to !== 0 && this.state.message_text.length > 0) {
            const send_to = this.state.send_to;
            const text = this.state.message_text;
            await this.send_message(send_to, text);
        } else {
            window.confirm("please choose a freind and add text");
        }
    }

    hande_message_text_change(event) {
        this.setState({ message_text: event.target.value });
    }

    handle_choose_friend(event) {
        const selected_use_name = event.target.value;
        const selected_user_obj = this.state.user_user_id_dict.find(user => user.user_name === selected_use_name);
        const selected_user_id = selected_user_obj.user_id;
        this.setState({ send_to: selected_user_id });
        console.log("selected_user_obj", selected_user_id);
    }

    render() {
        return React.createElement(
            'div',
            { className: 'send_message_container' },
            React.createElement(
                'div',
                { className: 'send_to_label_and_input' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'label',
                        null,
                        'Choose a friend:'
                    ),
                    React.createElement(
                        'select',
                        { name: 'sent_to', onChange: this.handle_choose_friend, required: true },
                        this.state.user_user_id_dict.map((user, index) => React.createElement(
                            'option',
                            { value: user.id, name: user.user_id, key: user.user_id },
                            user.user_name
                        ))
                    ),
                    React.createElement(
                        'div',
                        { className: 'send_to_label_and_input' },
                        React.createElement(
                            'label',
                            null,
                            'text:'
                        ),
                        React.createElement('textarea', { placeholder: 'please add the message here', value: this.state.message_text, onChange: this.hande_message_text_change, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'send_to_label_and_input' },
                        React.createElement(
                            'button',
                            { onClick: this.handle_send_message },
                            'SEND'
                        )
                    )
                )
            )
        );
    }
}