# Exercise

A tax invoice transaction has the following elements.

- customer Id for instance `123`
- commercial invoice number that would look like `2021/04/customer1-12212`
- timestamp - of format `year-month-dayThour:minute:second`
- amount - of format `dollars.cents`
- tax type which could be the following: GST, PAYROLL, COMPANY_TAX, LAND_TAX, CAPITOL_GAIN

Transactions are to be received in a file as a comma separated string of elements, one per line, e.g.:

`123, 2021/04/customer1-12212, 2021-04-29T13:15:54, 10.00, GST`

Write a command line application which will print a tax report for the tax given in input.

The tax Report will be for a customer and a tax type and 10% of the sum of all tax invoices

The arguments of the command line will be the tax, the customer id and a filename, e.g.:

`your-app --type=GST --user=123 --file=filename.csv`

The file passed to your app will contain a sequence of tax invoices in chronological order.
Your app should print out something like in the console:

```
For tax GST, customer 123 has declared $123.4
```

# Solution

CLI application to calculate taxes using Typescript

Sample command line

```bash
npx ts-node index.ts --user=8143 --file=transaction-30lines.csv --type=PAYROLL
```

Result

```
For tax PAYROLL, customer 8143 has declared $94.40
```

## Installation

Use the npm package manager

```bash
npm install
```

## Commands

Unit Testing

```bash
npm run test
```

Calculate Tax

```bash
npx ts-node index.ts --user=8143 --file=transaction-30lines.csv --type=PAYROLL
```
