class HomePage extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            user_name:localStorage.getItem("user_name"),
            token:""
           
        }

       // localStorage.clear(); // clean the local storage after saving it in the state, cause we want
        // that the user will need to login again if he close the broswer's tab 
  //      this.fetch_token = this.fetch_token.bind(this);
     // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      //  this.handleChange = this.handleChange.bind(this);
    }

    

    async componentDidMount() {
        const token = document.cookie.split("=")[1];
        if (typeof token === 'undefined') {
            window.location.href = '/login.html';
            return;
        }
        this.state.token = token;
    }
/*
    componentWillMount() {
        // Redirect to the login page if user didn't login
        if (localStorage.getItem("access_token") == null) {
            window.location.href = '/login.html'
        }
    }
*/
    handleChange(event) {

    }
      

    render() {
        return <div>
        <div>
                <TopBar classNane="tobBar" user_name={this.state.user_name} secure_with_token={ true}/>
        </div>
        <div className="container">
           <NavBar className="navBar" />
                <div className="postsList">
                    <MessageIndication  token={this.state.token}/>
                    <PostsList token={this.state.token} />
                    <br></br>
                    <CreatePost token={this.state.token} />
                </div >
                <div  className="userList">
                <UserList token={this.state.token} request = {"suspend or delete"} active = {"only_active_users"} />   
                </div>
         
        </div>
        <div>  
        </div>
     </div>

    }
} 