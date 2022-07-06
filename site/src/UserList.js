class UserList extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            active_users : [],
            created_users : [],
            suspended_users : [],
            tok : props.token,
            req : props.request 
        }
        this.fetch_users = this.fetch_users.bind( this );
    }
    componentWillUnmount() {
        clearInterval(this.intervalId1);
        clearInterval(this.intervalId2);
        clearInterval(this.intervalId3);
    }


    async componentDidMount() 
	{
        const req_users = await this.fetch_users(this.state.req);
		await this.update_lists(req_users, this.state.req);
        if (typeof this.state.created_users !== 'undefined' && this.state.created_users.length>0){
            this.intervalId1 = setInterval(async () => 
            {
                const users = await this.fetch_users("join request");
                await this.update_lists(users, "join request") }, 500);
        }
        if( typeof this.state.suspended_users !== 'undefined' && this.state.suspended_users.length>0){
            this.intervalId2 = setInterval(async () => 
                {
                    const users = await this.fetch_users("suspended users");
                    await this.update_lists(users, "suspended users") }, 500 );
        }
        if(typeof this.state.active_users !== 'undefined' && this.state.active_users.length>0){
            this.intervalId3 = setInterval(async () => 
                {
                    const users = await this.fetch_users("suspend or delete");
                    await this.update_lists(users, "suspend or delete") }, 500);
        }
    }

    update_lists( users, request )
	{
        if(request === "join request"){
		  this.setState({
                created_users : users
            })
        }
        else if(request === "suspended users")
        {
             this.setState({
                suspended_users : users
            })
        }
        else if(request === "suspend or delete")
        {
             this.setState({
                active_users : users
            })
        }

	}
    
    async fetch_users(request) {
        let response;
        let res_status;
        let retVal=[];
        try {
            switch (request)
            {
                case "join request":
                    try{
                        response = await fetch('/admin/createdUsers', {
                            method: 'GET',
                            credentials: 'include'
                        });
                    }catch(err){
                        console.log("err = "+err);
                    }
                    res_status = response.status;
                    const join_users = await response.json();
                    retVal =  join_users['list_of_created_users'];
                    break;
                
                case "suspended users":
                    try{
                        response = await fetch('/admin/suspendedUsers', {
                            method: 'GET',
                            headers: {  credentials: 'include' }
                        });
                    }catch(err){
                        console.log("err = "+err);
                    }
                    res_status = response.status;
                    const text = await response.json();
                    retVal =  text['list_of_suspended_users'];
                    break;
                
                case "suspend or delete":
                    try{
                        response = await fetch('/users/users', {
                        method: 'GET',
                        headers: {  credentials: 'include' }
                        });
                    res_status = response.status;
                    const text = await response.json();
                    retVal =  text['active_users'];
                    }catch (err){
                        console.log("err = "+err);
                    }
                    break;
            }
            if (res_status === 403) {
                window.location.href = '/login.html';
                return [];
            } else {
                return retVal;
            }

        }catch (err) {
            console.log(err);
        }
    }


    render() {
        return <div>
            <div>
                {this.props.active === "only_active_users" ? (
                    
                    <h1 className="category-admin">Active Users</h1>
                ): <h1 className="category-admin">{this.state.req}</h1>}
           </div>
               {typeof this.state.created_users !== 'undefined'  && this.state.created_users.length>0 ?(
                  this.state.created_users.map((item, index) => {
                      if(item.name !== "Root")
                        return <UserItem name={item.name} id = {item.id} token = {this.state.tok} request = {this.state.req} key={ index}/>
                }  ) ):""}
                {typeof this.state.suspended_users!== 'undefined' && this.state.suspended_users.length>0 ?(
                  this.state.suspended_users.map((item, index) => {
                    if(item.name !== "Root")
                        return <UserItem name={item.name} id = {item.id} token = {this.state.tok} request = {this.state.req} key={ index}/>
                }  ) ):""}
                {typeof this.state.active_users !== 'undefined' && this.state.active_users.length>0 ?(
                  this.state.active_users.map((item, index) => {
                    if(item.name !== "Root" && this.props.active === "suspend_or_delete_list" && this.props.request === "suspend or delete")
                        return <UserItem name={item.name} id = {item.id} active = {""} token = {this.state.tok} request = {this.state.req} key={ index}/>
                    else if(item.name !== "Root" && this.props.active === "only_active_users" && this.props.request === "suspend or delete")
                        return <UserItem name={item.name} id = {item.id} active = {"only_active_users"} token = {this.state.tok} request = {this.state.req} key={ index}/>                           
                    // else if(item.name !== "Root" && this.props.active === "Users" && this.props.request === "suspend or delete")    
                    //     return <UserItem name={item.name} id = {item.id} active = {"Users"} token = {this.state.tok} request = {""} key={ index}/>                           
                }  ) ):""}
        </div>   
	}
} 
