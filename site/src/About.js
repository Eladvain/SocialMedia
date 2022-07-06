class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem("user_name"),
        }
    }
  
    render() {
        return (
            <div>
                <TopBar classNane="tobBar" user_name={this.state.user_name} secure_with_token={true} />
                <div >
                    <div className="about_us_background">
                        <h1>About Us (Readme)</h1>
                        <div className = "container">
                            <NavBar className="navBar"></NavBar>
                            <div className="readme_text">
                            <p>Date : 19/02/22</p>
<p>Name : Exercise 3 in JS Course - Social Network .</p>
<p>Submitters : Refael Doron  311819372  Refaelr93@gmail.com  </p>
<p> Elad Vainberg  312492689  eladvainberg@gmail.com</p>
<p></p>
<p>From EX2:</p>
<p>Comments :</p>
<p>1) In order to run our code you will use the following command - npm run devStart.</p>
<p>2) Note that we submitted the task to you so that you can first run it in postman for the first time. If for some reason you want to run postman again you must clean the following files:</p>
<p>  a.-users.TXT; must be wite at list Root user.</p>
<p>  b. message.txt; must be : []</p>
<p>  c. BlackList.txt; must be : { }</p>
<p>3) We used an external directory called ;JWT; so that we could give each user a token with which we could identify that the API request was indeed with the appropriate permission.</p>
<p>  In addition, we managed our own blackList, so that every time a user logs out of the system, the token enters this list and with its help we know later if there is a permit for the following api requests.</p>
<p>4) Another external directory we used is a ;bcrypt;. We used this directory in order to hash user&apos;s password and to save not his really password in the server. This directory helps us manage</p>
<p>  passwords of users in our system.</p>
<p>5) Our system consist of 6 routes :</p>
<p>  a. index - This is our base router. His job is to route the requests to the following routers.</p>
<p>  b. auth - His responsibility is on sign in, Log in and Log out of users.</p>
<p>  c. users</p>
<p>  d. post</p>
<p>  e. message </p>
<p>6) Details of admin for login :</p>
<p>  name: "Root"</p>
<p>  password: "tal"</p>
<p>  regular user:</p>
<p>  name: "refael"</p>
<p>  password: "123456"</p>
<p>7) Explanation of the file - max_ids_file_name.txt :</p>
<p>  In this file we update our unique id&apos;s for users, posts and messages.</p>
<p></p>
<p>EX3:</p>
<p>1. user can create few tokens, but once logout we blakcedlist the email so all tokens regarding that email will be blocked.</p>
<p>2. In our social media the "name" is unique.</p>
<p>3. The top bar in component in each page validat the token-cookie every X seconds.</p>
<p>4. user can send message only to active user.</p>
<p>5. once user deleted, suspended, useing invalid or expired token- will redirect to login page</p>
<p>6. for some pages we use local storage to save the user name to reduce the number of API calls and for practice.</p>
<p>7. We redirect the landig page 'localhost:2718/' to localhost:2718/login.html</p>
<p>8. The Root can reach out to resgular home page (not an admin page) just from the url by changing the URL to http://localhost:2718/home-page.html 
<p>9. Root moved to admin-page after login </p>    
<p>10. In Messages page when recived a message, we pop an alert and after that update the page with the new message </p>
<p> when client log out and back to home login he will redirect to login page in few seconds. </p>
<p>to start please: please move to the project folder ~ npm install ~  and than ~ "node index" ~ http://localhost:2718/</p>  
</p>
<p></p>
                            </div>
                        </div>
                       
                    </div >
                   
                </div>
            </div>
        );
    }
  }
  