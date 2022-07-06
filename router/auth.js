const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const fs = require('fs');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const users = require("./users.js");
const utills = require("../Utills");
const models = require("../models/Models");
const { Console } = require('console');
const { STATUS_CODES } = require('http');



const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}

async function logout_user(req, res) {
	  
	const token = (req.headers.cookie?.split("="))[1];
	let user_email_recived;
	jwt.verify(token, utills.SECRET, async (err, user_email)=>{
		if (err) {
			res.status(StatusCodes.FORBIDDEN);
			res.send(
				{
					msg: "invalid token. please log in again!",
					status_code: StatusCodes.FORBIDDEN,
					Error_name: err.name
				});
			return;
		}
		if (typeof user_email !== 'undefined')
		{
			user_email_recived = user_email['user_email'];
		} else { 
			res.status(StatusCodes.FORBIDDEN);
			res.send(
				{
					msg: "invalid token. please log in again!",
					status_code: StatusCodes.FORBIDDEN,
					Error_name: err.name
				});
			return;
		}
	});
	let black_list = await utills.read_from_file(utills.constants_dict.black_list_file_name);
	black_list.push(user_email_recived);
	await utills.write_to_file(utills.constants_dict.black_list_file_name, black_list);
	res.send({msg:`User With Email ${user_email_recived} Logout Successfully`});
}

async function clean_email_From_black_list(user_loged_in_email) {
	const black_list = await utills.read_from_file(utills.constants_dict.black_list_file_name);
	const new_black_list = black_list.filter(email => email !== user_loged_in_email);
	await utills.write_to_file(utills.constants_dict.black_list_file_name, new_black_list);
}

async function login_user(req,res)
{
	let users = await utills.read_from_file(utills.constants_dict.user_file_name);
	login_user_continue(users, req, res);
}
async function login_user_continue(users,req,res)
{
	const user = users.find(user=>user.name == req.body.name);
	if(typeof user ==='undefined')
	{
		res.status(StatusCodes.FORBIDDEN).send({ msg:'Cannot find user'});
		return;
	}
	if(user.status === "deleted")
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send({msg:"You deleted by admin allready and cann't login"});
		return;
	}
	if(user.status === "created")
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send({msg:"You have to wait for the admin approval for the registration application"})
		return;
	}
	if(user.status === "suspended")
	{
		res.status(StatusCodes.FORBIDDEN);
		res.send({msg:"The admin suspended you"})
		return;
	}
	try{
	   let resp = await bcrpyt.compare(req.body.password, user.password);
		  if(resp == true)
		  { 
			const user_email = user.email;
			const token = jwt.sign({ user_email }, "secret", { expiresIn: "1d" });
			//res.send({token: JSON.stringify(token)});
			//save a flage for the local cookie
			const token_string = "access_token=" + token;
			await clean_email_From_black_list(user_email);  
			res.setHeader('Set-Cookie', token_string +"; path=/") // create a cookie in the browser
			res.send({token:token,
			          msg:"You sign in"});	 
		   } 
		  else{
				res.status(StatusCodes.FORBIDDEN);
				res.send({ msg: "Error password is not valid" });
				return;
			}
			
	} catch (err) {
		console.log("Error in Auth", err);
		res.status( StatusCodes.BAD_REQUEST );
	}	
}




async function authenticate_token(req, res, next)
{
	const cookieHeader_pair = (req.headers.cookie?.split("="));
	if (typeof cookieHeader_pair !== 'undefined' && cookieHeader_pair[0] !== 'access_token' || typeof cookieHeader_pair === 'undefined') {
		res.status(StatusCodes.FORBIDDEN);
		res.send({ msg: "please login" });
		return;
	}
	const token = cookieHeader_pair[1];

	let user_data_from_jwt;
	try{	
		if (typeof token == 'undefined') {
			res.status(StatusCodes.FORBIDDEN);
			return res.send({msg:"Invalid token, please try login to get new token"});
	}

	let black_list = await utills.read_from_file(utills.constants_dict.black_list_file_name);
		if(token in black_list){
			res.status(StatusCodes.FORBIDDEN);
			res.send({msg:"The token is expired, please login again to get a new token"});
			}
		jwt.verify(token, "secret", async (err, user_email) => {
			if (err) {
				res.status(StatusCodes.FORBIDDEN);
				return res.send(
					{
						msg: "invalid token. please log in again!",
						status_code: StatusCodes.FORBIDDEN,
						Error_name: err.name
					});
			}
			res.locals.user_email = user_email.user_email;
				
			if (typeof user_email !== 'undefined') {
				let is_suspended_user = await utills.check_user_suspention(user_email.user_email);
				if (is_suspended_user) {
					res.status(StatusCodes.FORBIDDEN);
					res.send({ msg: "The admin suspended/deleted you" });
				}
			}
				
			next();
		});
	}catch(err){
		res.status(StatusCodes.FORBIDDEN);
		res.send({msg: err.name, Error: "token invalid"})
	}
}

