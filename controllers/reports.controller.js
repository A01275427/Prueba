const ReportsModel = require('../models/reports.model');
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');
const db = require('../util/database');


exports.getReport = async (request, response, next) => {
    try {
        const reports = await ReportsModel.fetchAll();
        const leads = await ReportsModel.fetchLeads();
        const leadColumns = await ReportsModel.getLeadColumns(); // Asegúrate de que esta línea esté aquí

        if (!leads || !leads[0]) {
            console.error("Leads data is missing or incorrect");
            return response.status(500).send("Internal Server Error");
        }        

        response.render('leads/report.ejs', { 
            reports: reports,
            leads: leads[0],
            leadColumns: leadColumns, // Asegúrate de que esta línea esté aquí
            canUpload: request.canUpload,
            canConsultUsers: request.canConsultUsers,
            canConsultReports: request.canConsultReports,
            canDownloadPDF: request.canDownloadPDF,
        });
    } catch (error) {
        console.error(error);
    }
};



exports.fetchAllCSV = async () => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM CSV');
        return rows;
    } catch (error) {
        console.error(error);
    }
};

exports.getLeadColumns = async () => {
    const query = "SHOW COLUMNS FROM leads";
    const results = await db.query(query); // Usando db en lugar de database
    return results.map(row => row.Field);
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
    try {
        const leads = await ReportsModel.fetchLeads();
        const leadColumns = await ReportsModel.fetchLeadColumns();
        response.render('leads/report', { leads: leads, leadColumns: leadColumns });
    } catch(error) {
        console.error(error);
        response.status(404).json({message: 'Error al obtener los leads'});
    }
};

exports.getLeadColumns = async () => {
    const query = "SHOW COLUMNS FROM leads";
    const [results] = await db.execute(query); // Usando db.execute en lugar de db.query
    return results.map(row => row.Field);
};

exports.getLeadsData = async (request, response, next) => {
    try {
        const leadsData = await ReportsModel.fetchLeads();
        response.json(leadsData);
    } catch(error) {
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

// Asumo que las funciones comentadas no son necesarias por ahora, así que las he omitido.
