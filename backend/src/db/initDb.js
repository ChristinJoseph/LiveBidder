const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

async function initDb() {
  
  const schemaPath = path.join(__dirname, "../../db/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  await pool.query(schema);
  console.log("Database schema ensured");
}

module.exports = initDb;