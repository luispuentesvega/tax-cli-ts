// mocked at the top to avoid error when mocking the functions
const mockedParser = jest.fn();
const mockedValidateData = jest.fn();
const mockedMapSync = jest.fn();
const mockedPipeline = jest.fn();
const mockedFinished = jest.fn();

import * as fs from 'fs';
import * as path from 'path';

import taxCalculator from './taxCalculator';

jest.mock('stream', () => ({
  pipeline: mockedPipeline,
  finished: mockedFinished
}));

jest.mock('./helper', () => ({
  parser: mockedParser,
  validateData: mockedValidateData
}));

jest.mock('event-stream', () => ({
  mapSync: mockedMapSync
}));

describe('# taxCalculator', () => {
  it('should call all the pipes defined when calling taxCalculator', (done) => {
    const file = 'transaction-1line.csv';
    const csvFilePath = path.resolve(__dirname, `../fixture/${file}`);
    const stream = fs.createReadStream(csvFilePath);
    const args = {
      user: 123,
      type: 'CAPITOL_GAIN',
      file: 'myfil'
    };

    function callback(totalTaxes: number) {
      console.log(totalTaxes);
    }

    try {
      taxCalculator(stream, args, callback);
      expect(mockedPipeline).toHaveBeenCalled();
      stream.close();
      done();
    } catch (error) {
      done(error);
    }
  });
});
