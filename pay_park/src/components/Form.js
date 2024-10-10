import React, { useState } from 'react';

const Form = () => {
    const [subCounty, setSubCounty] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleReg, setVehicleReg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Calculate the parking fee based on vehicle type
        const parkingFee = getParkingFee(vehicleType);
    
        // Prompt the user for payment confirmation
        const confirmPayment = window.confirm(
          `Do you want to pay Kshs. ${parkingFee} to Nakuru County Account no. NESV-${vehicleReg}? Enter M-Pesa PIN.`
        );
    
        if (confirmPayment) {
          // Here you would proceed to integrate with the M-Pesa API
          // This is where you would handle the M-Pesa payment logic
          alert('Payment initiated.'); // Simulating payment initiation
          // You might want to add additional logic here to handle the M-Pesa integration
        } else {
          alert('Payment cancelled.');
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
      
      <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default Form;