import axios from "axios";

export async function loginUser(username, password) {
  const userObj = { username, password };
  console.log('userObj in api: ', userObj)
  try {
    const { data } = await axios.post("/api/login", userObj);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getContacts(id){
try{

  const {data} = await axios.get(`/api/contacts/${id}`)
  console.log('the data:' , data)
  return data
} catch (error){
  console.log('get contacts error: ', error)
  throw error
}
}
