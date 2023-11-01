import { makeNotification } from "@test/factories/notification-factory"
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { GetRecipientNotifications } from "./get-recipient-notifications"


describe('Get recipients notifications', () => {
  it('should be able to get recipient a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const getRecipientsNotification = new GetRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }))

    const { notifications } = await getRecipientsNotification.execute({
      recipientId: 'recipient-1',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'recipient-1'
        }),
        expect.objectContaining({
          recipientId: 'recipient-1'
        })
      ])
    )
  })
})