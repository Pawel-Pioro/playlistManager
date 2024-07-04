const express = require('express');
const cors = require('cors');
require('dotenv').config();

// route imports
const playlistRoutes = require('./routes/playlists');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// Routes
app.use('/api/playlists', playlistRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log('Server started on port '+ process.env.PORT);
});