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
router.post('/initiate-payment', async (req, res) => {
    const { phoneNumber, amount, vehicleReg, pin } = req.body;
    const token = await getAccessToken();

    const paymentRequest = {
        BusinessShortCode: nakuruPayBill, // Nakuru County PayBill number
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber, // Customer's phone number
        PartyB: nakuruPayBill, // Nakuru County PayBill number
        PhoneNumber: phoneNumber, // Customer's phone number
        CallBackURL: 'https://376c-102-215-33-52.ngrok-free.app/callback', // Your callback URL
        AccountReference: `NESV-${vehicleReg}`, // Use vehicle registration as part of account reference
        TransactionDesc: 'Parking Payment',
    };

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', paymentRequest, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Payment initiation error:', error.response.data);
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});

// Callback route to handle M-Pesa payment results
router.post('/callback', (req, res) => {
    const { Body } = req.body;
    const { stkCallback } = Body;

    console.log('M-Pesa Callback Response:', Body);

    if (stkCallback && stkCallback.ResultCode === 0) {
        // Successful payment
        console.log('Payment successful:', stkCallback);
        res.status(200).json({ message: 'Payment received successfully' });
    } else {
        // Payment failed
        console.log('Payment failed:', stkCallback);
        res.status(400).json({ message: 'Payment failed' });
    }
});

module.exports = router;