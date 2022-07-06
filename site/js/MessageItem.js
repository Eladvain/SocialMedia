
class MessageItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: props.token
		};
	}
	// async componentDidMount()
	// {
	// 	console.log("inside");
	// }

	render() {
		return React.createElement(
			'div',
			{ className: 'messageItem', className: 'single-message' },
			React.createElement(
				'span',
				{ id: 'message' },
				' Sender: ',
				this.props.send_from_id_user
			),
			React.createElement('br', null),
			React.createElement(
				'span',
				{ id: 'message' },
				' Message: ',
				this.props.text
			),
			React.createElement('br', null),
			React.createElement(
				'span',
				{ id: 'message' },
				' Date: ',
				this.props.date
			),
			React.createElement('br', null)
		);
	}
}