const ReportsModel = require('../models/reports.model');
response.render('leads/report', { months: months, sales: sales });


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

exports.generateReports = (request, response, next) => {
    Report.fetchData()
    .then(([data, fieldData]) => {
        response.render('/views/leads/report.ejs', {data: data});
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/');
    });
};