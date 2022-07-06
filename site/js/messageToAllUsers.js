class MessageToAllUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text_area: '',
            token: props.token
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    async handleChange(event) {
        await this.setState({ text_area: event.target.value });

        // event.preventDefault();
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        //console.log("handleLoginSubmit method: ", this.state.text_area);
        let response;
        const req_body = { "text": this.state.text_area };
        //console.log(JSON.stringify(req_body))
        const token = 'Bearer ' + this.state.token;

        try {
            response = await fetch('/admin/messages', {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json' },
                body: JSON.stringify(req_body)
            });
        } catch (error) {
            console.log('error');
        }

        const parsed_response = await response.json();
        //console.log(JSON.stringify(parsed_response));
        window.alert("message send to all users successfuly");
        this.setState({ text_area: "" });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'createPost' },
            React.createElement(
                'h1',
                null,
                'Message To Users'
            ),
            React.createElement(
                'form',
                { onSubmit: this.handleLoginSubmit },
                React.createElement(
                    'label',
                    null,
                    'Create New Message'
                ),
                React.createElement('br', null),
                React.createElement('textarea', { onChange: this.handleChange, name: 'post_text_area', type: 'text', placeholder: 'send message to all users...', value: this.state.text_area, required: true }),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { type: 'submit' },
                    'Send'
                )
            )
        );
    }
}