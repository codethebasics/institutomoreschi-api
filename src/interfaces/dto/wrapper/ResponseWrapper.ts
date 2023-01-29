export default class ResponseWrapper<T> {
  private status: number
  private message: string
  private body: T

  constructor(status: number, message: string, body: T) {
    this.status = status
    this.message = message
    this.body = body
  }

  public get _status() {
    return this.status
  }

  public get _message() {
    return this.message
  }

  public get _body() {
    return this.body
  }

  public set _status(status: number) {
    this.status = status
  }

  public set _message(message: string) {
    this.message = message
  }

  public set _body(body: T) {
    this.body = body
  }
}