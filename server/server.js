const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/models/index');
const { Message } = require('./database/models');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    },
})

const authRoutes = require('./routes/authRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const webhookRoutes = require('./routes/stripeWebhook')
const billingRoutes = require('./routes/billingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
const messageRoutes = require('./routes/messageRoutes');

app.use('/uploads', express.static('uploads'));
app.use('/api/stripe/webhook', webhookRoutes);

app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ userId, peerId }) => {
    const room1 = `room-${userId}-${peerId}`;
    const room2 = `room-${peerId}-${userId}`;
    socket.join(room1);
    socket.join(room2);
    console.log(`📡 User joined rooms: ${room1}, ${room2}`);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, senderType, receiverType, content } = data;

    try {
      const newMessage = await Message.create({
        senderId,
        receiverId,
        senderType,
        receiverType,
        content,
      });

      const room1 = `room-${senderId}-${receiverId}`;
      const room2 = `room-${receiverId}-${senderId}`;

      io.to(room1).to(room2).emit('newMessage', newMessage);
    } catch (err) {
      console.error(' Error saving message:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

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
    server.listen(PORT, () => console.log(`Server is now listening on PORT: ${PORT}`))
})();
