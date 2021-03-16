const { client, insertUser, insertContact } = require("./index.js");

async function buildDatabase() {
  try {
    client.connect();
    console.log("Starting to drop tables..");
    await client.query(`
      DROP TABLE IF EXISTS favorites;
      DROP TABLE IF EXISTS contact;
      DROP TABLE IF EXISTS users;
         `);
    console.log("Finished dropping tables.");
    console.log("Building tables..");
    await client.query(`
            CREATE TABLE users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                password VARCHAR(25) NOT NULL,
                email VARCHAR(60),
                UNIQUE(username, password)
            );

            CREATE TABLE contact(
                contact_id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50),
                phone_number VARCHAR(15) NOT NULL,
                email VARCHAR(60),
                business BOOLEAN DEFAULT false,
                image TEXT,
                user_id INTEGER REFERENCES users(user_id),
                is_favorite BOOLEAN DEFAULT false,
                UNIQUE(phone_number)
            );

            CREATE TABLE favorites(
                user_id INTEGER REFERENCES users(user_id),
                contact_id INTEGER REFERENCES contact(contact_id)
            );
        `);
  } catch (error) {
    throw error;
  }
}

async function initialData() {
  try {
    console.log("Createing initial data..");
    console.log("Creating users..");
    const user1 = await insertUser(
      "shane",
      "password123",
      "something@gmail.com"
    );
    const user2 = await insertUser(
      "marcy",
      "password456",
      "somethingelse@yahoo.com"
    );
    console.log("Finished creating users.");
    console.log("Createing contacts");
    const contact1 = await insertContact(
      "Zitella",
      "Dillway",
      "878-729-9890",
      "zdillway0@mtv.com",
      false,
      "http://dummyimage.com/121x115.bmp/dddddd/000000",
      1,
      true
    );
    const contact2 = await insertContact(
      "Trefor",
      "Gibbs",
      "169-430-6137",
      "tgibbs1@networkadvertising.org",
      false,
      "http://dummyimage.com/184x125.bmp/ff4444/ffffff",
      1
    );
    const contact3 = await insertContact(
      "Dyann",
      "Amber",
      "879-920-6765",
      "damber2@godaddy.com",
      true,
      "http://dummyimage.com/226x160.jpg/cc0000/ffffff",
      1,
      true
    );
    const contact4 = await insertContact(
      "Starr",
      "Jozef",
      "212-167-1584",
      "sjozef3@weibo.com",
      true,
      "http://dummyimage.com/227x143.png/ff4444/ffffff",
      1
    );
    const contact5 = await insertContact(
      "Elmer",
      "Massey",
      "418-519-6195",
      "emassey4@zdnet.com",
      false,
      "http://dummyimage.com/146x135.jpg/dddddd/000000",
      1
    );
    const contact6 = await insertContact(
      "Pasquale",
      "McGraffin",
      "165-688-2965",
      "pmcgraffin5@arizona.edu",
      false,
      "http://dummyimage.com/156x231.png/5fa2dd/ffffff",
      1
    );
    const contact7 = await insertContact(
      "Zach",
      "Ramstead",
      "964-388-0978",
      "zramstead6@washington.edu",
      true,
      "http://dummyimage.com/234x159.bmp/dddddd/000000",
      2
    );
    const contact8 = await insertContact(
      "Luciano",
      "Colaton",
      "518-122-3263",
      "lcolaton7@independent.co.uk",
      true,
      "http://dummyimage.com/168x197.bmp/dddddd/000000",
      2,
      true
    );
    const contact9 = await insertContact(
      "Dawna",
      "Scarborough",
      "846-425-3577",
      "dscarborough8@feedburner.com",
      false,
      "http://dummyimage.com/212x146.jpg/dddddd/000000",
      2
    );
    const contact10 = await insertContact(
      "Angela",
      "Caress",
      "327-224-0543",
      "acaress9@mapquest.com",
      false,
      "http://dummyimage.com/186x211.bmp/dddddd/000000",
      2
    );
    console.log("Finished createing contacts");
    console.log("Finished creating initial data");
  } catch (error) {
    throw error;
  }
}

buildDatabase()
  .then(initialData)
  .catch(console.error)
  .finally(() => client.end());
