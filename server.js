const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const corsOptions = {
    origin: 'https://event-management-server-0vmp.onrender.com/',
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);


// DB Connect & Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('DB Connection Error:', err));
