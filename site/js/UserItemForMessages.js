
class UserItemForMessages extends React.Component {
	constructor(props) {
		super(props);
	}

	/*
 handle_click()
 {
 	if ( this.props.handle_delete )
 	  this.props.handle_delete( this.props.user.id );
 }
 */
	render() {
		return React.createElement(
			'div',
			{ className: 'UserItem', 'data-id': this.props.name, className: 'single-user' },
			React.createElement(
				'button',
				{ id: 'button' },
				this.props.name
			)
		);
	}
}