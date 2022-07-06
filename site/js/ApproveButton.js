
class ApproveButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: props.token,
			// id : props.id,
			name: props.name,
			request: props.request
		};
		this.handleApproveClick = this.handleApproveClick.bind(this);
	}
	async handleApproveClick(event) {
		event.preventDefault();
		let response;
		const button_value = event.target.value;
		const id = event.target.id;
		const userName = { "user_name": this.state.name };
		const token = 'Bearer ' + this.state.token;
		try {
			let url;
			if (button_value === "Activate") {
				const new_mode = { "new_mode": "active" };
				console.log("props.id = " + id);
				url = '/admin/mode/' + id;
				console.log("url = " + url);
				try {
					response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'authorization': token
						},
						body: JSON.stringify(new_mode)
					});
				} catch (err) {
					console.log("err = " + err);
				}
				const resp = await response.json();
			} else if (button_value === "Approve") {
				url = '/admin/confirmation/' + id;
				try {
					response = await fetch(url, {
						method: 'POST',
						headers: {
							'authorization': token
						}
					});
				} catch (err) {
					console.log("err = " + err);
				}
				const resp = await response.json();
			} else if (button_value === "suspend" || button_value === "delete") {
				let new_mode;
				if (button_value === "suspend") new_mode = button_value + "ed";else if (button_value === "delete") new_mode = button_value + "d";
				const new_mode_to_server = { "new_mode": new_mode };
				url = '/admin/mode/' + id;
				try {
					response = await fetch(url, {
						method: 'POST',
						headers: {
							'authorization': token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(new_mode_to_server)
					});
				} catch (err) {
					console.log("err = " + err);
				}
				const resp = await response.json();
			}
		} catch (error) {
			console.log('error: ' + error);
		}
	}

	render() {
		return React.createElement(
			"div",
			{ className: "approveButton" },
			this.props.name !== "",
			React.createElement(
				"button",
				{ className: "button", value: this.state.name, id: this.props.id, onClick: this.handleApproveClick },
				this.state.name
			),
			";"
		);
	}
}