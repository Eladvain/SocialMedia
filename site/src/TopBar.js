class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            secure_with_token: props.secure_with_token,
            intervalId:''
        }
        this.check_token_validation = this.check_token_validation.bind(this);   
        this.handle_logout = this.handle_logout.bind(this);
    }

    
    componentWillUnmount() {
        if (this.state.secure_with_token) {
            clearInterval(this.intervalId);
        }
    }


    async check_token_validation() {
        let response;
        try {
            response = await fetch('/auth/verify-token', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        const is_token_valid_parsed = await response.json();
        const is_token_valid = is_token_valid_parsed.valid_token;
        if (!is_token_valid) {
            window.location.href = "/login.html";
        }     
    }

    async handle_logout() {
        let response;
        try {
            response = await fetch('/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        const parsed_response = await response.json();
        window.location.href = '/login.html'
    }
   
  async componentDidMount() 
  {
    if (this.state.secure_with_token) {
    this.intervalId = setInterval( () => { this.check_token_validation() }, 10000 );  
    }
  }

    render() {
        const seucre_token = this.state.secure_with_token;
        const logout_button_text = <button>logout</button>;
        return (
            <div className="topbar">
                <div className="topbarWrapper">
                  
                        <span className="logo">MTA-BOOK</span>
                 
                    <div className="topRight" >
                             {seucre_token ?  this.props.user_name: ""}
                            {this.state.secure_with_token ? <button onClick={this.handle_logout} className="topRight" className="logout"> logout </button> : null}
                       </div>
                    </div>
                </div>
        );
    }
}

