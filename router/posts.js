const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const fs = require('fs');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require("./auth");
const utills = require("../Utills");
const models = require("../models/Models");

async function create_post(req,res)
{
	const text = req.body.text;
	const user = res.locals.user;
	if( user.status !== "active"){
		res.send({msg:"Error! Only active user can create a new post."})
	}
	else{
		const id_post = await utills.get_max_id(utills.max_id_dict.posts);
		const new_post = new models.Post(text, user.id, user.name, id_post);
		const users = await utills.read_from_file(utills.constants_dict.user_file_name);
		const index = users.findIndex(item => { return item.id === user.id })
		users[index].posts.push(new_post);
		await utills.write_to_file(utills.constants_dict.user_file_name, users);
		res.send({post_details: new_post,
			msg:'post created successfully'})
	}
}

async function delete_post(req,res)
{
	const id_of_post = parseInt(req.params.id);
	const spec_user = req.user_data.user;
	const users = await utills.read_from_file(utills.constants_dict.user_file_name);
	const user = users.filter(item=>{return item.id === spec_user.id})[0];
	const user_index = users.findIndex(curr_user=>{return	curr_user.id === user.id})
	const post_index_to_remove = user.posts.findIndex(post=>{return post.post_id === id_of_post})
	if(post_index_to_remove === -1)
	{
		res.status(StatusCodes.BAD_REQUEST);
		res.send({msg:"Can't delete post. Please try again"});
		return;
	}
		users[user_index].posts.splice(post_index_to_remove, 1);
		await utills.write_to_file(utills.constants_dict.user_file_name, users);
		res.status(StatusCodes.OK);
		res.send({msg:"post deleted succesfully"});	 
}

async function display_all_posts (req,res)
{
	const users = await utills.read_from_file(utills.constants_dict.user_file_name);
	all_posts = [];
	users.forEach(user => {
	if(typeof user.posts != 'undefined')
	{
		all_posts_of_user = user.posts;
		all_posts = all_posts.concat(all_posts_of_user);
	}});
	res.send({all_Posts:all_posts,
				msg:"display all posts"});
}



router.post("/create", auth.authenticate_token, utills.get_user_by_email_middleware, (req,res)=>{create_post(req,res)});
router.delete("/delete/(:id)", auth.authenticate_token, utills.get_user_by_email_middleware,  (req,res)=>{delete_post(req,res)});
router.get("/posts", auth.authenticate_token, utills.get_user_by_email_middleware,  (req,res)=>{display_all_posts(req,res)});

module.exports = router;