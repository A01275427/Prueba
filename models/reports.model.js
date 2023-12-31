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

    static fetchLeadColumns() {
        return db.execute('SHOW COLUMNS FROM leads').then(([results]) => {
            return results.map(row => row.Field);
        });
    }

}



