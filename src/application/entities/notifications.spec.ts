import { Content } from "./content"
import { Notification } from "./notification"

describe('Notifications', () => {
  it('should be able to create a notification', () => {

    const notifications = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',

    })

    expect(notifications).toBeTruthy()
  })

})

