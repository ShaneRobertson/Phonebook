//require("dotenv").config()
const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { privateKey } = process.env;

const {
  getUser,
  getContactById,
  getPersonalContacts,
  getBusinessContacts,
  updateContact,
} = require("../db");


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
        res.send({ passwordError: "Invalid password error" });
      }
    } else {
      res.send({ usernameError: "Invalid username error" });
    }
  } catch (error) {
    console.log("routes error: ", error);
  }
});

apiRouter.get("/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("the id in the routes: ", id);
  try {
    const contacts = await getContactById(id);
    res.send(contacts);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/personal/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const personalContacts = await getPersonalContacts(id);
    res.send(personalContacts);
  } catch (error) {
    throw error;
  }
});

apiRouter.get("/business/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const businessContacts = await getBusinessContacts(id);
    res.send(businessContacts);
  } catch (error) {
    throw error;
  }
});

apiRouter.patch("/update", async (req, res, next) => {
  const {
    contact_id,
    user_id,
    first_name,
    last_name,
    phone_number,
    email,
    business,
    image,
    is_favorite,
  } = req.body;

  const updateFields = {};
  updateFields.contact_id = contact_id
  
  updateFields.is_favorite = is_favorite;

  if (first_name) {
    updateFields.first_name = first_name;
  }
  if (last_name) {
    updateFields.last_name = last_name;
  }
  if (phone_number) {
    updateFields.phone_number = phone_number;
  }
  if (email) {
    updateFields.email = email;
  }
  if (business) {
    updateFields.business = business;
  }
  if (image) {
    updateFields.image = image;
  }

    

  try {
    const updatedContact = await updateContact(contact_id, user_id, updateFields);
    console.log("the updatedContact: ", updatedContact);
    res.send(updatedContact);
  } catch (error) {
    throw error;
  }
});
module.exports = apiRouter;
