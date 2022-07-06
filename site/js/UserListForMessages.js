class UserListForMessages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            token: props.token
        };
        this.fetch_users = this.fetch_users.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const users = await this.fetch_users();
        this.update_list(users);
    }

    update_list(users) {
        this.setState({ users: users });
    }

    async fetch_users() {
        let response;
        const body = {};
        const token = 'Bearer ' + this.state.token;
        try {
            response = await fetch('/users/users', {
                method: 'GET',
                headers: { 'authorization': token }
            });
        } catch (err) {
            console.log(err);
        }

        const text = await response.json();
        console.log(text['acitve']);
        return text['active_users'];
    }

    handleChange(event) {}

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'label',
                null,
                'Users'
            ),
            React.createElement(
                'div',
                null,
                this.state.users.map((user, index) => {
                    if (user.name !== "Root") return React.createElement(UserItemForMessages, { name: user.name, key: index });
                })
            )
        );
    }
}