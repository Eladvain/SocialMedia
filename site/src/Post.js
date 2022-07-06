class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            writer: '',
            creation_date: ''
        }
    }

    async componentDidMount() 
	{
        this.setState({
            text: this.props.post_text,
            writer: this.props.writer,
            creation_date: this.props.creation_date
            });
    }


    render() {
        return (
            <div className='single-post'>
                <label className="send_poster_laber">{this.props.writer} : {this.props.post_text}</label> 
            </div>
        );
    }
}
