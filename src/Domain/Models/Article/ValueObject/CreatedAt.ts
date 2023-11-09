export class CreatedAt {
  private createdAt: string
  constructor(createdAt: string) {
    this.createdAt = createdAt
  }
  public get() {
    return this.createdAt
  }
}
