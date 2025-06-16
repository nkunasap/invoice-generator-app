import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import api from 'invoice-generator-app.github.io/client/src/pages/services/api';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get('/invoices');
        setInvoices(response.data);
      } catch (err) {
        console.error('Failed to fetch invoices', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleSendEmail = async (invoiceId) => {
    try {
      await api.post(`/invoices/${invoiceId}/send`);
      alert('Invoice sent successfully!');
    } catch (err) {
      console.error('Failed to send invoice', err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Invoice Dashboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.client.name}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.total.toFixed(2)}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/invoice/${invoice._id}`} size="small">View</Button>
                  <Button size="small" onClick={() => handleSendEmail(invoice._id)}>Email</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
