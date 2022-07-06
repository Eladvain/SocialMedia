class ActivateUsers extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
         request: props.request,
         token : props.token
      }
  }

  async componentDidMount() 
  {   
  }


  render() {
      return (
          <div className='activate-area'>
              <div  className="suspendedUserList">
                <UserList token={this.state.token} request = {this.state.request} />
              </div>
          </div>
      );
  }
}
