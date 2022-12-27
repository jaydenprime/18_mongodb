const mongoose = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmediaDB';
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

mongoose.connect(connectionString, options);

module.exports = mongoose.connection;