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

    static fetchLeads(){
        return db.execute('SELECT value, gain FROM leads');
    }

    static deleteCSVData() {
        // Suponiendo que los datos del CSV se almacenan en una tabla llamada 'csv_data'
        return db.execute('DELETE FROM leads');
    }
    


}
