const express = require('express');

module.exports = () => {
    const app = express();
    
    app.use(require('./routes')());
    
    return app;
};