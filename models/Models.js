//const utills = require("../Utills")

class User
{
  constructor(name, email, password, id){
    this.name = name;
    this.email = email;
    this.id = id;
    this.password = password;
    this.status = "created";
    this.date = Date();
    this.posts = [];
    //this.messages = [];
  }

  toString(){
    return {
      id: this.id,
      name: this.name,
      posts: this.posts
    }
  }
}

class Post
{
  constructor(text, user_name_id, writer_user_name, post_id)
  {
    this.text = text;
    this.user_name_id = user_name_id;
    this.writer_user_name = writer_user_name;
    this.post_id = post_id;
    this.date = Date();
  }
}

class Message
{
  constructor(text, id_dest_user, user_name_id, id_message)
  {
    this.text = text;
    this.id_dest_user = id_dest_user;
    this.id_from_user_name = user_name_id;
    this.message_id = id_message;
    this.date = new Date();
  }
}

module.exports = {Post, Message, User};


