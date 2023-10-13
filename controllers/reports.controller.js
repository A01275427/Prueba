const ReportsModel = require('../models/reports.model');
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');



exports.getReport = async (request, response, next) => {
    try {
        const reports = await ReportsModel.fetchAll();
        response.render('leads/report.ejs', { 
            reports: reports,
            canUpload: request.canUpload,
            canConsultUsers: request.canConsultUsers,
            canConsultReports: request.canConsultReports,
            canDownloadPDF: request.canDownloadPDF,
        });
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
        const leads = await ReportsModel.fetchLeads();
        response.render('leads/report.ejs', {leads: leads[0]});
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

exports.downloadReportPDF = async (request, response, next) => {
    try {
        const leads = await ReportsModel.fetchLeads();
        // Aquí puedes generar tu gráfica usando los datos obtenidos

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // Renderiza la gráfica en la página
        await page.setContent(/* tu gráfica en formato HTML */);
        const pdf = await page.pdf({ format: 'A4' });

        response.contentType('application/pdf');
        response.send(pdf);

        await browser.close();
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error al generar el PDF' });
    }
};

/*
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
*/