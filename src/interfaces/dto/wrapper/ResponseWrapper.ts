export default interface ResponseWrapper<T> {
  status: number,
  message: string,
  body?: T
}