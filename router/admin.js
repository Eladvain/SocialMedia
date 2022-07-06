const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const fs = require('fs');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require("./auth");
const utills = require("../Utills");
const models = require("../models/Models");
const messages = require("./messages");

async function get_all_users(req,res)
{
  const users = await utills.read_from_file(utills.constants_dict.user_file_name)  
  users.forEach(user =>{
    delete user['password'];
  })
  res.send({list_of_users:users,
            msg:"Get all users successfully"});
}

async function get_all_suspended_users(req,res)
{
  const users = await utills.read_from_file(utills.constants_dict.user_file_name);
  let suspended_users = users.filter(user=>user.status === "suspended");
  suspended_users.push(users[0]);
  res.send({list_of_suspended_users:suspended_users,
            msg: "Get all suspended users"
  });
  return;
}

async function get_all_created_users(req,res)
{
  const users = await utills.read_from_file(utills.constants_dict.user_file_name);
  let created_users = users.filter(user=>user.status === "created");
  created_users.push(users[0]);
  res.send({list_of_created_users:created_users,
    msg: "Get all created users"
  });
  return; 
}

async function get_all_posts(req,res)
{
  let users = await utills.read_from_file(utills.constants_dict.user_file_name);
  all_posts = [];
	users.forEach(user => {
	if(typeof user.posts != 'undefined')
	{
		all_posts_of_user = user.posts;
		all_posts = all_posts.concat(all_posts_of_user);
	}
	});
	res.send({all_Posts:all_posts,
    msg: "get all posts successfully"
  });
  return;
}

async function login_confirmation(req,res) 
{
  const id_of_user = parseInt(req.params.id);
  const user_exist = await utills.check_if_user_is_exist_by_filter("id", id_of_user)    
  if(user_exist)
  {
    let users = await utills.read_from_file(utills.constants_dict.user_file_name);
      
        let user_index = users.findIndex(curr_user=>{return	curr_user.id === id_of_user});
        users[user_index].status = "active";
        await utills.write_to_file(utills.constants_dict.user_file_name, users);
    res.send({
        user_activated: users[user_index],
        msg: "The login request has been approved by admin."
      });
    return;
    }
  else
  {
    res.status(StatusCodes.BAD_REQUEST);
    res.send({ msg: "user id isn't exist" });
    return; 
  }
}

async function update_to_deleted_suspended_or_active_user_mode(req,res)
{
  const new_user_mode = req.body.new_mode;
  const id_of_user = parseInt(req.params.id);
  let users = await utills.read_from_file(utills.constants_dict.user_file_name);
  let user_index = users.findIndex(curr_user=>{return	curr_user.id === id_of_user});
  if(await check_if_mode_is_possible(res, users[user_index], new_user_mode))
  {
    users[user_index].status = new_user_mode;
    await utills.write_to_file(utills.constants_dict.user_file_name, users);
    let user_res = delete users[user_index]['password'];
    user_res = delete users[user_index]['email'];
    res.status(StatusCodes.OK);
    res.send({
    user_new_status:users[user_index],
    msg:"The mode was changed."
    });
  }
}

async function check_if_mode_is_possible(res, user, new_user_mode)
{
    let is_possible = true;
    if(new_user_mode !== "active" && new_user_mode !== "suspended" && new_user_mode !== "deleted")
    {
     res.status(StatusCodes.BAD_REQUEST);
     res.send({msg:"This mode isn't valid"});
     return !is_possible;
    }
    if(user.status === new_user_mode)
    {
      res.status(StatusCodes.BAD_REQUEST);
      res.send({msg:"The user is already in this mode"});
      return !is_possible;
    }
    if(user.status === "created")
    {
      res.status(StatusCodes.FORBIDDEN);
      res.send({msg:"Because The admin has not yet approved the user's registration request,"+
                      " this request isn't possible"})
      return !is_possible;
    }
    if(user.status === "deleted")
    {
      res.send({msg:"This user deleted and not exist yet"});
      return !is_possible;
    }
    return is_possible;
}

