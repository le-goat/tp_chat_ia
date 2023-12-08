import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
