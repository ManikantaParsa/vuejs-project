const mysql = require("mysql2/promise");
const config = require("./db_config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  const [results] = await connection.execute(sql, params);
  await connection.close();
  return results;
}

module.exports = {
  query,
};
