import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_WEBSOCKET_URL || '*', // Use the client URL or allow any origin
    methods: ['GET', 'POST'], // Allow GET and POST methods for CORS
    credentials: true, // Include credentials if necessary
    transports: ['websocket'],
  },
})
export class SignalingGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: any): void {
    const { to, offer } = payload;
    client.to(to).emit('offer', { from: client.id, offer });
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: any): void {
    const { to, answer } = payload;
    client.to(to).emit('answer', { from: client.id, answer });
  }

  @SubscribeMessage('candidate')
  handleCandidate(client: Socket, payload: any): void {
    const { to, candidate } = payload;
    client.to(to).emit('candidate', { from: client.id, candidate });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
    client.to(roomId).emit('user-joined', { userId: client.id });
  }
}
