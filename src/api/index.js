import axios from "axios";

export async function loginUser(username, password) {
  const userObj = { username, password };
  console.log('userObj in api: ', userObj)
  try {
    const { data } = await axios.post("/api/login", userObj);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
