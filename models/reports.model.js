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
        return db.execute('SELECT company, gain FROM leads');
    }

    static fetchLeads1(){
        return db.execute('SELECT createdAt, value FROM leads');
    }

    
    static fetchLeads(columns = ['value', 'gain']) { // valores por defecto en caso de que no se seleccione ninguna columna
        const selectedColumns = columns.join(", ");
        return db.execute(`SELECT ${selectedColumns} FROM leads`);
    }    

    
}
