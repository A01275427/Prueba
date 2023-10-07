const ReportsModel = require('../models/reports.model');

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
            // Aquí debes agregar los campos que forman parte de tu reporte, por ejemplo:
            // title: request.body.title,
            // description: request.body.description,
        };
        await ReportsModel.addReport(reportData);
        response.redirect('/reports');
    } catch (error) {
        console.error(error);
    }
};
