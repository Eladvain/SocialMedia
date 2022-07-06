class AdminPage extends React.Component {
  constructor(props) {
      super(props);

    this.state = {
          user_name : "Root",
          token: localStorage.getItem("access_token")
    }

  }
  async componentDidMount() 
  {
    this.state.token = document.cookie.split("=")[1];
    this.setState({
    text: this.props.post_text,
    writer: this.props.writer,
    creation_date: this.props.creation_date
    });
  }


  render() {
      return (
          <div>
              <div>
                <TopBar classNane="tobBar" user_name={ this.state.user_name}  secure_with_token={true}/>
              </div>
              <div className="container">
            <NavBar classNane="navbar" />
            <div className="approveRequests" >
                <ApproveRequests request = {"join request"} token = {this.state.token}/>   
            </div>
            <div  className="activateUsers">
                 <ActivateUsers   className = "activateUsers" request = {"suspended users"} token = {this.state.token}/> 
            </div>
            <div className="suspendOrDeleteUsers">
                 <DeleteOrSuspend  className = "suspendOrDeleteUsers" request = {"suspend or delete"} token = {this.state.token}/> 
            </div>                   
            <div className="messageToAllUsers">
              <MessageToAllUsers className = "messageToAllUsers" token={this.state.token}/>
            </div>
                    
              </div>
          </div>
      );
  }
}
