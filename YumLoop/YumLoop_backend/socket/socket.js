import { Server } from 'socket.io';

let ioInstance = null;

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Change to your frontend URL in production
      methods: ['GET', 'POST']
    }
  });
  ioInstance = io;

  io.on('connection', (socket) => {
    // Join user to their own room for private messaging
    socket.on('join', (userId) => {
      socket.join(userId);
    });

    // Handle sending a message
    socket.on('sendMessage', ({ to, from, text }) => {
      // Save message to DB here if needed
      io.to(to).emit('receiveMessage', { from, text, timestamp: Date.now() });
    });

    // Typing indicator
    socket.on('typing', ({ to, from }) => {
      io.to(to).emit('typing', { from });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      // Handle user disconnect logic
    });
  });

  return io;
}

export function getIO() {
  return ioInstance;
} 