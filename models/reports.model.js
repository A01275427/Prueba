const db = require('../util/database');
const mysql = require('mysql2');

module.exports = class ReportsModel{

    constructor(leads){
        this.leads = leads;
    }

    save(){
        return db.execute('INSERT INTO leads(leads) VALUES (?)'
        [this.leads]);
    }

    static fetchAll(){
        return db.execute('SELECT phone, stage FROM leads');
    }


}
