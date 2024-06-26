import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Replace with your client's origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    data: {
      senderId: number;
      receiverId: number;
      content: string;
    },
  ) {
    const message = await this.messageService.create(
      data.senderId,
      data.receiverId,
      data.content,
    );
    this.server.emit('receiveMessage', message);
    return message;
  }
}
