import * as es from 'event-stream';
import * as fs from 'fs';

import { TaxInvoice } from './types';
import { parser, calculateTax, validateData } from './helper';
import { finished, pipeline } from 'stream';

import numeral from 'numeral';

type CallbackTotal = (total: number) => void;
type Args = {
  user: number;
  type: string;
};

const calculate = (
  stream: fs.ReadStream,
  args: Args,
  callback: CallbackTotal
) => {
  const { user, type } = args;
  const total = numeral(0);

  const totalInvoice = es.mapSync((line: TaxInvoice) => {
    if (line.customerId === user && line.taxType === type) {
      total.add(line.amount);
    }
  });

  pipeline(stream, parser, validateData, totalInvoice, (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    }
  });

  finished(stream, (err) => {
    if (err) {
      console.error('Stream failed', err);
    } else {
      console.log('Tax calculation finished', total);
      const totalTax = calculateTax(total);
      callback(totalTax);
    }
  });
};
export default calculate;
