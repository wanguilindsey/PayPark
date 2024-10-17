import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [subCounty, setSubCounty] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleReg, setVehicleReg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const getParkingFee = (type) => {
        switch (type) {
          case 'Small Vehicle':
            return 100;
          case 'Canter':
            return 200;
          case 'Lorries and Buses':
            return 300;
          case 'Trailers':
            return 500;
          case 'Unclamping':
            return 1000;
          default:
            return 0; // Default case
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Calculate the parking fee based on vehicle type
        const parkingFee = getParkingFee(vehicleType);

        try {
          // Send data to backend for initiating STK Push
          await axios.post('http://localhost:5000/api/initiate-payment', {
            phoneNumber,
            amount: parkingFee,
            vehicleReg,
        });

        alert('Check your phone for the M-Pesa PIN prompt to complete the transaction.');
        setLoading(false);
      } catch (error) {
        console.error('Payment initiation error:', error);
        alert('Payment initiation failed. Please try again.');
        setLoading(false);
      }
    };
  
    return (
      <form className="parking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subCounty">Sub-County</label>
          <select
            id="subCounty"
            value={subCounty}
            onChange={(e) => setSubCounty(e.target.value)}
            required
          >
            <option value="" disabled>Select Sub-County</option>
            <option value="Nakuru East">Nakuru East</option>
            <option value="Nakuru West">Nakuru West</option>
            <option value="Naivasha">Naivasha</option>
            <option value="Gilgil">Gilgil</option>
            <option value="Bahati">Bahati</option>
            <option value="Kuresoi South">Kuresoi South</option>
            <option value="Kuresoi North">Kuresoi North</option>
            <option value="Rongai">Rongai</option>
            <option value="Njoro">Njoro</option>
            <option value="Molo">Molo</option>
            <option value="Subukia">Subukia</option>
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="" disabled>Vehicle Type</option>
            <option value="Small Vehicle">Small Vehicle</option>
            <option value="Canter">Canter</option>
            <option value="Lorries and Buses">Lorries and Buses</option>
            <option value="Trailers">Trailers</option>
            <option value="Unclamping">Unclamping</option>
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="vehicleReg">Vehicle Registration Number</label>
          <input
            type="text"
            id="vehicleReg"
            value={vehicleReg}
            onChange={(e) => setVehicleReg(e.target.value)}
            placeholder="Enter Vehicle Registration"
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel" // Change type to "tel" for phone number input
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
          required
          pattern="[0-9]{10}" // Optional: Regex pattern for validation (10 digits)
          maxLength="10" // Optional: Limit to 10 digits
        />
      </div>
      
      <button type="submit" disabled={loading}>
      {loading ? 'Processing...' : 'Submit'}
      </button>
      </form>
    );
  };
  
  export default Form;