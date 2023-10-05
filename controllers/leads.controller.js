const csvParser = require('csv-parser');
const Papa = require('papaparse');
const fs = require('fs');
const Lead = require('../models/leads.model');
const moment = require('moment');

exports.getUpload = (request, response, next) => {
    response.render('leads/leadUpload.ejs', {  });
};

exports.postUpload = (request, response, next) => {
    console.log('controlador');
    console.log(request.body);

    if (!request.file) return response.status(400).send('Archivo no subido');

    const filePath = request.file.path;
    
    fs.readFile(filePath, 'utf8', async function(err, data) {
        if (err) {
            return console.error(err);
        }

        const results = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
        });

        for (let row of results.data) {
            const gainValue = parseFloat(row['Ganado']);

            const gain = isNaN(gainValue) ? null : gainValue;
            
            const lastMessageDateParsed = moment(row['Fecha de último mensaje'], 'DD/MM/YY').format('YYYY-MM-DD');
            if (lastMessageDateParsed === "Invalid date") {
                console.error("Fecha inválida encontrada en la fila:", row);
            }

            const firstMessageDateParsed = moment(row['Fecha de primer mensaje'], 'DD/MM/YY').format('YYYY-MM-DD');
            if (firstMessageDateParsed === "Invalid date") {
                console.error("Fecha inválida encontrada en la fila:", row);
            }

            const firstMessageTimeParsed = moment(row['Hora del primer mensaje'], 'HH:mm:ss').format('HH:mm:ss');
            if (firstMessageTimeParsed === "Invalid date") {
                console.error("Hora inválida encontrada en la fila:", row);
            }

            const lastMessageTimeParsed = moment(row['Hora del ultimo mensaje'], 'HH:mm:ss').format('HH:mm:ss');
            if (lastMessageTimeParsed === "Invalid date") {
                console.error("Hora inválida encontrada en la fila:", row);
            }

            const phone = parseFloat(row["Teléfono"]);

            const parsedPhone = `+ (${phone.toString().slice(0, 3)})-${phone
                .toString()
                .slice(3, 6)}-${phone.toString().slice(6, 9)}-${phone.toString().slice(9, 21)}`;

            const lead = new Lead({
                phone: parsedPhone || " ",
                name: row['Nombre'] || " ",
                value: row['Valor $'] || null,
                gain: gain,
                email: row['Correo'] || " ",
                tags: row['Etiquetas'] || " ",
                company: row['Compañia'] || " ",
                createdAt: row['Creado'] ? moment(row['Creado'], 'DD/MM/YY').format('YYYY-MM-DD') : null,
                creationTime: row['Hora de creación'] ? moment(row['Hora de creación'], 'HH:mm:ss').format('HH:mm:ss') : null,
                firstMessageDate: firstMessageDateParsed === "Invalid date" ? null : firstMessageDateParsed,
                firstMessageTime: firstMessageTimeParsed === "Invalid date" ? null : firstMessageTimeParsed,
                firstMessage: row['Primer mensaje'] || " ",
                lastMessageDate: lastMessageDateParsed === "Invalid date" ? null : lastMessageDateParsed,
                lastMessageTime: lastMessageTimeParsed === "Invalid date" ? null : lastMessageTimeParsed,
                lastMessage: row['Último mensaje'] || " ",
                status: row['Status'] || " ",
                leadStatus: row['Estado de Lead'] || " ",
                assignedTo: row['Asignado a'] || " ",
                pipe: row['Embudo'] || " ",
                stage: row['Etapa'] || " ",
                archived: row['Archivado'] || " ",
                manuallyCreated: row['Creado Manualmente'] || " ",
            });
            await lead.insertLead();
        }

        fs.unlinkSync(filePath); // Borrar archivo después de leer
        response.redirect('/leads/upload'); // O redirige a donde prefieras
    });
};

exports.getTest = (request, response, next) => {
    response.render('leads/testCSRF.ejs');
};

exports.postTest = (request, response, next) => {

    console.log('controlador');
    console.log(request.body);
    
    response.send('POST success');
};