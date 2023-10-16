const db = require('../util/database');
const mysql = require('mysql2');


module.exports = class ReportsModel{

    constructor(leads){
        this.reportData = reportData;
    }

    save(){
        return db.execute('INSERT INTO reports SET ?', [this.reportData]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM reports');
    }
/*
    static fetchLeads(){
        return db.execute('SELECT value, gain FROM leads');
    }
*/
    static fetchLeads(columns = ['value', 'gain']) { // valores por defecto en caso de que no se seleccione ninguna columna
        const selectedColumns = columns.join(", ");
        return db.execute(`SELECT ${selectedColumns} FROM leads`);
    }    

    static fetchColumns() {
        return db.execute('SHOW COLUMNS FROM leads');
    }
    
}

exports.fetchColumns = async () => {
    try {
        const [rows, fields] = await db.execute('SHOW COLUMNS FROM leads');
        return rows;
    } catch (error) {
        console.error(error);
    }
};

