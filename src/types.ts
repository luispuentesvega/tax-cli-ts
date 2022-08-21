export enum TaxType {
  GST = "GST",
  PAYROLL = "PAYROLL",
  COMPANY_TAX = "COMPANY_TAX",
  LAND_TAX = "LAND_TAX",
  CAPITOL_GAIN = "CAPITOL_GAIN",
}

export interface TaxInvoice {
  customerId: number;
  invoiceNumber: string;
  timestamp: string;
  amount: number;
  taxType: TaxType;
}
