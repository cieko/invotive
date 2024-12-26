import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import * as FileSystem from 'expo-file-system';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      font-size: 12px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .invoice-table th,
    .invoice-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .invoice-table th {
      background-color: #f8f9fa;
    }
    .totals {
      float: right;
      width: 300px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .company-logo {
      width: 150px;
      height: 150px;
    }
    .text-right {
      text-align: right;
    }
    .footer {
      margin-top: 50px;
      border-top: 1px solid #ddd;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <div>
        <h1>Invoice</h1>
        <p>Invoice #123</p>
        <p>Due Date: 2024-04-18</p>
      </div>
      <div class="company-logo-container">
        <img src="https://dummyimage.com/150x150/000/fff" alt="Company Logo" class="company-logo">
      </div>
    </div>

    <div class="invoice-header">
      <div class="client-info">
        <h3>Bill To:</h3>
        <p>Client Name</p>
        <p>Client Address</p>
        <p>City, State ZIP</p>
        <p>Phone: (555) 5555-5555</p>
      </div>

      <div class="company-info">
        <h2>Your Company Name</h2>
        <p>Company Address</p>
        <p>City, State ZIP</p>
        <p>Phone: (555) 5555-5555</p>
        <p>Email: company@example.com</p>
      </div>
      
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item 1</td>
          <td>2</td>
          <td>$10.00</td>
          <td>$20.00</td>
        </tr>
        <tr>
          <td>Item 2</td>
          <td>1</td>
          <td>$5.00</td>
          <td>$5.00</td>
        </tr>
        <tr>
          <td>Item 3</td>
          <td>3</td>
          <td>$15.00</td>
          <td>$45.00</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>$70.00</span>
      </div>
      <div class="total-row">
        <span>Tax (10%)</span>
        <span>$7.00</span>
      </div>
      <div class="total-row">
        <span>Total</span>
        <span>$77.00</span>
      </div>
    </div>

    <div style="clear: both;">
      <div class="footer">
        <h3>Payment Terms</h3>
        <p>Payment is due within 30 days of the invoice date. Late payment is subject to fees of 5% per month.</p>
        <p>Make checks payable to: Your Company Name</p>
        <p>Bank Details: Bank Name, Account #: XXXX-XXXX-XXXX-XXXX</p>
      </div>
    </div>

  </div>
    

</body>
</html>
`;

export const generateInvoicePDF = async () => {
  try {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await printToFileAsync({ html });

    const permanentUri = `${FileSystem.documentDirectory}invoice.pdf`;

    // move to document directory
    await FileSystem.moveAsync({
      from: uri,
      to: permanentUri,
    }); // moveAsync doesn't return anything

    await shareAsync(permanentUri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.log('Error while generating PDF:', error);
  }
};
