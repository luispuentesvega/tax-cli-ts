import * as es from 'event-stream';
import * as fs from 'fs';
import numeral from 'numeral';
import { finished, pipeline } from 'stream';

import { calculateTax, parser, validateData } from './helper';
import { TaxInvoice } from './types';

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
      const totalTax = calculateTax(total);
      callback(totalTax);
    }
  });
};
export default calculate;
