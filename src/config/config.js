// Configuration management with environment variables

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI,
    // Add other environment variables as needed
};