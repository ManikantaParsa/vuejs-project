const db = require("../db");
const helper = require("../helper");
async function saveData(data) {
    const query = 'INSERT INTO `table_data` (`title_name`, `designation`, `status`) VALUES (?, ?, ?)';
    const values = [data.title, data.designation, data.status];

    try {
        const result = await db.query(query, values);
        return result.insertId;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

async function updateData(id, data) {
    const query = 'UPDATE `table_data` SET `title_name` = ?, `designation` = ?, `status` = ? WHERE `sno` = ?';
    const values = [data.title, data.designation, data.status, id];

    try {
        await db.query(query, values);
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function getData() {
    const rows = await db.query('SELECT * FROM table_data ORDER BY sno ASC');
    const data = helper.emptyOrRows(rows);
    return { data };
}
async function deleteData(id) {
    const query = 'DELETE FROM `table_data` WHERE `sno` = ?';
    const values = [id];

    try {
        await db.query(query, values);
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

module.exports = {
    deleteData,saveData, updateData, getData,  };