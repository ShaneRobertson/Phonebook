require("dotenv").config()
const {Client} = require('pg')
const {KEY, USER} = process.env
 

const DB_URL = 
process.env.DATABASE_URL ||
 `postgres://${USER}:${KEY}@localhost:5432/phonebook`

const client = new Client(DB_URL);

async function insertUser(username, password, email){
    try {
        const {rows} = await client.query(`
            INSERT INTO users (username, password, email)
            VALUES($1, $2, $3) 
            RETURNING *;
        `, [username, password, email])
        console.log(rows)
        return rows
    } catch (error) {
        throw error
    }
}

async function insertContact(first_name, last_name, phone_number, email, business, image){
    try{
        const {rows} = await client.query(`
            INSERT INTO contact (first_name, last_name, phone_number, email, business, image)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [first_name, last_name, phone_number, email, business, image])
        console.log('insertContact rows: ', rows)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = {
    client,
    insertUser,
    insertContact
};