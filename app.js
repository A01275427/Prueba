const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

app.use(session({
    secret: 'TecDevs123456789', 
    resave: false,
    saveUninitialized: false,
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

app.use(multer({ storage: storage }).single('importCSV'));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
    console.log('generar csrfToken en response');
    console.log(request.body);
    response.locals.csrfToken = request.csrfToken();
    console.log(response.locals);
    next();
});

const routesLeads = require('./routes/leads.routes');
app.use('/leads', routesLeads);

const routesUsers = require('./routes/users.routes');
app.use('/users', routesUsers);

const routesReports = require('./routes/reports.routes');
app.use('/leads', routesReports);


app.use((request, response, next) => {
    response.statusCode = 404;

    let html = `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>LeadCharts</title>
    </head>
    <body>
        <header>
            <nav class="bg-white border-gray-100 border-b-4">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a class="flex items-center">
                        <img src="/leadChartsLogo.png" class="h-16 mr-5" alt="leadChartsLogo" />
                    </a>
                </div>
            </nav>
        </header>
        <main>
            <p class="font-sans text-4xl text-black"> Page Not Found :[ </p>
        </main>
    </body>
</html>
`;
    response.send(html);
});

app.listen(3000);