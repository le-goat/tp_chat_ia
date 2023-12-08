import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  @SubscribeMessage('chat-message')
  handleChatMessage(client: any, payload: any): void {
    this.server.emit('chat-message', payload);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected ', client.id);
  }

  handleDisconnect(client: any): any {
    console.log('client disconnected ', client.id);
  }

  users: object[] = [];
  @SubscribeMessage('add-user')
  setUserName(client: any, payload: any): void {
    const user: object = {
      id: client.id,
      name: payload.username,
    };
    this.users.push(user);
    console.log(this.users);
    client.emit('get-user', user);
  }
}
