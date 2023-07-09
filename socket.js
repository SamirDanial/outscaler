const { Server } = require('socket.io');

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('A new client connected');

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.IO not initialized');
    }
    return io;
  },
};