async function delete_post(req,res)
{
  const id_of_post = parseInt(req.params.id);
  let users = await utills.read_from_file(utills.constants_dict.user_file_name);
  let index_of_user_for_remove_post =-1 , post_index_to_remove = -1;
  let user_index = 0;
  users.forEach(curr_user=>
    {
      let post_index = 0;
      if(typeof curr_user.posts !== 'undefined')
      {
        curr_user.posts.forEach(post=>
          {
            if(post.post_id === id_of_post)
            {
               index_of_user_for_remove_post = user_index;
               post_index_to_remove = post_index;
            }
            post_index++;
          })
      }
      user_index++;  
    })
    if(post_index_to_remove !== -1)
    {  
      users[index_of_user_for_remove_post].posts.splice(post_index_to_remove, 1);
      await utills.write_to_file(utills.constants_dict.user_file_name, users);
      res.send({ msg: "post deleted!" });
      return;
    }
    else
    {
      res.send({ msg: "Post id dosn't exist!" });
      return;
    }
}

async function send_message_to_all_users(req,res)
{
  let text_message = req.body.text;
  let all_messages_that_send = [];
  let new_id_message = await utills.get_max_id(utills.max_id_dict.message);
  const users = await utills.read_from_file(utills.constants_dict.user_file_name);
  users.forEach(user=>
  {
    if(user.id !== 1)
    {
      const new_message = new models.Message(text_message, user.id, 1,
                                            new_id_message);
      all_messages_that_send.push(new_message); 
      new_id_message = new_id_message + 1;
    }
  }) 
  new_id_message = new_id_message - 1;
  const max_id_dict = await utills.read_from_file(utills.constants_dict.max_id_file_name);
  max_id_dict[utills.max_id_dict.message] = new_id_message;
  await utills.write_to_file(utills.constants_dict.max_id_file_name, max_id_dict);                                                                     
  let all_messages = await utills.read_from_file(utills.constants_dict.messages_file_name);
  all_messages = all_messages.concat(all_messages_that_send);
  await utills.write_to_file(utills.constants_dict.messages_file_name, all_messages);
  res.send({all_messages_that_send:all_messages_that_send,
            msg:"All messages sent to all users",
            all_messages_that_send,
    count: Object.keys(all_messages).length - 1
  });    
  return;

}


async function get_id_by_user_name(req,res)
{
  const userName = req.body.user_name;
  const users = await utills.read_from_file(utills.constants_dict.user_file_name);
  let curr_user = users.filter(user=>user.name === userName);
  res.send({ id: curr_user.id });
  return; 
}

router.get("/users", auth.authenticate_token_for_admin, (req,res)=>{get_all_users(req,res)});
router.post("/user"), auth.authenticate_token_for_admin,  (req,res)=>{get_id_by_user_name(req,res)};
router.get("/createdUsers", auth.authenticate_token_for_admin, (req,res)=>{get_all_created_users(req,res)});
router.get("/suspendedUsers", auth.authenticate_token_for_admin,  (req,res)=>{get_all_suspended_users(req,res)});
router.get("/posts", auth.authenticate_token_for_admin,(req,res)=>{get_all_posts(req,res)});
router.post("/confirmation/(:id)", auth.authenticate_token_for_admin, (req,res)=>{login_confirmation(req,res)});
router.post("/mode/(:id)", auth.authenticate_token_for_admin,(req,res)=>
            {update_to_deleted_suspended_or_active_user_mode(req,res)});
router.delete("/post/(:id)", auth.authenticate_token_for_admin,  (req,res)=>{delete_post(req,res)});            
router.post("/message", auth.authenticate_token_for_admin,(req,res)=>{messages.send_message(req,res)});
router.post("/messages", auth.authenticate_token_for_admin, (req,res)=>{send_message_to_all_users(req,res)});

module.exports = router;