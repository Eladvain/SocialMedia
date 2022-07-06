class ApproveRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
      request: props.request
    };
  }
  update_list(users) {
    this.setState({ created_users: users });
  }
  async componentDidMount() {}
  // const all_created_users = await this.fetch_created_users();
  // console.log("created_users = "+all_created_users);
  // this.update_list(all_created_users);

  // async fetch_created_users() {
  //   let response;
  //  // console.log("fetch_posts");
  //   const token = 'Bearer ' + this.state.token;
  //   try {
  //       response = await fetch('/admin/createdUsers', {
  //           method: 'GET',
  //           headers: { 'authorization': token }
  //       });

  //   }catch (err) {
  //       console.log(err);
  //   }
  //   const parsed_repsonse = await response.json();
  //   const all_users_created = parsed_repsonse['list_of_created_users']
  //   //this.state.posts_counter = all_users_posts.length
  //   return all_users_created;
  // }

  render() {
    return React.createElement(
      "div",
      { className: "approve-area" },
      React.createElement(
        "div",
        { className: "createdUserList" },
        React.createElement(UserList, { token: this.state.token, request: this.state.request })
      )
    );
  }
}