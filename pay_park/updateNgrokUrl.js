const axios = require('axios');
const fs = require('fs');

const updateNgrokUrl = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:4040/api/tunnels');
        const publicUrl = response.data.tunnels[0].public_url;

        // Log the ngrok URL
        console.log('Current ngrok URL:', publicUrl);

        // Update the callback URL in your server configuration
        const serverConfig = `CallBackURL: '${publicUrl}/callback',`;

        // Read the server file (e.g., payment_server.js)
        const fileContent = fs.readFileSync('payment_server.js', 'utf8');
        
        // Replace the old callback URL with the new one
        const updatedFileContent = fileContent.replace(/CallBackURL: '.*\/callback'/, serverConfig);
        
        // Write the updated content back to the server file
        fs.writeFileSync('payment_server.js', updatedFileContent, 'utf8');
        
        console.log('Callback URL updated to:', publicUrl);
    } catch (error) {
        console.error('Error fetching ngrok URL:', error);
    }
};

updateNgrokUrl();