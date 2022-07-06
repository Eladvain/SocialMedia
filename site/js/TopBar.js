class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            secure_with_token: props.secure_with_token,
            intervalId: ''
        };
        this.check_token_validation = this.check_token_validation.bind(this);
        this.handle_logout = this.handle_logout.bind(this);
    }

    componentWillUnmount() {
        if (this.state.secure_with_token) {
            clearInterval(this.intervalId);
        }
    }

    async check_token_validation() {
        //  console.log("check_token_validation, Top bar:");
        let response;
        // console.log("fetch_token", href);
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
        //console.log("is_token_valid: ", is_token_valid);
        if (!is_token_valid) {
            window.location.href = "/login.html";
        }
    }

    async handle_logout() {
        let response;
        try {
            response = await fetch('/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        //console.log("logout pressed");
        const parsed_response = await response.json();
        // console.log(parsed_response);
        window.location.href = '/login.html';
    }

    async componentDidMount() {
        if (this.state.secure_with_token) {
            this.intervalId = setInterval(() => {
                this.check_token_validation();
            }, 10000);
        }
    }

    render() {
        const seucre_token = this.state.secure_with_token;
        const logout_button_text = React.createElement(
            'button',
            null,
            'logout'
        );
        return React.createElement(
            'div',
            { className: 'topbar' },
            React.createElement(
                'div',
                { className: 'topbarWrapper' },
                React.createElement(
                    'span',
                    { className: 'logo' },
                    'MTA-BOOK'
                ),
                React.createElement(
                    'div',
                    { className: 'topRight' },
                    seucre_token ? this.props.user_name : "",
                    this.state.secure_with_token ? React.createElement(
                        'button',
                        { onClick: this.handle_logout, className: 'topRight', className: 'logout' },
                        ' logout '
                    ) : null
                )
            )
        );
    }
}