Date : 19/02/22
Name : Exercise 3 in JS Course - Social Network .
Submitters :  Refael Doron    311819372   Refaelr93@gmail.com    
     	     Elad Vainberg   312492689   eladvainberg@gmail.com 

From EX2: 
Comments :
1) In order to run our code you will use the following command - npm run devStart.
2) Note that we submitted the task to you so that you can first run it in postman for the first time. If for some reason you want to run postman again you must clean the following files:
    a. "-users.TXT" must be : [{"id":1,"name":"Root","password":"$2b$10$P6uwN8YKnbqTutcxI0uYt.EZJXjBSm6iYnIc2Yeu2WKw2Fob2AFXW","status":"active","Posts":[],"creation":"Mon Dec 27 2021 18:30:23 GMT+0200 (Israel Standard         Time)"}]
    b. "message.txt" must be : []
    c. "BlackList.txt" must be : { }
3) We used an external directory called "JWT" so that we could give each user a token with which we could identify that the API request was indeed with the appropriate permission.
    In addition, we managed our own blackList, so that every time a user logs out of the system, the token enters this list and with its help we know later if there is a permit for the following api requests.
4) Another external directory we used is a "bcrypt".  We used this directory in order to hash user's password and to save not his really password in the server. This directory helps us manage 
    passwords of users in our system.
5) Our system consist of 6 routes :
     a. index -  This is our base router. His job is to route the requests to the following routers.
     b. auth - His responsibility is on sign in, Log in and Log out of users. 
     c. users
     d. post
     e. message  
6) Details of admin for login :
     "name" : "Root"
     "password" : "tal"
7) Explanation of the file - max_ids_file_name.txt : 
    In this file we update our unique id's for users, posts and messages.

EX3:
1. user can create few tokens, but at logout we blakcedlist the email so all tokens regarding that email will be blocked.
2. In our social meda the "name" is unique.
3. The top bar in component in each page validat the token-cookie.
4. user can send message only to active user.
5.  once user deleted, suspended, useing invalid or expired token- will redirect to login page
6. for some pages we use local storage to save the user name to reduce the number of API calls and for practice.
7. We redirect the landigpage localhost:2718/ to localhost:2718/login.html
8. 


