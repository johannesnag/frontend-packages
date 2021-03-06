const yargs = require('yargs');
const runSourceMapResolver = require('./index');

const args = {
  options: {
    mapFile: {
      alias: 'm',
      description: 'Path to source map file',
      type: 'string',
    },
    errorEventFile: {
      alias: 'e',
      description: 'Path to error event file',
      type: 'string',
    },
  },
  usage:
    'Usage: $0 --mapFile <pathToMapFile> --errorEventFile <pathToErrorEventFile>',
  docs:
    'Documentation:\nhttps://github.com/NDLANO/frontend-packages/tree/ndla-source-map-resolver/packages/ndla-source-map-resolver',
};

function run(programArgs) {
  const { argv } = yargs(programArgs || process.argv.slice(2))
    .usage(args.usage)
    .help('h')
    .alias('help', 'h')
    .options(args.options)
    .demandOption(['mapFile', 'errorEventFile'])
    .epilogue(args.docs)
    .wrap(Math.min(100, process.stdout.columns));

  if (argv.help) {
    yargs.showHelp();
    process.on('exit', () => process.exit(1));
  }
  runSourceMapResolver(argv);
}
exports.run = run;
