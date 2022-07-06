class PostsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            token: props.token,
            posts_counter: 0,
            how_much_posts_to_show: 30,
            new_posts: false, 
            interval_for_each_posts_checking: 30, 
            interval_posts_diff:0,
            intervalId:''
        }
        this.fetch_posts = this.fetch_posts.bind(this);
        this.edit_posts_lists = this.edit_posts_lists.bind(this);
        this.get_my_last_post_and_update_if_needed = this.get_my_last_post_and_update_if_needed.bind(this);
        this.check_for_new_posts = this.check_for_new_posts.bind(this);
        this.handle_new_posts_update = this.handle_new_posts_update.bind(this);
       // this.onClick = this.onClick.bind(this);
    
    }

   async get_my_last_post_and_update_if_needed(all_users_posts) {
       let response;
        try {
            response = await fetch('/users/whoami', {
                method: 'GET',
                credentials: 'include',
            });
            
        }catch (err) {
            console.log(err);
       }
       const parsed_response = await response.json();
       const my_user_info = parsed_response['my_user'];
       
       const my_user_id = my_user_info.id;
       const my_posts = all_users_posts.filter(post => post.user_name_id === my_user_id);
       if (my_posts.length > 0) { // if user has posts 
            const my_last_post = my_posts.reduce((prev, current) => {
                return (Date.parse(prev.date) > Date.parse(current.date)? prev : current)
            });           
           const post_index_to_filter = my_last_post.post_id;
           const filtered_array = all_users_posts.filter(post => post.post_id !== post_index_to_filter);
           filtered_array.unshift(my_last_post); // add my last post to the first index of the list
           return filtered_array; 
       }
    }

    async edit_posts_lists(all_users_posts) {
        all_users_posts.sort((a, b) => {
            return  Date.parse(b.date) - Date.parse(a.date);
        });
        const edit_post_list = await this.get_my_last_post_and_update_if_needed(all_users_posts);
  
        
        if (typeof edit_post_list !== 'undefined') {
            return edit_post_list.slice(0, this.state.how_much_posts_to_show)
        } else {
            return [];
        }
    }

    async handle_new_posts_update() {
        if (this.state.new_posts === true) {
            let all_posts = await this.fetch_posts();
            const number_of_posts = all_posts.length;
            all_posts = await this.edit_posts_lists(all_posts);
            this.setState({
                posts:all_posts,
                new_posts: false,
                posts_counter :number_of_posts,
                interval_posts_diff:0
            })
        }
    }



    async check_for_new_posts() {
        let all_posts = await this.fetch_posts();
        if (typeof all_posts !== 'undefined' && all_posts.length !== this.state.posts_counter) {
            all_posts = await this.get_my_last_post_and_update_if_needed(all_posts);
            this.state.new_posts = true;
            this.state.interval_posts_diff = all_posts.length - this.state.posts_counter;
            this.setState({interval_posts_diff:all_posts.length - this.state.posts_counter})
        } 
    }
    
    async componentDidMount() 
	{
        const all_posts = await this.fetch_posts();
        const all_posts_edited = await this.edit_posts_lists(all_posts);
        this.setState({ posts: all_posts_edited,
                        posts_counter : all_posts.length });
        //handle new posts checking 
        this.posts_interval_id = setInterval( () => { this.check_for_new_posts() }, 3000 );
    }




    async fetch_posts() {
        let response;
        let retVal;
        try {
            response = await fetch('/post/posts', {
                method: 'GET',
                credentials: 'include',
            });
        }catch (err) {
            console.log(err);
        }
        const parsed_repsonse = await response.json();
        if (response.status !== 200) {
            window.location.href = '/login.html';
            retVal = []; 
        } else{
            const all_users_posts = parsed_repsonse['all_Posts']
            retVal = (typeof all_users_posts !== 'undefined' && all_users_posts.length> 0) ? all_users_posts : [];
        }
        return retVal;
    }

    
    componentWillUnmount() {
        clearInterval(this.posts_interval_id);
    }

    render() {
        return <div>
            <div className="new_post_label">
                <button className="postList_indicator" type="submit" onClick={this.handle_new_posts_update}>new Posts counter: {this.state.interval_posts_diff}</button>
            </div>
            <h1>Posts</h1>
                    <div>
                        {this.state.posts.map((post, index) => {
                            return <Post post_text={post.text} writer={post.writer_user_name} creation_date={post.date} key={index }/>}  ) }
                    </div>
			    </div>
    }
}
