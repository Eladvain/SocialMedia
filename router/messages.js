const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const fs = require('fs');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require("./auth");
const utills = require("../Utills");
const models = require("../models/Models");

async function send_message(req,res)
{
    const user = res.locals.user;
    const id_of_recieve_user = parseInt(req.body.send_to);
    const text_message = req.body.text;
    const user_exist = await utills.check_if_user_is_exist_by_filter("id" ,id_of_recieve_user);
    if(user_exist)
    {
      const id_message = await utills.get_max_id(utills.max_id_dict.message);
      let new_message = new models.Message(text_message, id_of_recieve_user,
                                          user.id, id_message);                                                                   
      const all_messages = await utills.read_from_file(utills.constants_dict.messages_file_name)
      all_messages.push(new_message);
      await utills.write_to_file(utills.constants_dict.messages_file_name, all_messages)
      res.send({msg:new_message,
                status:"message send succesfully"});
    }
    else
    {
      res.status(StatusCodes.FORBIDDEN);
      res.send({msg:"Recieved user isn't exist"});
    }
}

async function get_message_by_user_id(req, res) {
  const user = res.locals.user;
  const user_id = user.id;
  const all_messages = await utills.read_from_file(utills.constants_dict.messages_file_name);
  const my_messages =  all_messages.filter(message => { return message.id_dest_user === user_id });
  res.send({msg:"All messages that you have been sent and recived ",
            all_messages: my_messages,
            count: Object.keys(my_messages).length})
}

router.post("/send", auth.authenticate_token, utills.get_user_by_email_middleware, (req,res)=>{send_message(req,res)})
router.get("/my-message", auth.authenticate_token, utills.get_user_by_email_middleware, (req,res)=>{get_message_by_user_id(req,res)})

module.exports = {router, send_message, get_message_by_user_id};