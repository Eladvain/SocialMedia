class DeleteOrSuspend extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
         token:props.token,
         request:props.request
      }
  }
  update_list(users)
  {
    
  }
  async componentDidMount() 
  {   
  
  }

  render() {
      return (
          <div className='approve-area'>
              <div  className="createdUserList">
                <UserList token={this.state.token}  request = {this.state.request} active = {"suspend_or_delete_list"} />
              </div>
          </div>
      );
  }
}
