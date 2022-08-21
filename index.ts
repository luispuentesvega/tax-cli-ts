import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

import { exit } from 'process';
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
      console.log(`For tax ${type}, customer ${user} has declared $${total}`);
    };
    const callbackError = (error: string) => {
      console.log('error:', error);
    };

    taxCalculator(stream, args, callback, callbackError);
  } catch (error) {
    console.error(error);
    exit(1);
  }
})();
