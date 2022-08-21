import * as fs from 'fs';
import numeral from 'numeral';
import * as path from 'path';
import { exit } from 'process';
import * as yargs from 'yargs';

import taxCalculator from './src/taxCalculator';

const args = yargs.argv as any;

const file = args.file;
const user = args.user;
const type = args.type;

(function () {
  if (!user) {
    console.log('Please specify the user name,e.g. --user=yourUser');
    exit(1);
  }

  if (!file) {
    console.log('Please specify the data file, e.g. --file=yourFile');
    exit(1);
  }

  if (!type) {
    console.log('Please specify the tax type, e.g. --type=yourType');
    exit(1);
  }

  try {
    const csvFilePath = path.resolve(__dirname, `fixture/${file}`);
    const stream = fs.createReadStream(csvFilePath);
    const callback = (total: number) => {
      const formattedTotal = numeral(total).format('$0,0.00');
      console.log(`For tax ${type}, customer ${user} has declared ${formattedTotal}`);
    };
    taxCalculator(stream, args, callback);
  } catch (error) {
    console.error(error);
    exit(1);
  }
})();
