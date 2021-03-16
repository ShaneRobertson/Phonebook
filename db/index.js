require("dotenv").config();
const { Client } = require("pg");
const { KEY, USER } = process.env;

const DB_URL =
  process.env.DATABASE_URL ||
  `postgres://${USER}:${KEY}@localhost:5432/phonebook`;

const client = new Client(DB_URL);

async function insertUser(username, password, email) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO users (username, password, email)
            VALUES($1, $2, $3) 
            RETURNING *;
        `,
      [username, password, email]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function insertContact(
  first_name,
  last_name,
  phone_number,
  email,
  business,
  image,
  user_id,
  is_favorite
) {
  if (!is_favorite) {
    is_favorite = false;
  }
  try {
    const { rows } = await client.query(
      `
            INSERT INTO contact (first_name, last_name, phone_number, email, business, image, user_id, is_favorite)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `,
      [
        first_name,
        last_name,
        phone_number,
        email,
        business,
        image,
        user_id,
        is_favorite,
      ]
    );
    console.log("insertContact rows: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUser(username) {
  try {
    console.log("the username: ", username);
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE username=$1;
        `,
      [username]
    );
    console.log("the user in the db: ", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getContactById(id) {
  console.log("the id in the db: ", id);
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM contact
            WHERE user_id=$1;
        `,
      [id]
    );
    console.log("the contacts/rows: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPersonalContacts(id) {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM contact
            WHERE user_id=$1 AND business=false;
        `,
      [id]
    );
    console.log("the rows/personalContacts: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getBusinessContacts(id) {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM contact
            WHERE user_id=$1 AND business=true;
        `,
      [id]
    );
    console.log("the rows/businessContacts: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateContact(contact_id, user_id, fields) {
    await addRemoveFromFavorites(user_id, contact_id, fields.is_favorite)
    
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        const {rows} = await client.query(`
            UPDATE contact
            SET ${setString}
            WHERE contact_id=${contact_id}
            RETURNING *;            
        `, Object.values(fields))
        console.log('the rows from update', rows)
        return rows
    } catch (error) {
        throw error
    }
}

async function addRemoveFromFavorites(contact_id, user_id, is_favorite){
    if(is_favorite) {
      await client.query(`
      INSERT INTO favorites(user_id, contact_id)
      VALUES ($1, $2);
      `, [user_id, contact_id])
    } else {
        await client.query(`
        DELETE FROM favorites
        WHERE contact_id=$1;
        `, [contact_id])
    }
}

module.exports = {
  client,
  insertUser,
  insertContact,
  getUser,
  getContactById,
  getPersonalContacts,
  getBusinessContacts,
  updateContact
};
