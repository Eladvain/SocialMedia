//const { response } = require("express");

class SignIn extends React.Component 
{
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: '',
            email: '',
            has_error: false,
            message_error:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            hasError: false
            });
        
        event.preventDefault();
    }

    async handleSubmit(event) {

        let response;
        event.preventDefault();

        const new_user = {
            "name": this.state.name ,
            "email": this.state.email,
            "password": this.state.password
        }
        try {
            response = await fetch('/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_user)
            })
        } catch (e) {
            console.log("the error is:", e.name)
        }
        const status = response.status;
        console.log("parsed_response status------------", status);

        if (status !== 200) {
            const parsed_response = await response.json();
            console.log("error");
            this.setState({
                has_error: true,
                message_error: parsed_response.msg
            });
        }else
        {
            console.log("move to login page");
            window.location.href = '/login.html' 
        }
    }

    render() {
        return <div>
        <form onSubmit={this.handleSubmit}> 
                <div>
                <TopBar  className="tobBar"  className="container"  user_name={"fasf"} secure_with_token={false} ></TopBar>  
                <label className="sign_up_page">Sign Up Page</label>
                    <br></br>
                    <br></br>
      		  <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="name" value={this.state.name} onChange={ this.handleChange} required/>
          	  <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" value={ this.state.password} onChange={ this.handleChange} required />
             <label><b>Email</b></label>
     		 <input type="email" placeholder="Enter Email" name="email" value={ this.state.email}  onChange={ this.handleChange} required/>
             <button type="submit">Sign in</button>
      	</div>
    		<div className="container">
    </div>
            </form>
            <label name="error_signin_label" hidden={!this.state.has_error} >Error - {this.state.message_error}</label>
            <br></br>
            <span className="psw">Not The First Time? <a href="login.html">Login</a></span>
        </div>
        
    }
} 