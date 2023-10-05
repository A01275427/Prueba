const ReportsModel = require('../models/reports.model');

exports.getReport = (request, response, next) => {
    ReportsModel.getDataForCharts()
        .then(([rows, fieldData]) => {
            response.render('leads/report.ejs', { data: rows });
        })
        .catch(err => console.log(err));
};
