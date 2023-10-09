const db = require('../util/database');
const mysql = require('mysql2');

// Obtener todos los reportes
exports.fetchAll = async () => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM reports');
        return rows;
    } catch (error) {
        console.error(error);
    }
};

// Agregar un nuevo reporte
exports.addReport = async (reportData) => {
    try {
        const result = await db.execute('INSERT INTO reports SET ?', [reportData]);
        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = class Report {
    static fetchData() {
        return db.execute('SELECT * FROM leads');
    }
};