async function authenticate_token_for_admin(req, res, next)
{
	const cookieHeader_pair = (req.headers.cookie?.split("="));
	if (typeof cookieHeader_pair !== 'undefined' && cookieHeader_pair[0] !== 'access_token' || typeof cookieHeader_pair === 'undefined') {
		res.status(StatusCodes.FORBIDDEN);
		res.send({ msg: "please login" });
		return;
	}
	const token = cookieHeader_pair[1];
	if (typeof token == 'undefined') { return res.status(StatusCodes.BAD_REQUEST); }
	
	let root_email_from_jwt;
	jwt.verify(token,"secret", async(err,root_email)=>
	{
		if (err) {
			res.send(
				{msg:"invalid token. please log in again!",
				status_code:StatusCodes.BAD_REQUEST,
					 Error_name: err.name
				});
			return;
		}
		if(typeof root_email['user_email'] === 'undefined')
		{
			res.status(StatusCodes.FORBIDDEN);
			res.send({ msg: "You are not authenticated" });
		}
		
		root_email_from_jwt = root_email['user_email'];
		
		const root_user = await utills.get_user_by_email(root_email_from_jwt);
		if (typeof root_user === 'undefined' || root_user.id !== 1)
		{
			res.status(StatusCodes.FORBIDDEN);
			res.send(
				{msg:"You are triyng to reach admin route"});
			return;
		}
		next();
	})	
}

function ovrride_token(res) {
	const token_string = "access_token=" + "empty_token";
	res.setHeader('Set-Cookie', token_string +"; path=/")
}


async function singin(req, res)
{
	try
	{
		let usersDict = await utills.read_from_file(utills.constants_dict.user_file_name);
		const name = req.body.name;
		const email = req.body.email;
		if (!name)
		{
			res.status( StatusCodes.BAD_REQUEST );
			res.send({msg:"Missing name in request"})
			return;
		}
		if (name === "Root") {
			res.status( StatusCodes.BAD_REQUEST );
			res.send({msg:"can't create new Root, only one can exist in the system"})
			return;
		}
		const is_exist_by_name = await utills.check_if_user_is_exist_by_filter("name", name);
		if (is_exist_by_name) {
			res.status( StatusCodes.BAD_REQUEST );
			res.send({ msg: `the user ${name} already exist, please try with another name` });
			return;
		}
		const is_exist = await utills.check_if_user_is_exist_by_filter("email",email);	
		if(is_exist){
			res.status(StatusCodes.FORBIDDEN);
			res.send({msg:`Email ${email} already exists, please try again`});
			return;
		}else{
			let pas = await bcrpyt.hash(req.body.password, 10);
				// Find max id 
			const max_id_user = await utills.get_max_id(utills.max_id_dict.user);
			let new_user = new models.User(name, email, pas, max_id_user)							 
			usersDict.push(new_user);
			await utills.write_to_file(utills.constants_dict.user_file_name, usersDict);  
			ovrride_token(res);
			res.send({user:new_user.toString(),
				 msg :"user created"}).status(StatusCodes.OK);
			}
	}catch(error){
		res.status( StatusCodes.BAD_REQUEST );
	}
}


// true - valid token and active user 
// false - invalid token or suspended user 
async function verify_token(req, res) {
	let retVal;
	const token = req.headers?.cookie?.split("=")[1];

	if (typeof token !== 'undefined') { // checking if token cookie with token exists
		let user_email_from_jwt;
		jwt.verify(token, "secret", async (err, user_email) => {
			if (err) { return false; }
			user_email_from_jwt = user_email["user_email"];
		});

		//
		const user_lists = await utills.read_from_file(utills.constants_dict.user_file_name);
		const wanted_user = user_lists.filter(user => user.email === user_email_from_jwt);
		if (wanted_user.length === 0 || wanted_user[0].status !== "active") { return res.send({ valid_token: false }); }
		// check if the token in the blak list if does - send 400 
		const black_list = await utills.read_from_file(utills.constants_dict.black_list_file_name);
		if (black_list.includes(user_email_from_jwt) ) {
			res.send({ valid_token: false }).status(400);
			return;
		} else {
			res.send({ valid_token: true, user_id:wanted_user[0].id });
			return;
		}
		res.send({ valid_token: false }).status(400);
		return;
	} else {
		res.send({ valid_token: false }).status(400);
		return;
	}
}


router.get('/verify-token',utills.get_user_by_email_middleware , (req,res)=>{verify_token(req,res)})
router.post('/logout', authenticate_token,utills.get_user_by_email_middleware, (req,res)=>{logout_user(req,res)})
// The only requests that isn't authnticated
router.post('/signin', (req, res) => { singin(req, res )});
router.post('/login', (req, res) => { login_user(req, res) });


router.use( set_content_type );
module.exports = {router, authenticate_token, authenticate_token_for_admin, singin, verify_token};

