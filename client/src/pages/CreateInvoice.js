import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid, MenuItem } from '@mui/material';
import api from 'invoice-generator-app.github.io/client/src/pages/services/api';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    client: { name: '', email: '', address: '' },
    items: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 0,
    notes: '',
    isRecurring: false,
    recurrenceInterval: 'none'
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      setInvoice({ ...invoice, items: newItems });
    }
  };

  const calculateTotal = () => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    );
    const tax = subtotal * (invoice.taxRate / 100);
    return subtotal + tax;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/invoices', {
        ...invoice,
        total: calculateTotal()
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create invoice', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Create New Invoice</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Client Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={invoice.client.name}
                onChange={(e) => setInvoice({ 
                  ...invoice, 
                  client: { ...invoice.client, name: e.target.value } 
                })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client Email"
                type="email"
                value={invoice.client.email}
                onChange={(e) => setInvoice({ 
                  ...invoice, 
                  client: { ...invoice.client, email: e.target.value } 
                })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client Address"
                multiline
                rows={2}
                value={invoice.client.address}
                onChange={(e) => setInvoice({ 
                  ...invoice, 
                  client: { ...invoice.client, address: e.target.value } 
                })}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Invoice Items</Typography>
          {invoice.items.map((item, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4} md={2}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  required
                />
              </Grid>
              <Grid item xs={4} md={2}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                  required
                />
              </Grid>
              <Grid item xs={4} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => removeItem(index)}
                  disabled={invoice.items.length <= 1}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addItem}>Add Item</Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                value={invoice.taxRate}
                onChange={(e) => setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Total"
                type="number"
                value={calculateTotal().toFixed(2)}
                disabled
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={3}
            value={invoice.notes}
            onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Recurring Invoice</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Recurrence"
                value={invoice.recurrenceInterval}
                onChange={(e) => setInvoice({ 
                  ...invoice, 
                  isRecurring: e.target.value !== 'none',
                  recurrenceInterval: e.target.value 
                })}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Button type="submit" variant="contained" size="large">
          Create Invoice
        </Button>
      </form>
    </Container>
  );
};

export default CreateInvoice;
