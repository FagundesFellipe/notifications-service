import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notifications';
import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notifications-body';
import { NottificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientsNotifications: CountRecipientNotifications,
    private getRecipientsNotifications: GetRecipientNotifications
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipiente(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientsNotifications.execute({
      recipientId,
    })

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId,
    })

    return {
      notifications: notifications.map(NottificationViewModel.toHTTP),
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return {
      notification: NottificationViewModel.toHTTP(notification)
    }
  }
}
