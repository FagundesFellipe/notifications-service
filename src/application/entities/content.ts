export class Content {
  private readonly content: string

  get value(): string {
    return this.content
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240
  }

  constructor(content: string) {
    const isContentlengthValid = this.validateContentLenght(content)

    if (!isContentlengthValid) {
      throw new Error('Content lenght error.')
    }

    this.content = content
  }

}