
class MessageItem extends React.Component 
{
	constructor(props) {
		super(props);
		
		this.state = {
			token : props.token,
		}
	}

	render() {
		return <div className='single-message'>
					<span id = "message"> Sender: {this.props.send_from_id_user}</span><br></br>
					<span id = "message"> Message: {this.props.text}</span><br></br>
					<span id = "message"> Date: {this.props.date}</span><br></br>
			    </div>
	}
}
