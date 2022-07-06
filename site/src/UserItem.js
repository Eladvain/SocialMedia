
class UserItem extends React.Component 
{
	constructor(props) {
		super(props);
		
		this.state = {
			token : props.token,
			request : props.request ,
		}
		this.handleWatchMessages = this.handleWatchMessages.bind(this);
	}

	async handleWatchMessages(event)
	{
		event.preventDefault();
		window.alert("name = "+event.target.value);
	}

	render() {
		return 	<div className='UserItem'  data-id={this.props.name} className='single-user'>
						{/* {this.props.active === "Users"? (
							 <button className = "button" value ={this.propsname} id = {this.props.id}  onClick = {this.handleWatchMessages}>{this.props.name}</button> */}
						<span>{this.props.name}</span>
								{this.state.request === "join request"? (
								 <ApproveButton request={this.state.request} id={this.props.id} token={this.state.token} name = {"Approve"} />
									):""}
								{this.state.request === "suspended users"? (
								  <ApproveButton request={this.state.request} id={this.props.id} token={this.state.token} name = {"Activate"} />	
								 ):""}	
								{this.state.request === "suspend or delete" && this.props.active === ""? (
									<div>
								  <ApproveButton request={this.state.request} id={this.props.id} token={this.state.token} name = {"suspend"}/>
								  <ApproveButton request={this.state.request} id={this.props.id} token={this.state.token} name = {"delete"}/>
									</div>
								 ):""}
								 {this.state.request === "suspend or delete" && this.props.active === "only_active_users"?(
									 ""):""}
								 
				</div>
	}
}
