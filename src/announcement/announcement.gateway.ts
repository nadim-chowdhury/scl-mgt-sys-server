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
import { AnnouncementService } from './announcement.service';
import { Announcement } from './announcement.entity';

@WebSocketGateway()
export class AnnouncementGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly announcementService: AnnouncementService) {}

  async handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('createAnnouncement')
  async handleCreateAnnouncement(
    @MessageBody() data: { title: string; content: string },
  ) {
    const announcement = await this.announcementService.create(
      data.title,
      data.content,
    );
    this.server.emit('newAnnouncement', announcement);
    return announcement;
  }
}
