export class UpdatedAt {
  private updatedAt: string
  constructor(updatedAt: string) {
    this.updatedAt = updatedAt
  }
  public get() {
    return this.updatedAt
  }
}
