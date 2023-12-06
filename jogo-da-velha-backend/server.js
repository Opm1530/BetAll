const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Pasta onde ficará o código do frontend
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('makeMove', (index) => {
    console.log(`Jogada feita na célula ${index}`);
    io.emit('moveMade', index);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
