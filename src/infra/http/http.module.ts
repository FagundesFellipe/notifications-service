import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notification";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnreadNotification } from "@application/use-cases/unread-notifications";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/application/use-cases/send-notifications";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationsController
  ],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications
  ]
})

export class HttpModule { }