class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_text_area: '',
            token: props.token
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    }



    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        
        event.preventDefault();
    }

    async handleLoginSubmit(event) { 
        console.log("handleLoginSubmit method: ", this.state.post_text_area);
        let response;
        const req_body = {"text": this.state.post_text_area};
       console.log(JSON.stringify(req_body))
        try {
            response = await fetch('/post/create', {
                method: 'POST',
                headers: {
                    credentials: 'include',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(req_body)
            });
        } catch (error){
            console.log('error');
        }
        
        const parsed_response = await response.json();
        console.log(parsed_response)
    }


    render() {
        return (
            <div className='createPost'>
                <form onSubmit={this.handleLoginSubmit}>
                    <label>Create New Post</label>
                    <br></br>
                    <textarea onChange={this.handleChange} name="post_text_area" type="text" placeholder="What do you think right now?" value={this.state.post_text_area} required></textarea >
                    <br></br>
                    <button type="submit">Publish</button>
                </form>
            </div>
        );
    }
}
