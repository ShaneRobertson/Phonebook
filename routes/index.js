//require("dotenv").config()
const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { privateKey } = process.env;

const { getUser, getContactById} = require("../db");

apiRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log("req.body password: ", password);

  try {
    const user = await getUser(username);
    if (user) {
      if (user.password === password) {
        console.log("this is the logged in user: ", user);
        jwt.sign({ user }, privateKey, { expiresIn: "1day" }, (err, token) => {
          if (err) {
            console.log("error from jwt: ", err);
            res.send(err);
          } else {
            console.log("token?: ", token);
            res.json({ user, token });
          }
        });
      } else {
          res.send({passwordError: 'Invalid password error'})
      }
    } else {
      res.send({usernameError: "Invalid username error"
    });
    }
  } catch (error) {
    console.log("routes error: ", error);
  }
});

apiRouter.get('/contacts/:id', async (req, res, next) => {
    const {id} = req.params
    console.log('the id in the routes: ', id)
try{
    const contacts = await getContactById(id)
    res.send(contacts)
} catch (error){
    throw error
}
})

module.exports = apiRouter;
