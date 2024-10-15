// // import {
// //   SubscribeMessage,
// //   WebSocketGateway,
// //   WebSocketServer,
// // } from '@nestjs/websockets';
// // import { Server, Socket } from 'socket.io';

// // @WebSocketGateway({
// //   cors: {
// //     origin: '*', // Adjust CORS based on your setup
// //     methods: ['GET', 'POST'],
// //     credentials: true,
// //     transports: ['websocket', 'polling'],
// //   },
// // })
// // export class SignalingGateway {
// //   @WebSocketServer() server: Server;

// //   @SubscribeMessage('join-room')
// //   handleJoinRoom(client: Socket, roomId: string): void {
// //     client.join(roomId);
// //     client.to(roomId).emit('user-joined', { userId: client.id });

// //     // Notify the newly joined user about the other users in the room
// //     const clientsInRoom = this.server.sockets.adapter.rooms.get(roomId);
// //     if (clientsInRoom) {
// //       clientsInRoom.forEach((clientId) => {
// //         if (clientId !== client.id) {
// //           client.emit('user-joined', { userId: clientId });
// //         }
// //       });
// //     }
// //   }

// //   @SubscribeMessage('offer')
// //   handleOffer(client: Socket, payload: any): void {
// //     const { to, offer } = payload;
// //     client.to(to).emit('offer', { from: client.id, offer });
// //   }

// //   @SubscribeMessage('answer')
// //   handleAnswer(client: Socket, payload: any): void {
// //     const { to, answer } = payload;
// //     client.to(to).emit('answer', { from: client.id, answer });
// //   }

// //   @SubscribeMessage('candidate')
// //   handleCandidate(client: Socket, payload: any): void {
// //     const { to, candidate } = payload;
// //     client.to(to).emit('candidate', { from: client.id, candidate });
// //   }

// //   @SubscribeMessage('disconnect')
// //   handleDisconnect(client: Socket): void {
// //     this.server.emit('user-left', { userId: client.id });
// //   }
// // }

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ClassroomGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private rooms = new Map();

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('join-room')
//   handleJoinRoom(client: Socket, data: { roomId: string; userId: string }) {
//     client.join(data.roomId);
//     const room = this.rooms.get(data.roomId) || [];
//     room.push({ id: client.id, userId: data.userId });
//     this.rooms.set(data.roomId, room);
//     this.server.to(data.roomId).emit(
//       'all-users',
//       room.filter((user) => user.id !== client.id),
//     );
//   }

//   @SubscribeMessage('sending-signal')
//   handleSendingSignal(client: Socket, payload: any) {
//     this.server.to(payload.userToSignal).emit('user-joined', {
//       signal: payload.signal,
//       callerID: payload.callerID,
//     });
//   }

//   @SubscribeMessage('returning-signal')
//   handleReturningSignal(client: Socket, payload: any) {
//     this.server.to(payload.callerID).emit('receiving-returned-signal', {
//       signal: payload.signal,
//       id: client.id,
//     });
//   }

//   @SubscribeMessage('send-message')
//   handleSendMessage(
//     client: Socket,
//     message: { roomId: string; content: string },
//   ) {
//     this.server.to(message.roomId).emit('receive-message', message);
//   }
// }

// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({ cors: true })
// export class ClassroomGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private users = new Map();

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     const { roomId } = this.users.get(client.id) || {};
//     if (roomId) {
//       this.users.delete(client.id);
//       this.server.to(roomId).emit('user-left', client.id);
//     }
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('join-room')
//   handleJoinRoom(client: Socket, { roomId, userId }) {
//     client.join(roomId);
//     this.users.set(client.id, { roomId, userId });

//     const otherUsers = [...this.users.entries()]
//       .filter(([id, user]) => user.roomId === roomId && id !== client.id)
//       .map(([id, user]) => ({ id, userId: user.userId }));

//     client.emit('all-users', otherUsers);
//   }

//   @SubscribeMessage('sending-signal')
//   handleSendingSignal(client: Socket, payload: any) {
//     this.server.to(payload.userToSignal).emit('user-joined', {
//       signal: payload.signal,
//       callerID: client.id,
//     });
//   }

//   @SubscribeMessage('returning-signal')
//   handleReturningSignal(client: Socket, payload: any) {
//     this.server.to(payload.callerID).emit('receiving-returned-signal', {
//       signal: payload.signal,
//       id: client.id,
//     });
//   }

//   @SubscribeMessage('send-message')
//   handleSendMessage(client: Socket, { roomId, content }) {
//     this.server.to(roomId).emit('receive-message', { content });
//   }
// }

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
    origin: '*', // Adjust based on your needs
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

  // Handle the WebRTC offer
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

  // Handle text message within a room
  @SubscribeMessage('send-message')
  handleSendMessage(
    client: Socket,
    { roomId, content }: { roomId: string; content: string },
  ) {
    this.server.to(roomId).emit('receive-message', { content });
  }
}
