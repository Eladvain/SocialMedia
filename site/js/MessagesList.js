class MessagesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            messages_counter: 0
            //this.fetch_users = this.fetch_users.bind( this );
            // this.handleSubmit = this.handleSubmit.bind(this);
            //this.handleChange = this.handleChange.bind(this);
        };this.get_user_name_by_id = this.get_user_name_by_id.bind(this);
        this.fetch_messages = this.fetch_messages.bind(this);
        this.check_for_new_messages = this.check_for_new_messages.bind(this);
    }

    async check_for_new_messages() {
        const messages_list = await this.fetch_messages();
        const list_len = messages_list.length;
        if (list_len > this.state.messages_counter) {
            window.alert(`new ${list_len - this.state.messages_counter} new messages recived`);
            this.setState({
                messages: messages_list,
                messages_counter: list_len
            });
        }
    }

    async componentDidMount() {
        const messages_list = await this.fetch_messages();
        this.state.messages_counter = messages_list.length;
        this.update_list(messages_list);

        this.intervalId = setInterval(() => {
            this.check_for_new_messages();
        }, 3000);
    }

    async update_list(messages_list) {
        await this.setState({ messages: messages_list });
    }

    async get_user_name_by_id(user_id) {
        let response;
        try {
            response = await fetch('/users/user/' + user_id, {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        const parsed_response = await response.json();
        const user_name = parsed_response.user;
        return user_name.name;
    }

    async fetch_messages() {
        let response;
        try {
            response = await fetch('/message/my-message', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }

        const my_messages_list_parsed = await response.json();
        const my_messages_list = my_messages_list_parsed['all_messages'];
        const my_message_list_sorted = my_messages_list.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date);
        });
        if (typeof my_messages_list !== 'undefined' && my_messages_list.length > 0) {
            for (let i = 0; i < my_messages_list.length; i++) {
                const message = my_messages_list[i];

                const new_date = new Date(message.date);
                message.date = await new_date.toLocaleString();
                const sender_id = message.id_from_user_name;
                message.id_from_user_name = await this.get_user_name_by_id(sender_id);+`(${sender_id})`;
            }
            return my_messages_list;
        }
    }

    handleChange(event) {}

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'label',
                { className: 'messages_list_label' },
                'Messages'
            ),
            React.createElement('br', null),
            this.state.messages.map((message, index) => {
                return React.createElement(MessageItem, { className: 'messageItem', key: index, text: message.text, send_from_id_user: message.id_from_user_name, date: message.date });
            })
        );
    }
}