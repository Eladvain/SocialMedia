
class UserItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: props.token,
			request: props.request
		};
		this.handleWatchMessages = this.handleWatchMessages.bind(this);
	}
	// async componentDidMount()
	// {
	// 	console.log("inside");
	// }
	async handleWatchMessages(event) {
		event.preventDefault();
		window.alert("name = " + event.target.value);
	}

	render() {
		return React.createElement(
			'div',
			{ className: 'UserItem', 'data-id': this.props.name, className: 'single-user' },
			React.createElement(
				'span',
				null,
				this.props.name
			),
			this.state.request === "join request" ? React.createElement(ApproveButton, { request: this.state.request, id: this.props.id, token: this.state.token, name: "Approve" }) : "",
			this.state.request === "suspended users" ? React.createElement(ApproveButton, { request: this.state.request, id: this.props.id, token: this.state.token, name: "Activate" }) : "",
			this.state.request === "suspend or delete" && this.props.active === "" ? React.createElement(
				'div',
				null,
				React.createElement(ApproveButton, { request: this.state.request, id: this.props.id, token: this.state.token, name: "suspend" }),
				React.createElement(ApproveButton, { request: this.state.request, id: this.props.id, token: this.state.token, name: "delete" })
			) : "",
			this.state.request === "suspend or delete" && this.props.active === "only_active_users" ? "" : ""
		);
	}
}