export enum TaxType {
  GST = 'GST',
  PAYROLL = 'PAYROLL',
  COMPANY_TAX = 'COMPANY_TAX',
  LAND_TAX = 'LAND_TAX',
  CAPITOL_GAIN = 'CAPITOL_GAIN'
}

export interface TaxInvoice {
  customerId: number;
  invoiceNumber: string;
  timestamp: string;
  amount: number;
  taxType: TaxType;
}

export type CallbackTotal = (total: number) => void;

export type Args = {
  user: number;
  type: string;
};
