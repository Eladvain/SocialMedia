class ApproveRequests extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
           token:props.token,
           request:props.request
        }
    }
    update_list(users)
    {
      this.setState({ created_users: users });
    }
    async componentDidMount() 
    {   
     
    }
    
  
    render() {
        return (
            <div className='approve-area'>
                <div  className="createdUserList">
                  <UserList token={this.state.token}  request = {this.state.request} />
                </div>
            </div>
        );
    }
  }