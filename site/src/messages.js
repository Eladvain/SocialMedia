class Messages extends React.Component 
{
    constructor(props) {
        
        super(props);

        this.state = {
            user_name: localStorage.getItem("user_name"),
            token: "",
            my_messages: []
        };
        //this.fetch_my_messages = this.fetch_my_messages.bind(this);


    
    }
  

    async componentDidMount() {
        this.state.token = document.cookie.split("=")[1];
       // this.fetch_my_messages();
      
    }

    

    render()
    {
        return  <div className="container">
                        <TopBar classNane="tobBar" user_name={this.state.user_name} secure_with_token={true} />
                            <div className="verticalContainer">
                    
                                <div className="navBar">
                                <NavBar  />
                                </div>
                                 <div className="messageList">
                                 <MessagesList  token = {this.state.token} userName = {this.state.user_name}/>
                                </div>
                                <div>
                                    <SendMessage></SendMessage>
                                </div>
                                
                            </div>
                            <div className="MessagesList">
                            </div>
                </div>
    }
} 
