import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      // Allow specific origins (add your own list of allowed origins)
      const allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://scl-mgt-sys-client.vercel.app',
        'https://scl-mgt-sys-server.vercel.app',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error('Not allowed by CORS')); // Reject other origins
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
})
export class ClassroomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private users = new Map<string, { roomId: string; userId: string }>();

  // Handle new client connection
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle client disconnection
  handleDisconnect(client: Socket) {
    const user = this.users.get(client.id);
    if (user?.roomId) {
      // Remove user from the room map
      this.users.delete(client.id);
      // Notify other clients in the room about the user leaving
      this.server.to(user.roomId).emit('user-left', client.id);
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  // User joins a room
  @SubscribeMessage('join-room')
  handleJoinRoom(
    client: Socket,
    { roomId, userId }: { roomId: string; userId: string },
  ) {
    client.join(roomId); // Join the room using Socket.io
    this.users.set(client.id, { roomId, userId }); // Track the user by client ID

    // Get other users in the same room
    const otherUsers = [...this.users.entries()]
      .filter(([id, user]) => user.roomId === roomId && id !== client.id)
      .map(([id, user]) => ({ id, userId: user.userId }));

    // Send the list of other users to the newly joined user
    client.emit('all-users', otherUsers);
  }

  // Handle the WebRTC offer (including screen sharing)
  @SubscribeMessage('sending-signal')
  handleSendingSignal(
    client: Socket,
    payload: { userToSignal: string; signal: any },
  ) {
    this.server.to(payload.userToSignal).emit('user-joined', {
      signal: payload.signal,
      callerID: client.id,
    });
  }

  // Handle WebRTC answer
  @SubscribeMessage('returning-signal')
  handleReturningSignal(
    client: Socket,
    payload: { callerID: string; signal: any },
  ) {
    this.server.to(payload.callerID).emit('receiving-returned-signal', {
      signal: payload.signal,
      id: client.id,
    });
  }

  // Server-side (NestJS, for example)
  @SubscribeMessage('send-message')
  handleSendMessage(
    client: Socket,
    { roomId, content }: { roomId: string; content: string },
  ) {
    // Broadcast the message to all users in the room, including the sender
    this.server.to(roomId).emit('receive-message', {
      content,
      senderId: client.id, // Include the sender's socket ID
    });
  }
}
