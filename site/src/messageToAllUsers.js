class MessageToAllUsers extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          text_area: '',
          token: props.token
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

  }



  async handleChange(event) {
     await this.setState({text_area : event.target.value});
      
      // event.preventDefault();
  }

  async handleLoginSubmit(event) { 
    event.preventDefault();
      let response;
      const req_body = {"text": this.state.text_area};
      try {
          response = await fetch('/admin/messages', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(req_body)
          });
      } catch (error){
          console.log('error');
      }
      
      const parsed_response = await response.json();
     window.alert("message send to all users successfuly");
     this.setState({text_area : ""});
  }


  render() {
      return (
          <div className='createPost'>
            <h1 className="category-admin">Message To Users</h1>
              <form onSubmit={this.handleLoginSubmit}>
                  <label>Create New Message</label>
                  <br></br>
                  <textarea onChange={this.handleChange} name="post_text_area" type="text" placeholder="send message to all users..." value={this.state.text_area} required></textarea >
                  <br></br>
                  <button type="submit">Send</button>
              </form>
          </div>
      );
  }
}
