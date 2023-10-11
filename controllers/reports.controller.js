const ReportsModel = require('../models/reports.model');
const bcrypt = require('bcryptjs');


exports.getReport = async (request, response, next) => {
    try {
        const reports = await ReportsModel.fetchAll();
        response.render('leads/report.ejs', { reports: reports });
    } catch (error) {
        console.error(error);
    }
};

exports.postReport = async (request, response, next) => {
    try {
        const reportData = {
        };
        await ReportsModel.addReport(reportData);
        response.redirect('/reports');
    } catch (error) {
        console.error(error);
    }
};


exports.getLeads = async (request, response, next) => {
    
    try{
        const leads = ReportsModel.fetchLeads();
        response.render('leads/report.ejs', {leads: leads});
    }catch(error){
        console.error(error);
        response.status(404).json({message: 'Error al obtener los leads'});
    }
};

exports.getLeadsData = async (request, response, next) => {
    try{
        const leadsData = await ReportsModel.fetchLeads();
        response.json(leadsData);
    }catch(error){
        console.error(error);
        response.status(500).json({message: 'Error al obtener los leads'});
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


// Obtener todos los reportes
exports.fetchAll = async () => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM leads');
        return rows;
    } catch (error) {
        console.error(error);
    }
};