class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_text_area: '',
            token: props.token
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

        event.preventDefault();
    }

    async handleLoginSubmit(event) {
        console.log("handleLoginSubmit method: ", this.state.post_text_area);
        let response;
        const req_body = { "text": this.state.post_text_area };
        console.log(JSON.stringify(req_body));
        try {
            response = await fetch('/post/create', {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json' },
                body: JSON.stringify(req_body)
            });
        } catch (error) {
            console.log('error');
        }

        const parsed_response = await response.json();
        console.log(parsed_response);
    }

    render() {
        return React.createElement(
            "div",
            { className: "createPost" },
            React.createElement(
                "form",
                { onSubmit: this.handleLoginSubmit },
                React.createElement(
                    "label",
                    null,
                    "Create New Post"
                ),
                React.createElement("br", null),
                React.createElement("textarea", { onChange: this.handleChange, name: "post_text_area", type: "text", placeholder: "What do you think right now?", value: this.state.post_text_area, required: true }),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Publish"
                )
            )
        );
    }
}