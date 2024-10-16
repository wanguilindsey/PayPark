const express = require('express');
const cors = require('cors');
const paymentRouter = require('./payment_server'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Mount the payment router at the /api prefix
app.use('/api', paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});