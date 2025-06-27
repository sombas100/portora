const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/models/index');

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);

const connectDb = async () => {
    console.log('Checking database connection...');

    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit(1);
    }
}

(async () => {
    await connectDb();
    console.log('Attempting to start the server')
    app.listen(PORT, () => console.log(`Server is now listening on PORT: ${PORT}`))
})();
