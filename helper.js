const db = require("./services/db");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * listPerPage;
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
    emptyOrRows,
    getOffset,
};
