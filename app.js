const express = require('express');
const morganBody = require('morgan-body');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors');
const systemsRouter = require('./routes/systems');
const subsystemsRouter = require('./routes/subsystem');
const archivefilesRouter = require('./routes/archivefiles');

const app = express();
app.use(morgan('dev'));
app.use(cors());

//**GLOBAL MIDDLEWARES */
//Set security HTTP Header
app.use(helmet());
app.use('/',(req,res,next)=>{
    req.user = {
        systems: [2,3],
        role: 1,
        projects: [41]
        }
    next()
})

//Development logging
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    morganBody(app);
}

//Limit Requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/', limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10k' }));

//Data sanitization against XSS
app.use(xss());

//*****GENERAL ROUTEES*****
app.get('/', (req, res) => {
    res.sendStatus(200)
});


//*****OTHER ROUTEES*****
app.use('/systems', systemsRouter);
app.use('/subsystems', subsystemsRouter);
app.use('/archivefiles', archivefilesRouter);
 
// send 404 if no other route matched
app.all('*', (req, res, next) => {
    next(
        res.status(404).json({
            status: 'error',
            message: `Can't find ${req.originalUrl} on this server!`
        })
    );
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET , POST , DELETE , PUT , PATCH'
    );
    next();
});

module.exports = app;
