import { Numeral } from 'numeral';
import { parse } from 'csv-parse';
import Joi from 'joi';
import { TaxInvoice, TaxType } from './types';
import * as es from 'event-stream';

const headers = [
  'customerId',
  'invoiceNumber',
  'timestamp',
  'amount',
  'taxType'
];

export const parser = parse({ delimiter: ',', columns: headers, cast: true });

export const calculateTax = (totalInvoices: Numeral) => {
  const TAX_PERCENTAGE = 10;
  return totalInvoices.multiply(TAX_PERCENTAGE).divide(100).value() || 0;
};

export const validateData = es.mapSync((line: TaxInvoice): TaxInvoice => {
  const schema = Joi.object({
    customerId: Joi.number().required(),
    invoiceNumber: Joi.string().required(),
    timestamp: Joi.string().required(),
    amount: Joi.number().required(),
    taxType: Joi.valid(...Object.values(TaxType)).required()
  });
  const { error } = schema.validate(line);

  if (error) {
    throw new Error(error.message);
  }
  return line;
});
