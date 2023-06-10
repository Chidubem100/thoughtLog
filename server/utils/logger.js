// import logger  from "pino";
// import dayjs from "dayjs";
// import config from "config";

const logger = require('pino');
const dayjs = require('dayjs');

const level = 'info'

const log = logger({
    transport:{
        target: 'pino-pretty'
    },
    level,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
    

});

module.exports = log;