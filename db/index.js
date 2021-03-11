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

async function insertContact(first_name, last_name, phone_number, email, business, image, user_id){
    try{
        const {rows} = await client.query(`
            INSERT INTO contact (first_name, last_name, phone_number, email, business, image, user_id)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [first_name, last_name, phone_number, email, business, image, user_id])
        console.log('insertContact rows: ', rows)
        return rows
    } catch (error) {
        throw error
    }
}

async function getUser(username){
    try {
        console.log('the username: ', username)
        const {rows: [user]} = await client.query(`
            SELECT * FROM users
            WHERE username=$1;
        `, [username])
        console.log('the user in the db: ', user)
        return user
    } catch (error) {
        throw error
    }
}

async function getContactById(id){
    console.log('the id in the db: ', id)
    try {
        const {rows} = await client.query(`
            SELECT * FROM contact
            WHERE user_id=$1;
        `, [id])
        console.log('the contacts/rows: ', rows)
        return rows
    } catch(error){
        throw error
    }
}

async function getPersonalContacts(id){
    try{
        const {rows} = await client.query(`
            SELECT * FROM contact
            WHERE user_id=$1 AND business=false;
        `, [id])
        console.log('the rows/personalContacts: ', rows)
        return rows
    } catch (error) {
        throw error
    }
}

async function getBusinessContacts(id){
    try{
        const {rows} = await client.query(`
            SELECT * FROM contact
            WHERE user_id=$1 AND business=true;
        `, [id])
        console.log('the rows/businessContacts: ', rows)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = {
    client,
    insertUser,
    insertContact,
    getUser,
    getContactById,
    getPersonalContacts,
    getBusinessContacts
};