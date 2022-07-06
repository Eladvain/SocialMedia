const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const fs = require('fs');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const utills = require('../Utills');
const auth = require("./auth");

const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}



 async function list_users( req, res) 
 {
	const users = await utills.read_from_file(utills.constants_dict.user_file_name);
	list_users_continue(users, req, res);
}

function list_users_continue(users, req, res)
{
	let active_users = users.filter(user=>
	{
		if(typeof user.status != 'undefined')
		{
			// if(user.name !=="Root")
				return user.status === 'active';    
		}
	})
	active_users.forEach(user =>{delete user['password']});
	res.send({active_users:active_users,
				msg:"All active users returned"});	
}


async function whoami(req, res){

	const cookieHeader = req.headers?.cookie;
	const token = cookieHeader.split("=")[1];
	jwt.verify(token,"secret", async (err,user_email)=>
	{
		if (err) {
			return res.send(
				{msg:"invalid token. please log in again!",
				status_code:StatusCodes.BAD_REQUEST,
				Error_name: err.name});
		}
		const user_email_from_jwt = user_email['user_email'];
		const my_user = await utills.get_user_by_email(user_email_from_jwt);
		res.send({my_user})
	})
}



async function get_user( req, res )
{
	const useres = await utills.read_from_file(utills.constants_dict.user_file_name)
	get_user_continue(useres, req, res);
}

function get_user_continue(users, req, res)
{
	const id = parseInt(req.params.id);
	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send({msg:"Bad id given"}).status(StatusCodes.BAD_REQUEST)
		return;
	}
	const user =  users.find(user => user.id === id )
	if (!user)
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send({msg:"No such user"}).status(StatusCodes.BAD_REQUEST)
		return;
	}
	delete user['password']
	res.send({user:user,
	          msg:"Get user successfully"} );   
}

async function delete_user( req, res )
{
	const users = await utills.read_from_file(utills.constants_dict.user_file_name)
	delete_user_continue(users,req,res);
}

async function delete_user_continue(users,req,res)
{
	const id =  parseInt( req.params.id );
	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send({msg:"Bad id given"})
		return;
	}

	if ( id == 1)
	{
		res.status( StatusCodes.FORBIDDEN ); 
		res.send({msg:"Can't delete root user"})
		return;		
	}
	const idx =  users.findIndex(user => user.id == id )
	if ( idx < 0 )
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send({msg:"No such user"})
		return;
	}
	const user_id = users.findIndex(user => user.id === id);
	users[user_id].status = "deleted"
	await utills.write_to_file("-users.TXT", users);
	res.send({msg:"user deleted!"});   
}



router.get('/users', auth.authenticate_token, utills.get_user_by_email_middleware,  (req, res) => { list_users(req, res) })
router.get('/whoami', auth.authenticate_token, utills.get_user_by_email_middleware, (req, res) => { whoami(req, res )  } )
router.get('/user/(:id)', auth.authenticate_token, utills.get_user_by_email_middleware, (req, res) => {get_user(req, res)})
router.delete('/user/(:id)', auth.authenticate_token, utills.get_user_by_email_middleware, (req, res) => { delete_user(req, res )  })

router.use( set_content_type );
module.exports = router;