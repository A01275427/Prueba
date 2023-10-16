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
        const leads1 = await ReportsModel.fetchLeads1();
        response.render('leads/report.ejs', {leads: leads[0], leads1: leads1[0]});
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

exports.getLeads1 = async (request, response, next) => {
    try{
        const leadsData = await ReportsModel.fetchLeads1();
        response.json(leadsData);
    }catch(error){
        console.error(error);
        response.status(500).json({message: 'Error al obtener los leads'});
    }
};




exports.postReport = async (request, response, next) => {
    try {
        const selectedColumns = request.body.columns || [];
        const leads = await ReportsModel.fetchLeads(selectedColumns);
        response.render('leads/report.ejs', {leads: leads[0]});
    } catch (error) {
        console.error(error);
        response.status(404).json({message: 'Error al obtener los leads'});
    }
};



exports.downloadReportPDF = async (request, response, next) => {
    try {
        const leads = await ReportsModel.fetchLeads();

        const browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: '/ruta/a/chromium-o-chrome'  // Reemplaza esto con la ruta correcta
        });        
        const page = await browser.newPage();
        
        const labels = JSON.stringify(leads.map(lead => lead.value));
        const data = JSON.stringify(leads.map(lead => lead.gain));
        const htmlContent = `
        <html>
            <head>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </head>
            <body>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold mb-4">Grafica de Linea</h2>
                    <canvas id="lineChart"></canvas>
                    <script>
                        const ctxLine = document.getElementById('lineChart').getContext('2d');
                        const myLineChart = new Chart(ctxLine, {
                            type: 'line',
                            data: {
                                labels: ${labels},
                                datasets: [{
                                    label: 'Leads',
                                    data: ${data},
                                }]
                            },
                        });
                    </script>
                </div>
            </body>
        </html>
        `;

        await page.setContent(htmlContent);
        const pdf = await page.pdf({ format: 'A4' });

        response.contentType('application/pdf');
        response.send(pdf);

        await browser.close();
    } catch (error) {
        console.error("Error detallado:", error);
        response.status(500).json({ message: 'Error al generar el PDF' });
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
