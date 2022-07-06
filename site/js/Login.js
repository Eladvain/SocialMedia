class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            hasError: false,
            messageError: ''
        };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.check_if_loged_in = this.check_if_loged_in.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            hasError: false
        });

        //event.preventDefault();
    }

    async login() {
        let response;
        const user = {
            "name": this.state.name,
            "password": this.state.password
        };
        try {
            response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    credentials: 'include'
                },
                body: JSON.stringify(user)
            });
        } catch (error) {
            console.log('error = ' + error);
        }

        if (response.status !== 200) {
            const error_message = await response.json();
            this.setState({
                hasError: true,
                messageError: error_message['msg']
            });
            return;
        } else {
            localStorage.setItem("user_name", user.name);
            if (user.name === "Root") //****************** */
                window.location.href = '/admin-page.html';else window.location.href = '/home-page.html'; // TODO: create a dely so the user can see the new user detailes
        }
    }

    async check_if_loged_in() {
        let response;
        try {
            response = await fetch('/auth/verify-token', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }

        const is_token_valid_parsed = await response.json();
        const is_token_valid = is_token_valid_parsed.valid_token;
        const user_id = is_token_valid_parsed.user_id;
        if (is_token_valid) {
            if (user_id == 1) {
                window.location.href = '/admin-page.html';
            } else {
                window.location.href = '/home-page.html';
            }
        }
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        this.login();
    }

    async componentDidMount() {
        await this.check_if_loged_in();
    }

    render() {
        return React.createElement(
            'form',
            { onSubmit: this.handleLoginSubmit },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(TopBar, { className: 'tobBar', className: 'container', user_name: "fasf", secure_with_token: false }),
                React.createElement(
                    'label',
                    { className: 'login_label' },
                    'Login Page'
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    React.createElement(
                        'b',
                        null,
                        'Username'
                    )
                ),
                React.createElement('input', { type: 'text', placeholder: 'Enter Username', name: 'name', value: this.state.name, onChange: this.handleChange, required: true }),
                React.createElement(
                    'label',
                    null,
                    React.createElement(
                        'b',
                        null,
                        'Password'
                    )
                ),
                React.createElement('input', { type: 'password', placeholder: 'Enter Password', name: 'password', value: this.state.password, onChange: this.handleChange, required: true }),
                React.createElement(
                    'button',
                    { type: 'submit' },
                    'Login'
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'error', name: 'error-login', hidden: !this.state.hasError },
                    'Error message:',
                    this.state.messageError
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'psw' },
                    'first time? ',
                    React.createElement(
                        'a',
                        { href: 'sign-in.html' },
                        'sign-in'
                    )
                )
            )
        );
    }
}