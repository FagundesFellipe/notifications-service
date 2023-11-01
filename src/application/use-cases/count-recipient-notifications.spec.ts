import { makeNotification } from "@test/factories/notification-factory"
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notification"


describe('Count recipients notifications', () => {
  it('should be able to count recipient a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const countRecipientsNotification = new CountRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }))

    const { count } = await countRecipientsNotification.execute({
      recipientId: 'recipient-1',
    })

    expect(count).toEqual(2)
  })
})