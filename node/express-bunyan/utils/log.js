var timber = require('timber');
var bunyan = require('bunyan');
var appRoot = require('app-root-path');

// Set default log level
// can also use an environment variable here
var logLevel = 'info';

// Timber API Key
var timberKey = '2829_fa4d60d7ec980c41:9f5d48e2aa445eee63dabc9e69ceb8ce66a4b2e9eda59a9d62edb9958953837a';

// Create Timber transport
const transport = new timber.transports.HTTPS(timberKey);

// Pick up morgan logs as well
timber.install(transport);

// Create Bunyan Logger
// write to a file and to Timber at the same time
var log = bunyan.createLogger({
  name: 'Timber',
  streams: [
  	{
  		level: logLevel,
  		path: `${appRoot}/logs/app.log`
  	},
  	{
  		level: logLevel,
  		stream: new timber.transports.Bunyan({ stream: new timber.transports.HTTPS(timberKey) }),
  	},
  ]
});

module.exports = log;
