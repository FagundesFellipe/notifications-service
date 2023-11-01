import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"

import { SendNotification } from "./send-notifications"


describe('send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'This is a notifications',
      category: 'social',
      recipientId: 'example-recipient-id'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0]).toEqual(notification)
  })
})