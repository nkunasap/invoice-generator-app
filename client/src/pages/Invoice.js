import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import api from 'invoice-generator-app.github.io/client/src/pages/services/api';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF'; // You'll need to create this

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/invoices/${id}`);
        setInvoice(response.data);
      } catch (err) {
        console.error('Failed to fetch invoice', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleSendEmail = async () => {
    try {
      await api.post(`/invoices/${id}/send`);
      alert('Invoice sent successfully!');
    } catch (err) {
      console.error('Failed to send invoice', err);
    }
  };

  if (loading) return <CircularProgress />;
  if (!invoice) return <Typography>Invoice not found</Typography>;

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Invoice #{invoice.invoiceNumber}</Typography>
        <Box>
          <PDFDownloadLink 
            document={<InvoicePDF invoice={invoice} />} 
            fileName={`invoice_${invoice.invoiceNumber}.pdf`}
          >
            {({ loading }) => (
              <Button variant="contained" disabled={loading}>
                {loading ? 'Preparing PDF...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ ml: 2 }} 
            onClick={handleSendEmail}
          >
            Email to Client
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">From:</Typography>
            <Typography>{invoice.user.company}</Typography>
            <Typography>{invoice.user.name}</Typography>
            <Typography>{invoice.user.email}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">To:</Typography>
            <Typography>{invoice.client.name}</Typography>
            <Typography>{invoice.client.email}</Typography>
            <Typography>{invoice.client.address}</Typography>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} colSpan={2} />
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">
                ${invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Tax ({invoice.taxRate}%)</TableCell>
              <TableCell align="right">
                ${(invoice.total - invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">${invoice.total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {invoice.notes && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Typography variant="h6">Notes:</Typography>
          <Typography>{invoice.notes}</Typography>
        </Box>
      )}

      {invoice.isRecurring && (
        <Box sx={{ mt: 3 }}>
          <Typography>Recurring Invoice: {invoice.recurrenceInterval}</Typography>
          <Typography>Next Invoice Date: {new Date(invoice.nextRecurrence).toLocaleDateString()}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Invoice;
