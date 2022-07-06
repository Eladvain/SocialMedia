const max_ids_file_name = "max_ids_file_name.txt";

const { promise } = require('bcrypt/promises');
const { promises: fs } = require('fs');
const { dirname } = require('path');

const constants_dict ={
  "user_file_name": "-users.TXT",
  "max_id_file_name": "max_ids_file_name.txt",
  "black_list_file_name": "BlackList.txt",
  "messages_file_name": "message.txt"
}

const max_id_dict ={
  "user": "max_id_user",
  "message": "max_id_message",
  "posts": "max_id_post"

}

const SECRET = "secret"

async function write_to_file(path_file, data)
{
	  await fs.writeFile(__dirname +'\\'+ path_file, JSON.stringify( data) , {
		encoding: 'utf8'
	  });
    return; 
} 

 async function read_from_file(path_file)
{
	const data = await fs.readFile(__dirname+'\\' + path_file);
  const new_data = JSON.parse(data); 
	return new_data; 
}

async function file_exists (path) {  
  try {
    await fs.access(__dirname + '\\'+ path)
    return true
  } catch {
    return false
  }
}

async function initialize_max_ids_from_file()
{
  const exists = await file_exists(max_ids_file_name);
  if(exists){
    await read_from_file(max_ids_file_name).then(data=>{map_ids = data;}),
    error=>{console.log("fail to read "+ max_ids_file_name);}
  }
}

async function get_max_id(type)
{
     const map_ids = await read_from_file(constants_dict.max_id_file_name);
      map_ids[type] = map_ids[type]+1;
      await write_to_file(constants_dict.max_id_file_name, map_ids);
      return map_ids[type];
}

async function check_if_user_is_exist_by_filter(user_field, user_details) 
{
    const users = await read_from_file(constants_dict.user_file_name);
    let user = users.filter(user => {return user[user_field] === user_details})[0];
    user_exist = (typeof user !='undefined')? true : false;
    return user_exist;
}

async function check_user_suspention(user_email){
  let result = false;
  const users_list = await read_from_file(constants_dict.user_file_name);
  if(typeof users_list !== 'undefined'){
    const wanted_user = users_list.filter(user => { return user.email === user_email})
    if (typeof wanted_user !== 'undefined'){
        result = (wanted_user[0].status === 'suspended' || wanted_user[0].status === 'deleted');
    }
  }
  return result;
} 


async function get_user_by_email(user_email) {
  const user_list = await read_from_file(constants_dict.user_file_name);
  const wanted_user_list = user_list.filter(user => { return user.email === user_email; });
  return wanted_user_list[0];
}

async function get_user_by_email_middleware(req, res, next) {
  user_email = res.locals.user_email;
  const user_list = await read_from_file(constants_dict.user_file_name);
  const wanted_user_list = user_list.filter(user => { return user.email === user_email; });
  res.locals.user =  wanted_user_list[0];
  next();
}

async function get_user_name_by_id(user_id) {
  const user_list = await read_from_file(constants_dict.user_file_name);
  const wanted_user_list = await user_list.filter(user => { return user.id === user_id; });
  return wanted_user_list[0];

}


module.exports = {write_to_file, read_from_file, file_exists, initialize_max_ids_from_file,
                   get_max_id, check_if_user_is_exist_by_filter, constants_dict, max_id_dict, check_user_suspention, get_user_by_email, get_user_by_email_middleware, SECRET, get_user_name_by_id};