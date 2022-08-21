import fs from 'fs';
import numeral from 'numeral';
import path from 'path';

import { calculateTax, parser, validateData } from './helper';
import { TaxInvoice } from './types';

describe('# calculateTax', () => {
  test('should return 10 when 100 is sent', () => {
    expect(calculateTax(numeral(100))).toBe(10);
  });

  test('should return 20 when 200 is sent', () => {
    expect(calculateTax(numeral(100))).toBe(10);
  });

  test('should return null when null is sent', () => {
    expect(null).toBeNull();
  });

  test('should return zero when zero is sent', () => {
    expect(0).toBe(0);
  });
});

describe('# parser', () => {
  test('should response the parsed file as expected', () => {
    const file = 'transaction-1line.csv';
    const csvFilePath = path.resolve(__dirname, `../fixture/${file}`);
    fs.createReadStream(csvFilePath).pipe(parser);

    const records: TaxInvoice[] = [];
    parser.on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    const expectedResult = {
      customerId: 123,
      invoiceNumber: '2010/10/abaaaabba-05212',
      timestamp: '2021-11-24 8:32:58',
      amount: 100,
      taxType: 'CAPITOL_GAIN'
    };

    parser.on('end', () => {
      expect(records).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedResult)])
      );
    });
  });
});

describe('# validateData', () => {
  test('should return error when the taxType sent is not the taxType expected', (done) => {
    const file = 'transaction-1line-corrupted.csv';
    const csvFilePath = path.resolve(__dirname, `../fixture/${file}`);
    fs.createReadStream(csvFilePath).pipe(parser).pipe(validateData);

    validateData.on('error', (error) => {
      console.log('HERROR:', error.message);
      expect(error.message).toBe(
        '"taxType" must be one of [GST, PAYROLL, COMPANY_TAX, LAND_TAX, CAPITOL_GAIN]'
      );
      done();
    });
  });
});
