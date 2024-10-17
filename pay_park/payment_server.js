const express = require('express');
const router = express.Router();
require('dotenv').config();

const nakuruPayBill = '174379';

// Payment route with mock response
router.post('/initiate-payment', async (req, res) => {
    const { phoneNumber, amount, vehicleReg } = req.body;

    if (!phoneNumber || !amount || !vehicleReg) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Format phone number
    const formattedPhoneNumber = phoneNumber.replace(/^0/, '254');
    console.log('Formatted Phone Number:', formattedPhoneNumber);

    // Simulate a delay to mimic real API call
    setTimeout(() => {
        // Mock success response
        const mockResponse = {
            MerchantRequestID: "29115-34620561-1",
            CheckoutRequestID: "ws_CO_191220191020363925",
            ResponseCode: "0",
            ResponseDescription: "Success. Request accepted for processing",
            CustomerMessage: "Check your phone for the M-Pesa PIN prompt to complete the transaction."
        };

        console.log('Mock Payment Response:', mockResponse);
        res.json(mockResponse);
    }, 2000); // 2-second delay to simulate API response time
});

// Callback route remains unchanged as you can use it for demonstration
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