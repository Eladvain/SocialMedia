class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem("user_name")
        };
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(TopBar, { classNane: "tobBar", user_name: this.state.user_name, secure_with_token: true }),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "about_us_background" },
                    React.createElement(
                        "h1",
                        null,
                        "About Us (Readme)"
                    ),
                    React.createElement(
                        "div",
                        { className: "container" },
                        React.createElement(NavBar, { className: "navBar" }),
                        React.createElement(
                            "div",
                            { className: "readme_text" },
                            React.createElement(
                                "p",
                                null,
                                "Date : 19/02/22"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "Name : Exercise 3 in JS Course - Social Network ."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "Submitters : Refael Doron  311819372  Refaelr93@gmail.com  "
                            ),
                            React.createElement(
                                "p",
                                null,
                                " Elad Vainberg  312492689  eladvainberg@gmail.com"
                            ),
                            React.createElement("p", null),
                            React.createElement(
                                "p",
                                null,
                                "From EX2:"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "Comments :"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "1) In order to run our code you will use the following command - npm run devStart."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "2) Note that we submitted the task to you so that you can first run it in postman for the first time. If for some reason you want to run postman again you must clean the following files:"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  a.-users.TXT; must be wite at list Root user."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  b. message.txt; must be : []"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  c. BlackList.txt; must be : "
                            ),
                            React.createElement(
                                "p",
                                null,
                                "3) We used an external directory called ;JWT; so that we could give each user a token with which we could identify that the API request was indeed with the appropriate permission."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  In addition, we managed our own blackList, so that every time a user logs out of the system, the token enters this list and with its help we know later if there is a permit for the following api requests."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "4) Another external directory we used is a ;bcrypt;. We used this directory in order to hash user's password and to save not his really password in the server. This directory helps us manage"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  passwords of users in our system."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "5) Our system consist of 6 routes :"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  a. index - This is our base router. His job is to route the requests to the following routers."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  b. auth - His responsibility is on sign in, Log in and Log out of users."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  c. users"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  d. post"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  e. message "
                            ),
                            React.createElement(
                                "p",
                                null,
                                "6) Details of admin for login :"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  name: \"Root\""
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  password: \"tal\""
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  regular user:"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  name: \"refael\""
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  password: \"123456\""
                            ),
                            React.createElement(
                                "p",
                                null,
                                "7) Explanation of the file - max_ids_file_name.txt :"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "  In this file we update our unique id's for users, posts and messages."
                            ),
                            React.createElement("p", null),
                            React.createElement(
                                "p",
                                null,
                                "EX3:"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "1. user can create few tokens, but once logout we blakcedlist the email so all tokens regarding that email will be blocked."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "2. In our social media the \"name\" is unique."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "3. The top bar in component in each page validat the token-cookie every X seconds."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "4. user can send message only to active user."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "5. once user deleted, suspended, useing invalid or expired token- will redirect to login page"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "6. for some pages we use local storage to save the user name to reduce the number of API calls and for practice."
                            ),
                            React.createElement(
                                "p",
                                null,
                                "7. We redirect the landig page 'localhost:2718/' to localhost:2718/login.html"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "8. The Root can reach out to resgular home page (not an admin page) just from the url by changing the URL to http://localhost:2718/home-page.html",
                                React.createElement(
                                    "p",
                                    null,
                                    "9. Root moved to admin-page after login "
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "10. In Messages page when recived a message, we pop an alert and after that update the page with the new message "
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    " when client log out and back to home login he will redirect to login page in few seconds. "
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "to start please: please move to the project folder ~ npm install ~  and than ~ \"node index\" ~ http://localhost:2718/"
                                )
                            ),
                            React.createElement("p", null)
                        )
                    )
                )
            )
        );
    }
}