import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
    const { state } = useLocation();
    const { amount, vehicleReg, phoneNumber } = state || {};
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConfirmPayment = async () => {
        if (!pin) {
            alert('Please enter your M-Pesa PIN');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/initiate-payment', {
                phoneNumber,
                amount,
                vehicleReg,
                pin,
            });
            alert('Payment successful!');
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-confirmation">
            <h2>Confirm Payment</h2>
            {amount && vehicleReg && phoneNumber ? (
                <>
                    <p>Do you want to pay Kshs. {amount} to Nakuru County Account no. NESV-{vehicleReg}?</p>
                    <label htmlFor="pin">Enter M-Pesa PIN:</label>
                    <input
                        type="password"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter M-Pesa PIN"
                        required
                    />
                    <button onClick={handleConfirmPayment}>
                        {loading ? 'Processing...' : 'Confirm Payment'}
                    </button>
                </>
            ) : (
                <p>Error: Payment details are missing. Please go back and try again.</p>
            )}
        </div>
    );
};

export default PaymentConfirmation;