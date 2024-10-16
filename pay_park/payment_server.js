const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const nakuruPayBill = '174379';

// Function to get M-Pesa access token
const getAccessToken = async () => {
    const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Failed to get access token');
    }
};

// Payment route
router.post('/api/initiate-payment', async (req, res) => {
    const { phoneNumber, amount, vehicleReg, } = req.body;

    if (!phoneNumber || !amount || !vehicleReg) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
    const token = await getAccessToken();
    const paymentRequest = {
        BusinessShortCode: nakuruPayBill, // Nakuru County PayBill number
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber, // Customer's phone number
        PartyB: nakuruPayBill, // Nakuru County PayBill number
        PhoneNumber: phoneNumber, // Customer's phone number
        CallBackURL: 'https://22aa-105-163-157-48.ngrok-free.app/callback',, // Your callback URL
        AccountReference: `NESV-${vehicleReg}`, // Use vehicle registration as part of account reference
        TransactionDesc: 'Parking Payment',
    };

    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    res.json(response.data);
} catch (error) {
    console.error('Payment initiation error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Payment initiation failed', details: error.response ? error.response.data : error.message  });
}
});

// Callback route to handle M-Pesa payment results
router.post('/callback', (req, res) => {
    const { Body } = req.body;
    const { stkCallback } = Body;

    console.log('M-Pesa Callback Response:', Body);

    if (stkCallback) {
        const resultCode = stkCallback.ResultCode;
        const resultDescription = stkCallback.ResultDescription;
        const transactionId = stkCallback.CheckoutRequestID;

        switch (resultCode) {
            case 0: // Success
                console.log('Payment successful:', stkCallback);
                // Here, you can update your database to reflect the successful payment
                // e.g., mark the invoice as paid, notify the user, etc.
                res.status(200).json({ message: 'Payment received successfully' });
                break;

            case 1: // Insufficient funds
                console.log('Payment failed due to insufficient funds:', resultDescription);
                res.status(400).json({ message: 'Payment failed: Insufficient funds' });
                break;

            case 2: // Transaction cancelled
                console.log('Payment canceled by user:', resultDescription);
                res.status(400).json({ message: 'Payment canceled' });
                break;

            case 3: // Transaction failed
                console.log('Payment failed:', resultDescription);
                res.status(400).json({ message: 'Payment failed' });
                break;

            default:
                console.log('Unhandled result code:', resultCode);
                res.status(400).json({ message: 'Unhandled payment result' });
                break;
        }
    } else {
        console.error('Invalid callback response format');
        res.status(400).json({ message: 'Invalid callback response' });
    }
});

module.exports = router;